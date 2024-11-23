import {
    fetchBoardUpdateCardActions,
    fetchBoardUsers, fetchCardsOnList,
    fetchListsWithCards,
    fetchTrelloBoards
} from "@/app/api/metrics/actions";
import {useMutation} from "@tanstack/react-query";

export const useTrelloBoards = () => {
    const { mutate: getBoards, data, isPending, isError, error } = useMutation({
        mutationFn: (username: string) => fetchTrelloBoards(username),
    })

    return {
        getBoards,
        boards: data,
        isPending,
        isError,
        error,
    }
}

export const useBoardUsers = () => {
    const { mutate: getUsers, data, isPending, isError, error } = useMutation({
        mutationFn: (boardId: string) => fetchBoardUsers(boardId),
    })

    return {
        getUsers,
        users: data,
        isPending,
        isError,
        error,
    }
}

export const useBoardLists = () => {
    const { mutate: getLists, data, isPending, isError, error } = useMutation({
        mutationFn: (boardId: string) => fetchListsWithCards(boardId),
    })

    return {
        getLists,
        listsWithCards: data,
        isPending,
        isError,
        error,
    }
}

export const useBoardUpdateCardActions = () => {
    const { mutate: getActions, data, isPending, isError, error } = useMutation({
        mutationFn: (boardId: string) => fetchBoardUpdateCardActions(boardId),
    })

    return {
        getActions,
        actions: data,
        isPending,
        isError,
        error,
    }
}

export const useCardsOnList = () => {
    const { mutate: getCards, data, isPending, isError, error } = useMutation({
        mutationFn: (listId: string) => fetchCardsOnList(listId),
    })

    return {
        getCards,
        cards: data,
        isPending,
        isError,
        error,
    }
}


