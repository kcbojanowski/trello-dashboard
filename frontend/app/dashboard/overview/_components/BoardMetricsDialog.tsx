"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useBoardLists, useBoardUpdateCardActions} from "@/hooks/useMetrics";
import React, {useState} from "react";
import ListSummary from "@/app/dashboard/overview/_components/metrics/ListsSummary";
import {Separator} from "@/components/ui/separator";
import RecentTasksClosed from "@/app/dashboard/overview/_components/metrics/RecentTasksClosed";

export function BoardMetricsDialog() {
    const [boardId, setBoardId] = useState("");
    const {
        getLists,
        listsWithCards,
        isPending,
        isError,
        error
    } = useBoardLists();

    const {
        getActions,
        actions,
        isPending: isActionsPending,
        isError: isActionsError,
        error: actionsError
    } = useBoardUpdateCardActions();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getLists(boardId);
        getActions(boardId)
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Board metrics</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle>Type in board id</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Type in board id to see its metrics
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="boardId" className="text-right">
                                Board id
                            </Label>
                            <Input
                                id="boardId"
                                className="col-span-3"
                                value={boardId}
                                onChange={(e) => setBoardId(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Loading..." : "Apply"}
                        </Button>
                    </DialogFooter>
                </form>
                <ListSummary
                    lists={listsWithCards}
                    isError={isError}
                    error={error}
                />
                {listsWithCards && <Separator/>}
                <RecentTasksClosed
                    actions={actions}
                    isError={isActionsError}
                    error={actionsError}
                    isPending={isActionsPending}
                />
            </DialogContent>
        </Dialog>
)
}
