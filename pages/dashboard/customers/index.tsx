import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CreateCustomerModal } from "@/components/customers/CreateCustomerModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_CUSTOMERS } from "@/lib/mock";
import { Customer } from "@/lib/types";
import { cn, formatCurrency, exportToCsv } from "@/lib/utils";
import {
    Search,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    ArrowUpDown,
    LayoutGrid,
    List as ListIcon,
    CheckSquare,
    Building2,
    CalendarClock,
} from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function CustomersPage() {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [isLoading, setIsLoading] = useState(true);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Initialize with Mock Data
    useEffect(() => {
        const timer = setTimeout(() => {
            setCustomers(MOCK_CUSTOMERS);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredCustomers = customers.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.company.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleAll = () => {
        if (selectedIds.size === filteredCustomers.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredCustomers.map((c) => c.id)));
        }
    };

    const handleExport = () => {
        // Export selected or all filtered if none selected
        const dataToExport =
            selectedIds.size > 0
                ? customers.filter((c) => selectedIds.has(c.id))
                : filteredCustomers;

        const exportData = dataToExport.map(
            ({ id, name, email, company, status, value, lastContact, tags }) => ({
                ID: id,
                Name: name,
                Email: email,
                Company: company,
                Status: status,
                Value: value,
                Last_Contact: lastContact,
                Tags: tags.join(", "),
            })
        );

        exportToCsv(exportData, "synergyhub-customers");
    };

    const handleAddCustomer = (
        data: Omit<Customer, "id" | "lastContact" | "assignedTo">
    ) => {
        const newCustomer: Customer = {
            id: `c${Date.now()}`,
            ...data,
            lastContact: "Just now",
            assignedTo: "u1", // Default to current user
        };

        setCustomers((prev) => [newCustomer, ...prev]);
    };

    return (
        <DashboardLayout>
            <CreateCustomerModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleAddCustomer}
            />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Customers
                        </h1>
                        <p className="text-zinc-500 mt-2 max-w-2xl">
                            Manage your relationships, track lifetime value, and monitor
                            customer health in real-time.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <Button
                            variant="outline"
                            className="bg-white dark:bg-zinc-900"
                            icon={<Download size={16} />}
                            onClick={handleExport}
                        >
                            Export
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all"
                            icon={<Plus size={16} />}
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            Add Customer
                        </Button>
                    </motion.div>
                </div>

                {/* Controls Bar */}
                <motion.div
                    className="sticky top-24 z-10 flex flex-wrap items-center justify-between gap-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative max-w-md w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, company, or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl leading-5 bg-zinc-50/50 dark:bg-zinc-900/50 placeholder-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block" />
                        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2 rounded-md transition-all",
                                    viewMode === "list"
                                        ? "bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                )}
                            >
                                <ListIcon size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "p-2 rounded-md transition-all",
                                    viewMode === "grid"
                                        ? "bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                )}
                            >
                                <LayoutGrid size={18} />
                            </button>
                        </div>
                        <Button
                            variant="outline"
                            className="hidden sm:flex"
                            icon={<Filter size={16} />}
                        >
                            Filter
                        </Button>
                    </div>
                </motion.div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-20 w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                />
                            ))}
                        </motion.div>
                    ) : filteredCustomers.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800"
                        >
                            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                                <Search className="text-zinc-400" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                No customers found
                            </h3>
                            <p className="text-zinc-500 max-w-sm mt-2 mb-6">
                                We couldn't find any customers matching "{search}". Try
                                adjusting your filters or search query.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setSearch("")}
                                className="bg-white dark:bg-zinc-900"
                            >
                                Clear Search
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={viewMode}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={cn(
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                    : "bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
                            )}
                        >
                            {viewMode === "list" ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                            <tr>
                                                <th className="px-6 py-4 w-[50px]">
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            onClick={toggleAll}
                                                            className={cn(
                                                                "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                                                selectedIds.size === filteredCustomers.length &&
                                                                    filteredCustomers.length > 0
                                                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                                                    : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                                            )}
                                                        >
                                                            {selectedIds.size === filteredCustomers.length &&
                                                                filteredCustomers.length > 0 && (
                                                                    <CheckSquare size={14} />
                                                                )}
                                                        </button>
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4">Customer</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 hidden md:table-cell">Tags</th>
                                                <th className="px-6 py-4 text-right cursor-pointer hover:text-indigo-600 transition-colors group">
                                                    <div className="flex items-center justify-end gap-1">
                                                        LTV{" "}
                                                        <ArrowUpDown
                                                            size={12}
                                                            className="opacity-0 group-hover:opacity-100"
                                                        />
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 hidden lg:table-cell">
                                                    Last Contact
                                                </th>
                                                <th className="px-6 py-4 w-[50px]"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                            {filteredCustomers.map((customer) => (
                                                <motion.tr
                                                    key={customer.id}
                                                    variants={itemVariants}
                                                    layout
                                                    className={cn(
                                                        "group transition-colors relative",
                                                        selectedIds.has(customer.id)
                                                            ? "bg-indigo-50/60 dark:bg-indigo-900/20 hover:bg-indigo-50/80 dark:hover:bg-indigo-900/30"
                                                            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                                                    )}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center">
                                                            <button
                                                                onClick={() => toggleSelection(customer.id)}
                                                                className={cn(
                                                                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                                                    selectedIds.has(customer.id)
                                                                        ? "bg-indigo-600 border-indigo-600 text-white"
                                                                        : "border-zinc-300 dark:border-zinc-700 group-hover:border-indigo-400 bg-white dark:bg-zinc-900"
                                                                )}
                                                            >
                                                                {selectedIds.has(customer.id) && (
                                                                    <CheckSquare size={14} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm ring-2 ring-white dark:ring-zinc-950 shadow-sm">
                                                                    {customer.name.substring(0, 2)}
                                                                </div>
                                                                <span
                                                                    className={cn(
                                                                        "absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-zinc-950 rounded-full",
                                                                        customer.status === "active"
                                                                            ? "bg-green-500"
                                                                            : "bg-zinc-400"
                                                                    )}
                                                                ></span>
                                                            </div>
                                                            <div>
                                                                <Link
                                                                    href={`/dashboard/customers/${customer.id}`}
                                                                >
                                                                    <a className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block">
                                                                        {customer.name}
                                                                    </a>
                                                                </Link>
                                                                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                                                                    <Building2 size={12} />
                                                                    {customer.company}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge
                                                            pulsing={customer.status === "active"}
                                                            variant={
                                                                customer.status === "active"
                                                                    ? "success"
                                                                    : customer.status === "lead"
                                                                        ? "warning"
                                                                        : "neutral"
                                                            }
                                                        >
                                                            {customer.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {customer.tags.slice(0, 2).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {customer.tags.length > 2 && (
                                                                <span className="px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-[10px] font-medium text-zinc-400">
                                                                    +{customer.tags.length - 2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="font-medium text-zinc-900 dark:text-white tabular-nums tracking-tight">
                                                            {formatCurrency(customer.value)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-zinc-500 text-xs hidden lg:table-cell">
                                                        <div className="flex items-center gap-1.5">
                                                            <CalendarClock
                                                                size={14}
                                                                className="text-zinc-400"
                                                            />
                                                            {customer.lastContact}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                            <MoreHorizontal size={18} />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                // Grid View Implementation
                                filteredCustomers.map((customer) => (
                                    <motion.div
                                        key={customer.id}
                                        variants={itemVariants}
                                        layout
                                        className="group relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300"
                                    >
                                        <div className="absolute top-6 right-6">
                                            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="relative mb-4">
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-zinc-900 dark:to-zinc-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl shadow-inner">
                                                    {customer.name.substring(0, 2)}
                                                </div>
                                                <div
                                                    className={cn(
                                                        "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center",
                                                        customer.status === "active"
                                                            ? "bg-green-500"
                                                            : "bg-zinc-400"
                                                    )}
                                                >
                                                    {customer.status === "active" && (
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                    )}
                                                </div>
                                            </div>

                                            <Link href={`/dashboard/customers/${customer.id}`}>
                                                <a className="text-lg font-bold text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors">
                                                    {customer.name}
                                                </a>
                                            </Link>
                                            <p className="text-sm text-zinc-500 mb-4">
                                                {customer.company}
                                            </p>

                                            <div className="w-full grid grid-cols-2 gap-3 py-4 border-t border-zinc-100 dark:border-zinc-800">
                                                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                                                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                                                        LTV
                                                    </span>
                                                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                                        {formatCurrency(customer.value)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                                                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                                                        Status
                                                    </span>
                                                    <Badge
                                                        variant={
                                                            customer.status === "active"
                                                                ? "success"
                                                                : "neutral"
                                                        }
                                                        className="mt-1"
                                                    >
                                                        {customer.status}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between w-full mt-2">
                                                <div className="flex -space-x-2">
                                                    {customer.tags.map((tag, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-white dark:border-zinc-900 flex items-center justify-center text-[10px] text-indigo-700 dark:text-indigo-300"
                                                        >
                                                            #
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-zinc-400">
                                                    {customer.lastContact}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
