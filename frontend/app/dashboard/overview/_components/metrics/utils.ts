import {Action, ListWithCards, User} from "@/app/types";
import {
    getListCardsMeanTime,
    getSumOfMeanTimes
} from '@/app/dashboard/overview/_components/metrics/meanTimeInListUtils';

export type CardWithTimeLeft = {
    name: string;
    timeLeftInHours: number;
};

export type Metrics = {
    totalActiveCards: number;
    averageTaskCompletionTime: string;
    pendingTasks: number;
    totalCompletedCards: number;
    recentTasksDone: {
        cardName: string;
        completedBy: string;
        completedOn: string;
    }[];
};


export const getUsersCardCount = (user: User, listsWithCards: ListWithCards[]): number => {
    return listsWithCards.reduce((totalCount, list) => {
        const userCardsCount = list.cards.filter((card) => card.idMembers.includes(user.id)).length
        return totalCount + userCardsCount
    }, 0)
}

export const parseHoursToString = (meanInHours: number): string => {
    if (meanInHours > 24) {
        const meanInDays = meanInHours / 24
        return `${parseFloat(meanInDays.toFixed(2))} days`;
    }

    return `${parseFloat(meanInHours.toFixed(2))} hours`;
}

export const getUpcomingCards = (listsWithCards: ListWithCards[]): CardWithTimeLeft[] => {
    const now = Date.now();

    const allCards = listsWithCards.flatMap((list) => list.cards);

    return allCards
        .filter((card) => new Date(card.due).getTime() > now)
        .map((card) => ({
            name: card.name,
            timeLeftInHours: ((new Date(card.due).getTime() - now) / (1000 * 3600)),
        }))
        .sort((a, b) => a.timeLeftInHours - b.timeLeftInHours);
};

export const countActionsInLastDays = (actions: Action[], days: number): number => {
    const now = Date.now();
    const daysAgo = now - days * 24 * 60 * 60 * 1000;

    return actions.filter((action) => {
        const actionDate = new Date(action.date).getTime();
        return actionDate >= daysAgo && actionDate <= now;
    }).length;
};

export const prepareMetrics = (listsWithCards: ListWithCards[], updateActions: Action[], createActions: Action[]): Metrics => {
    const now = Date.now();

    // Active Cards: Cards in "To Do", "In Progress", or "In Review" lists
    const totalActiveCards = listsWithCards
      .filter((list) => ["To Do", "In Progress", "In Review"].includes(list.name))
      .reduce((total, list) => total + list.cards.length, 0);

    const completedActions = updateActions.filter(
      (action) => action.data.listAfter?.name === "To"
    );

    // Average Time Tasks spend in To Do + In Review
    const averageTaskCompletionTime = parseHoursToString(getSumOfMeanTimes(["To Do", 'In Progress'], createActions, updateActions) || 0);

    // Pending Tasks: Cards with due dates in the past and not completed
    const pendingTasks = listsWithCards.flatMap((list) =>
      list.cards.filter(
        (card) => card.due && new Date(card.due).getTime() < now && !card.dueComplete
      )
    ).length;

    // Total Completed Cards: Cards in the "Done" list
    const totalCompletedCards = listsWithCards
      .filter((list) => list.name === "Done")
      .reduce((total, list) => total + list.cards.length, 0);

    // Recent Tasks Done: Extract recent tasks completed and their metadata
    const recentTasksDone = completedActions.map((action) => ({
        cardName: action.data.card.name,
        completedBy: action.memberCreator.fullName,
        completedOn: new Date(action.date).toLocaleDateString(),
    }));

    return {
        totalActiveCards,
        averageTaskCompletionTime,
        pendingTasks,
        totalCompletedCards,
        recentTasksDone,
    };
};

type BarGraphData = {
    date: string; // YYYY-MM-DD
    created: number;
    completed: number;
}[];

/**
 * Prepares data for the BarGraph component.
 *
 * @param createActions - Array of actions representing card creations.
 * @param updateActions - Array of actions representing card updates.
 * @returns Data formatted for the BarGraph component.
 */
export function prepareBarGraphData(
  createActions: Action[],
  updateActions: Action[]
): BarGraphData {
    // Helper to format a date as YYYY-MM-DD
    const formatDate = (date: string): string => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Helper to check if a date is in the current month
    const isInCurrentMonth = (date: string): boolean => {
        const now = new Date();
        const actionDate = new Date(date);
        return (
          actionDate.getFullYear() === now.getFullYear() &&
          actionDate.getMonth() === now.getMonth()
        );
    };

    // Helper to group actions by date
    const groupActionsByDay = (actions: Action[]): Record<string, number> => {
        const grouped: Record<string, number> = {};
        actions.forEach((action) => {
            const date = formatDate(action.date);
            grouped[date] = (grouped[date] || 0) + 1;
        });
        return grouped;
    };

    // Get all dates in the current month
    const getAllDatesInCurrentMonth = (): string[] => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);

        const dates: string[] = [];
        let currentDate = startOfMonth;

        while (currentDate <= endOfMonth) {
            dates.push(formatDate(currentDate.toISOString()));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    // Filter actions for the current month
    const createActionsInMonth = createActions.filter((action) =>
      isInCurrentMonth(action.date)
    );
    const updateActionsInMonth = updateActions.filter((action) =>
      isInCurrentMonth(action.date)
    );

    // Group actions by date
    const createdGrouped = groupActionsByDay(createActionsInMonth);
    const completedGrouped = groupActionsByDay(updateActionsInMonth);

    // Generate data for the bar graph
    const allDates = getAllDatesInCurrentMonth();
    const barGraphData: BarGraphData = allDates.map((date) => ({
        date,
        created: createdGrouped[date] || 0,
        completed: completedGrouped[date] || 0,
    }));

    return barGraphData;
}

export function preparePieChartData(listsWithCards: ListWithCards[]) {
    const nameToConfigKey: Record<string, string> = {
        'To Do': 'todo',
        'In Progress': 'inProgress',
        'In Review': 'inReview',
        'Done': 'done'
    };

    return listsWithCards.map((list) => ({
        table: nameToConfigKey[list.name] || list.name, // Use mapped config key
        tasks: list.cards.length, // The number of cards in the table
        fill: `hsl(var(--chart-${Object.keys(nameToConfigKey).indexOf(list.name) + 1}))`
    }));
}