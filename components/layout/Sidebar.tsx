import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  PieChart,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Reports", href: "/dashboard/reports", icon: PieChart },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col h-screen fixed left-0 top-0 z-30 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25">
          <Zap size={20} fill="currentColor" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white leading-none">
            SynergyHub
          </h1>
          <span className="text-xs text-zinc-500 font-medium tracking-wide">
            ENTERPRISE
          </span>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-2">
          Main Menu
        </p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              router.pathname === item.href ||
              (item.href !== "/dashboard" &&
                router.pathname.startsWith(`${item.href}`));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-colors ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                    }`}
                  />
                  {item.label}
                  {item.label === "Messages" && (
                    <span className="ml-auto bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg shadow-indigo-500/30">
                      3
                    </span>
                  )}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
              <PieChart size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Pro Plan
              </p>
              <p className="text-[10px] text-zinc-500">82% usage</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[82%] rounded-full" />
          </div>
        </div>

        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 dark:hover:text-red-400 transition-colors group">
          <LogOut
            size={18}
            className="group-hover:text-red-500 transition-colors"
          />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
