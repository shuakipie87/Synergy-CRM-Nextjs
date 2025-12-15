import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { CreateEventModal } from "../../components/calendar/CreateEventModal";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_EVENTS } from "../../lib/mock";
import { CalendarEvent } from "../../lib/types";
import { exportToCsv, cn } from "../../lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Plus,
    Clock,
    Calendar as CalendarIcon,
} from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    // Calendar Logic
    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    const handleAddEvent = (
        eventData: Omit<CalendarEvent, "id" | "participants">
    ) => {
        const newEvent: CalendarEvent = {
            id: `e${Date.now()}`,
            participants: ["u1"], // Default to current user
            ...eventData,
        };
        setEvents([...events, newEvent]);
    };

    const handleExport = () => {
        const exportData = events.map((e) => ({
            Title: e.title,
            Description: e.description || "",
            Start: e.start,
            End: e.end,
            Type: e.type,
        }));
        exportToCsv(exportData, "calendar-events");
    };

    const openCreateModal = (day?: number) => {
        if (day) {
            const newDate = new Date(year, month, day);
            setSelectedDate(newDate);
        } else {
            setSelectedDate(new Date());
        }
        setIsModalOpen(true);
    };

    // Render Cells
    const renderCells = () => {
        const cells = [];
        // Empty cells for padding
        for (let i = 0; i < firstDay; i++) {
            cells.push(
                <div
                    key={`empty-${i}`}
                    className="h-32 md:h-40 bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-r border-zinc-200 dark:border-zinc-800"
                ></div>
            );
        }

        // Day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = new Date(year, month, day).toDateString();
            const dayEvents = events.filter(
                (e) => new Date(e.start).toDateString() === dateStr
            );
            const isToday = new Date().toDateString() === dateStr;

            cells.push(
                <motion.div
                    key={day}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: day * 0.01 }}
                    onClick={() => openCreateModal(day)}
                    className={cn(
                        "relative h-32 md:h-40 p-2 border-b border-r border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group",
                        isToday && "bg-indigo-50/30 dark:bg-indigo-900/10"
                    )}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span
                            className={cn(
                                "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                isToday
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                    : "text-zinc-700 dark:text-zinc-300 group-hover:bg-white dark:group-hover:bg-zinc-800"
                            )}
                        >
                            {day}
                        </span>
                        {dayEvents.length > 0 && (
                            <span className="text-[10px] font-bold text-zinc-400">
                                {dayEvents.length} events
                            </span>
                        )}
                    </div>

                    <div className="space-y-1 overflow-y-auto max-h-[calc(100%-2rem)] custom-scrollbar">
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className={cn(
                                    "px-2 py-1.5 rounded-lg text-xs font-medium truncate shadow-sm border",
                                    event.type === "meeting"
                                        ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                                        : event.type === "deadline"
                                            ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                                            : "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                                )}
                            >
                                {new Date(event.start).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}{" "}
                                {event.title}
                            </div>
                        ))}
                    </div>

                    {/* Plus icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-all">
                            <Plus size={24} />
                        </div>
                    </div>
                </motion.div>
            );
        }
        return cells;
    };

    return (
        <DashboardLayout>
            <CreateEventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddEvent}
                defaultDate={selectedDate}
            />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                            Calendar
                        </h1>
                        <p className="text-zinc-500 mt-1">
                            Manage your schedule, deadlines, and meetings.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleExport}
                            icon={<Download size={16} />}
                        >
                            Export
                        </Button>
                        <Button
                            onClick={() => openCreateModal()}
                            icon={<Plus size={16} />}
                            className="bg-gradient-to-r from-indigo-600 to-violet-600"
                        >
                            Create Event
                        </Button>
                    </div>
                </div>

                <Card className="overflow-hidden border-none shadow-xl shadow-zinc-200/50 dark:shadow-black/50">
                    <div className="p-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {MONTHS[month]} {year}
                            </h2>
                            <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1">
                                <button
                                    onClick={handlePrevMonth}
                                    className="p-1.5 hover:bg-white dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={handleNextMonth}
                                    className="p-1.5 hover:bg-white dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleToday}>
                                Today
                            </Button>
                        </div>
                        <div className="hidden md:flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                <span className="text-zinc-500">Meeting</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-zinc-500">Call</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-zinc-500">Deadline</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        {DAYS.map((day) => (
                            <div
                                key={day}
                                className="py-3 text-center text-sm font-semibold text-zinc-500 uppercase tracking-wider"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 bg-white dark:bg-zinc-950">
                        {renderCells()}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
