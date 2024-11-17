import React from 'react';
import {ListWithCards} from "@/app/types";

type Props = {
    lists: ListWithCards[] | undefined;
    isError: boolean
    error: Error | null
};

const ListsSummary: React.FC<Props> = ({ lists, isError, error }) => {

    if (isError) {
        return (
            <p style={{color: "red"}}>
                Lists: {error?.message || "Something went wrong. Please try again."}
            </p>
        )
    }

    if (!lists) return

    if (lists.length === 0) {
        return <b style={{color: 'gray'}}>Board has no lists :(</b>;
    }

    const totalCards = lists.reduce((sum, list) => sum + list.cards.length, 0);

    return (
        <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Total tasks: {totalCards}</h4>
            {lists.map((list) => (
                <p key={list.id}>
                    {list.name}: {list.cards.length} card(s)
                </p>
            ))}
        </div>
    );
};

export default ListsSummary;
