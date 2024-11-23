import {Card, ListWithCards, User} from "@/app/types";

export const getCardMembers = (card: Card, users: User[]): string[] => {
    return card.idMembers.map((memberId) => {
        const user = users.find((user) => user.id === memberId);
        return user ? user.fullName : memberId;
    })
}

export const getUsersCardCount = (user: User, listsWithCards: ListWithCards[]): number => {
    return listsWithCards.reduce((totalCount, list) => {
        const userCardsCount = list.cards.filter((card) => card.idMembers.includes(user.id)).length;
        return totalCount + userCardsCount;
    }, 0);
};
