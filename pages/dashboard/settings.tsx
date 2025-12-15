import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { MOCK_USERS } from "../../lib/mock";
import { User, Bell, Lock, Globe, Monitor, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                    Settings
                </h1>

                <div className="grid grid-cols-12 gap-8">
                    {/* Settings Sidebar */}
                    <div className="col-span-12 md:col-span-3 space-y-1">
                        {[
                            { icon: User, label: "Profile", active: true },
                            { icon: Bell, label: "Notifications" },
                            { icon: Lock, label: "Security" },
                            { icon: Globe, label: "Team" },
                            { icon: Monitor, label: "Appearance" },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="col-span-12 md:col-span-9 space-y-6">
                        <Card>
                            <CardHeader className="border-b-0 pb-0">
                                <CardTitle>Profile Information</CardTitle>
                                <p className="text-sm text-zinc-500">
                                    Update your photo and personal details.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <img
                                        src={MOCK_USERS[0].avatarUrl}
                                        className="w-20 h-20 rounded-full ring-4 ring-zinc-100 dark:ring-zinc-800"
                                    />
                                    <div>
                                        <div className="flex gap-3 mb-2">
                                            <Button size="sm" variant="outline">
                                                Change
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <p className="text-xs text-zinc-400">
                                            JPG, GIF or PNG. 1MB max.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Alex"
                                            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Rivera"
                                            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="alex@synergy.com"
                                            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            Bio
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Tell us a little about yourself..."
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3">
                                <Button variant="ghost">Cancel</Button>
                                <Button icon={<Save size={16} />}>Save Changes</Button>
                            </div>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    "Email Notifications",
                                    "Desktop Alerts",
                                    "Marketing Emails",
                                ].map((pref, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            {pref}
                                        </span>
                                        <button
                                            className={`w-11 h-6 rounded-full transition-colors relative ${i === 0 ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-700"}`}
                                        >
                                            <span
                                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i === 0 ? "left-6" : "left-1"}`}
                                            ></span>
                                        </button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
