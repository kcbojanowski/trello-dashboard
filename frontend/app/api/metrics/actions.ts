export type Board = {
    id: string
    name: string
}

export type User = {
    id: string
    fullName: string
    username: string
}

const apiKey = process.env.NEXT_PUBLIC_TRELLO_API_KEY
const apiToken = process.env.NEXT_PUBLIC_TRELLO_API_TOKEN

export const fetchTrelloBoards = async (username: string): Promise<Board[]> => {
    if (!apiKey || !apiToken) {
        throw new Error('API key or token not found.')
    }

    const response = await fetch(`https://api.trello.com/1/members/${username}/boards?key=${apiKey}&token=${apiToken}`)

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


