import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Clock, AlignLeft } from "lucide-react";
import { Button } from "../ui/Button";

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    defaultDate?: Date;
}

export function CreateEventModal({
    isOpen,
    onClose,
    onSubmit,
    defaultDate,
}: CreateEventModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stateDate: "",
        startTime: "09:00",
        endTime: "10:00",
        type: "meeting",
    });

    useEffect(() => {
        if (defaultDate) {
            const year = defaultDate.getFullYear();
            const month = String(defaultDate.getMonth() + 1).padStart(2, "0");
            const day = String(defaultDate.getDate()).padStart(2, "0");
            setFormData((prev) => ({
                ...prev,
                stateDate: `${year}-${month}-${day}`,
            }));
        }
    }, [defaultDate, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Combine date and time
        const start = new Date(`${formData.stateDate}T${formData.startTime}:00`).toISOString();
        const end = new Date(`${formData.stateDate}T${formData.endTime}:00`).toISOString();

        onSubmit({
            title: formData.title,
            description: formData.description,
            start,
            end,
            type: formData.type,
        });

        setIsLoading(false);
        onClose();
        // Reset form mostly but keep sensible defaults? Or just reset everything.
        setFormData((prev) => ({ ...prev, title: "", description: "" }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-xl z-50 overflow-hidden border border-zinc-200 dark:border-zinc-800"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                Create Event
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Event Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="e.g. Q4 Strategy Sync"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <Calendar size={14} /> Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        value={formData.stateDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, stateDate: e.target.value })
                                        }
                                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) =>
                                            setFormData({ ...formData, type: e.target.value })
                                        }
                                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    >
                                        <option value="meeting">Meeting</option>
                                        <option value="call">Call</option>
                                        <option value="deadline">Deadline</option>
                                        <option value="personal">Personal</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <Clock size={14} /> Start Time
                                    </label>
                                    <input
                                        required
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startTime: e.target.value })
                                        }
                                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <Clock size={14} /> End Time
                                    </label>
                                    <input
                                        required
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) =>
                                            setFormData({ ...formData, endTime: e.target.value })
                                        }
                                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                    <AlignLeft size={14} /> Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="Add details about this event..."
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="min-w-[100px]"
                                >
                                    {isLoading ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        "Save Event"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
