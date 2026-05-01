"use client";

import { useEffect, useState } from "react";

type LiveCountdownProps = {
    targetDateTime: string;
};

function getTimeRemaining(targetDateTime: string) {
    const target = new Date(targetDateTime).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
        return "Time's up!";
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 60 / 60 / 24);
    const hours = Math.floor((totalSeconds - days * 24 * 60 * 60) / 60 / 60);
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
}

export function LiveCountdown({ targetDateTime }: LiveCountdownProps) {
    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        setTimeRemaining(getTimeRemaining(targetDateTime));

        const intervalId = window.setInterval(() => {
            setTimeRemaining(getTimeRemaining(targetDateTime));
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [targetDateTime]);

    return (
        <div className="rounded-3xl bg-amber-100 p-6 shadow-sm">
            <p className="text-sm font-medium text-amber-700">Countdown</p>
            <p className="mt-2 text-3xl font-bold text-amber-950">{timeRemaining}</p>
            <p className="mt-2 text-sm text-amber-700">
                Time until the ferry quest begins
            </p>
        </div>
    );
}