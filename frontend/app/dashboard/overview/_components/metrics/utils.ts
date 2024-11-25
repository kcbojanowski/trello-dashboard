import {ListWithCards, User} from "@/app/types";

export const getUsersCardCount = (user: User, listsWithCards: ListWithCards[]): number => {
    return listsWithCards.reduce((totalCount, list) => {
        const userCardsCount = list.cards.filter((card) => card.idMembers.includes(user.id)).length
        return totalCount + userCardsCount
    }, 0)
}