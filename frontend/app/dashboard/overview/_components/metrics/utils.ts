import {ListWithCards, User} from "@/app/types";

export type CardWithTimeLeft = {
    name: string;
    timeLeftInHours: number;
};

export const getUsersCardCount = (user: User, listsWithCards: ListWithCards[]): number => {
    return listsWithCards.reduce((totalCount, list) => {
        const userCardsCount = list.cards.filter((card) => card.idMembers.includes(user.id)).length
        return totalCount + userCardsCount
    }, 0)
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