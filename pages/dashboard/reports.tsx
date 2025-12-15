import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
    Download,
    Calendar,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Activity,
    Target,
} from "lucide-react";

import { exportToCsv } from "../../lib/utils";

export default function ReportsPage() {
    const handleExport = () => {
        const data = [
            {
                label: "Total Revenue",
                value: "$124,500",
                change: "+12%",
                trend: "up",
            },
            {
                label: "New Leads",
                value: "1,240",
                change: "+4%",
                trend: "up",
            },
            {
                label: "Churn Rate",
                value: "2.1%",
                change: "-0.5%",
                trend: "down",
            },
        ];
        exportToCsv(data, "reports-analytics");
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                            Analytics & Reports
                        </h1>
                        <p className="text-zinc-500 mt-2 text-lg">
                            Track your team's performance, revenue growth, and conversion
                            metrics.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <Button
                            variant="outline"
                            className="bg-white dark:bg-zinc-900"
                            icon={<Calendar size={16} />}
                        >
                            Last 30 Days
                        </Button>
                        <Button
                            className="bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                            icon={<Download size={16} />}
                            onClick={handleExport}
                        >
                            Export Report
                        </Button>
                    </motion.div>
                </div>


                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            label: "Total Revenue",
                            value: "$124,500",
                            change: "+12%",
                            icon: DollarSign,
                            trend: "up",
                            color: "indigo",
                        },
                        {
                            label: "New Leads",
                            value: "1,240",
                            change: "+4%",
                            icon: Users,
                            trend: "up",
                            color: "emerald",
                        },
                        {
                            label: "Churn Rate",
                            value: "2.1%",
                            change: "-0.5%",
                            icon: Activity,
                            trend: "down",
                            color: "rose",
                        },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 border-zinc-200/60 dark:border-zinc-800">
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}
                                    >
                                        <stat.icon size={24} />
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.trend === "up" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}
                                    >
                                        {stat.trend === "up" ? (
                                            <TrendingUp size={12} />
                                        ) : (
                                            <TrendingDown size={12} />
                                        )}
                                        {stat.change}
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    {stat.label}
                                </p>
                                <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mt-2 tracking-tight">
                                    {stat.value}
                                </h3>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart Area */}
                    <Card className="lg:col-span-2 shadow-lg shadow-zinc-200/50 dark:shadow-black/20">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Revenue Overview</CardTitle>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                    Weekly
                                </button>
                                <button className="px-3 py-1 text-xs font-medium rounded-full text-zinc-400 hover:text-zinc-600">
                                    Monthly
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80 flex items-end justify-between gap-3 pt-8 pb-2">
                                {[45, 60, 52, 68, 74, 82, 78, 88, 92, 85, 96, 100].map(
                                    (h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 0.5, delay: i * 0.05 }}
                                            className="w-full flex flex-col items-center gap-3 group relative"
                                        >
                                            <div className="w-full relative h-full flex items-end">
                                                <div
                                                    style={{ height: `${h}%` }}
                                                    className="w-full bg-gradient-to-t from-indigo-500 to-violet-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40"
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-medium text-zinc-400">
                                                W{i + 1}
                                            </span>

                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                ${(h * 1240).toLocaleString()}
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Secondary Metrics */}
                    <div className="space-y-6">
                        <Card className="shadow-lg shadow-zinc-200/50 dark:shadow-black/20">
                            <CardHeader>
                                <CardTitle>Traffic Sources</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { label: "Direct", value: "40%", color: "bg-indigo-500" },
                                    { label: "Social", value: "25%", color: "bg-violet-500" },
                                    { label: "Referral", value: "20%", color: "bg-fuchsia-500" },
                                    {
                                        label: "Organic",
                                        value: "15%",
                                        color: "bg-zinc-300 dark:bg-zinc-700",
                                    },
                                ].map((item, i) => (
                                    <div key={item.label} className="group">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                                {item.label}
                                            </span>
                                            <span className="font-bold text-zinc-900 dark:text-white">
                                                {item.value}
                                            </span>
                                        </div>
                                        <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: item.value }}
                                                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                className={`h-full ${item.color} rounded-full`}
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-none shadow-xl shadow-indigo-500/30 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
                            <CardContent className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <Target size={20} className="text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg">Pro Tip</h3>
                                </div>
                                <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                                    Connecting your Google Analytics account can improve
                                    attribution accuracy by up to 40%. Get deeper insights today.
                                </p>
                                <Button
                                    size="sm"
                                    className="bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-lg w-full font-bold"
                                >
                                    Connect Integration
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
