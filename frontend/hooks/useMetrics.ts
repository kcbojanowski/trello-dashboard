import {fetchTrelloBoards} from "@/app/api/metrics/actions";
import {useMutation} from "@tanstack/react-query";
//TODO: update README, note in trello
export const useTrelloBoards = () => {
    const { mutate: getBoards, data, isPending, isError, error } = useMutation({
        mutationFn: (username: string) => fetchTrelloBoards(username),
        onSuccess: (data) => {
            console.log("Fetched: ", data)
        },
        onError: (error) => {
            console.log("Something went wrong when fetching: ", error)
        }
    })

    return {
        getBoards,
        boards: data,
        isPending,
        isError,
        error,
    };
};