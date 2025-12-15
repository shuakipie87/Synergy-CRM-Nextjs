import React from "react";
import { Sidebar } from "./Sidebar";
import { Search, Bell, HelpCircle } from "lucide-react";
import { MOCK_USERS } from "../../lib/mock";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = MOCK_USERS[0];

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-black font-sans">
      <Sidebar />
      <main className="ml-72 min-h-screen flex flex-col">
        <header className="h-20 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 max-w-lg w-full">
            <div className="relative w-full group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search across customers, tasks, or messages..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100/50 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-xl text-sm focus:bg-white dark:focus:bg-black focus:border-indigo-200 dark:focus:border-indigo-900 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 outline-none transition-all placeholder:text-zinc-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 text-[10px] font-medium text-zinc-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all">
              <HelpCircle size={20} />
            </button>
            <button className="relative p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-zinc-950"></span>
            </button>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                  {currentUser.name}
                </p>
                <p className="text-xs text-zinc-500 mt-1 capitalize">
                  {currentUser.role}
                </p>
              </div>
              <button className="relative group">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full bg-zinc-200 ring-2 ring-white dark:ring-zinc-950 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-950 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
