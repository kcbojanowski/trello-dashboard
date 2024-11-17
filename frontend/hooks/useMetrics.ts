import {fetchBoardUsers, fetchTrelloBoards} from "@/app/api/metrics/actions";
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
