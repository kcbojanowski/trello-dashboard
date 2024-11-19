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
import {useBoardUsers} from "@/hooks/useMetrics";
import React, {useState} from "react";

export function BoardUsersDialog() {
    const [boardId, setBoardId] = useState("");
    const { getUsers, users, isPending, isError, error } = useBoardUsers();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getUsers(boardId);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Check users</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Type in board id</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Type in board id to see its users
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
                            {isPending ? "Loading..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
                {isError && (
                    <p style={{ color: "red" }}>
                        {error?.message || "Something went wrong. Please try again."}
                    </p>
                )}
                {users && (
                    <div>
                        <h3>Users:</h3>
                        {users.length > 0 ? (
                            <ul>
                                {users.map((user) => (
                                    <li key={user.id}>{user.fullName} ({user.username})</li>
                                ))}
                            </ul>
                        ) : (
                            <b style={{ color: "gray" }}>Board has no users :(</b>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
)
}
