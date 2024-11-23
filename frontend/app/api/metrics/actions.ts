import {Action, Board, Card, ListWithCards, User} from "@/app/types";

const apiKey = process.env.NEXT_PUBLIC_TRELLO_API_KEY
const apiToken = process.env.NEXT_PUBLIC_TRELLO_API_TOKEN

export const fetchTrelloBoards = async (username: string): Promise<Board[]> => {
    if (!apiKey || !apiToken) {
        throw new Error('API key or token not found.')
    }

    const response = await fetch(`https://api.trello.com/1/members/${username}/boards?fields=id,name&key=${apiKey}&token=${apiToken}`)

    if (response.status == 404) {
        throw new Error('User not found')
    } else if (!response.ok) {
        throw new Error('Failed to fetch data.')
    }

    return await response.json()
}

export const fetchBoardUsers = async (boardId: string): Promise<User[]> => {
    if (!apiKey || !apiToken) {
        throw new Error('API key or token not found.')
    }

    const response = await fetch(`https://api.trello.com/1/boards/${boardId}/members?key=${apiKey}&token=${apiToken}`)

    if (response.status == 404) {
        throw new Error('Board not found')
    } else if (!response.ok) {
        throw new Error('Failed to fetch data.')
    }

    return response.json()
}

export const fetchListsWithCards = async (boardId: string): Promise<ListWithCards[]> => {
    if (!apiKey || !apiToken) {
        throw new Error('API key or token not found.')
    }

    const response = await fetch(`https://api.trello.com/1/boards/${boardId}/lists?cards=open&card_fields=id,name,due,dueComplete,idMembers&fields=id,name&key=${apiKey}&token=${apiToken}`)

    if (response.status == 404) {
        throw new Error('Board not found')
    } else if (!response.ok) {
        throw new Error('Failed to fetch data.')
    }

    return response.json()
}

export const fetchBoardUpdateCardActions = async (boardId: string): Promise<Action[]> => {
    if (!apiKey || !apiToken) {
        throw new Error('API key or token not found.')
    }

    const response = await fetch(`https://api.trello.com/1/boards/${boardId}/actions?fields=data,date&filter=updateCard&memberCreator_fields=id,fullName,username&limit=1000&key=${apiKey}&token=${apiToken}`)

    if (response.status == 404) {
        throw new Error('Board not found')
    } else if (!response.ok) {
        throw new Error('Failed to fetch data.')
    }

    return response.json()
}

export const fetchCardsOnList = async (listId: string): Promise<Card[]> => {
    if (!apiKey || !apiToken) {
        throw new Error('API key or token not found.')
    }

    const response = await fetch(`https://api.trello.com/1/lists/${listId}/cards?fields=id,name,start,due,dueComplete,idMembers&key=${apiKey}&token=${apiToken}`)

    if (response.status == 404) {
        throw new Error('List not found')
    } else if (!response.ok) {
        throw new Error('Failed to fetch data.')
    }

    return response.json()
}
