import {
    fetchBoardCardActions,
    fetchBoardUsers,
    fetchCardsOnList,
    fetchListsUpdateCardActions,
    fetchListsWithCards,
    fetchTrelloBoards
} from "@/app/api/metrics/actions";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {Action, ListWithCards} from "@/app/types";

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

export const useBoardUpdateCardActions = (isCreateFilter?: boolean) => {
    const {mutate: getActions, data, isPending, isError, error} = useMutation({
        mutationFn: (boardId: string) =>
            fetchBoardCardActions(boardId, isCreateFilter ? "createCard" : undefined),
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


