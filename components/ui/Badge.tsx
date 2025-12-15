import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "destructive" | "neutral";
    className?: string; // Add className explicitly
    pulsing?: boolean;
}

export function Badge({
    children,
    className = "",
    variant = "default",
    pulsing = false,
    ...props
}: BadgeProps) {
    const variants = {
        default: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${variants[variant] || variants.default} ${pulsing ? "animate-pulse" : ""} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
