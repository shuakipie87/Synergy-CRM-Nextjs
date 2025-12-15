import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
};

export function exportToCsv<T extends Record<string, any>>(
    data: T[],
    filename: string
) {
    if (!data || data.length === 0) return;

    // Get headers from the first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
        headers.join(","), // Header row
        ...data.map((row) =>
            headers
                .map((header) => {
                    const value = row[header];
                    // Handle strings that might contain commas or quotes
                    if (typeof value === "string") {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    // Handle arrays (like tags)
                    if (Array.isArray(value)) {
                        return `"${value.join("; ")}"`;
                    }
                    return value;
                })
                .join(",")
        ),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
