import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_CUSTOMERS } from "../../lib/mock";
import {
  ArrowUpRight,
  Users,
  DollarSign,
  Activity,
  Filter,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-zinc-500">
          Welcome back, here's what's happening with your customers today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1%"
          icon={DollarSign}
        />
        <StatCard
          title="Active Customers"
          value="2,350"
          change="+180.1%"
          icon={Users}
        />
        <StatCard title="Open Tasks" value="12" change="-19%" icon={Activity} />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          change="+4.1%"
          icon={ArrowUpRight}
        />
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader className="flex items-center justify-between pb-4">
          <CardTitle>Recent Customers</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={<Filter size={16} />}>
              Filter
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 uppercase font-medium text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Customer</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Value</th>
                <th className="px-6 py-3 font-semibold">Last Contact</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {MOCK_CUSTOMERS.map((customer) => (
                <tr
                  key={customer.id}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                        {customer.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {customer.name}
                        </p>
                        <p className="text-zinc-500 text-xs">
                          {customer.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        customer.status === "active"
                          ? "success"
                          : customer.status === "lead"
                            ? "default"
                            : "neutral"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300">
                    ${customer.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {customer.lastContact}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/customers/${customer.id}`}>
                      <a className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium hover:bg-white hover:border-zinc-300 transition-all shadow-sm bg-white">
                        View
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}

function StatCard({ title, value, change, icon: Icon }: any) {
  const isPositive = change.startsWith("+");
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-zinc-200/60">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        <Icon size={18} className="text-zinc-400" />
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {value}
        </h3>
        <span
          className={`text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5 ${isPositive ? "text-green-600 bg-green-100 dark:bg-green-900/30" : "text-red-600 bg-red-100 dark:bg-red-900/30"}`}
        >
          {isPositive ? (
            <TrendingUp size={10} />
          ) : (
            <ArrowUpRight className="rotate-90" size={10} />
          )}
          {change}
        </span>
      </div>
    </Card>
  );
}
