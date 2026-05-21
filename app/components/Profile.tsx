"use client";

import accountIcon from "../assets/icons/account-icon.svg"
import { useEffect, useState } from "react";

export default function Profile() {
    const [displayName, setDisplayName] = useState("Usuário");

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const rawUser = localStorage.getItem("nm_user");

        if (!rawUser) {
            return;
        }

        try {
            const user = JSON.parse(rawUser) as { displayName?: string };
            if (user.displayName) {
                setDisplayName(user.displayName);
            }
        } catch {
            setDisplayName("Usuário");
        }
    }, []);

    return (
        <div className="profile flex items-center justify-end gap-2">
            <span>{displayName}</span>
            <img src={accountIcon.src} alt="an user icon" className="w-9 h-9"/>
        </div>
    )
}
