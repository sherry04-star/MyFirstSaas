"use client";
import {
    BarChart3,
    DollarSign,
    Users,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Clock
} from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, trend: "+20.1%", trendUp: true, color: "text-emerald-500" },
        { title: "Active Sessions", value: "2,350", icon: Activity, trend: "+15.2%", trendUp: true, color: "text-blue-500" },
        { title: "Conversion Rate", value: "3.24%", icon: BarChart3, trend: "-0.4%", trendUp: false, color: "text-rose-500" },
        { title: "Total Customers", value: "12,234", icon: Users, trend: "+4.1%", trendUp: true, color: "text-emerald-500" },
    ];

    const recentActivity = [
        { id: 1, user: "Ali Khan", action: "purchased Wireless Headphones", time: "2 mins ago", amount: "+$240.00" },
        { id: 2, user: "Sara Ahmed", action: "started a new session", time: "10 mins ago", amount: null },
        { id: 3, user: "Zainab Malik", action: "purchased Smart Watch", time: "25 mins ago", amount: "+$150.00" },
        { id: 4, user: "Hamza Sheikh", action: "left a review on Keyboard", time: "1 hour ago", amount: null },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-400 mt-1">Welcome back, Shaheer. Here's what's happening today.</p>
                </div>
                <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Download Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#1e293b] border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-slate-800/80 group-hover:bg-blue-600/10 transition-colors">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart Section */}
                <div className="lg:col-span-2 bg-[#1e293b] border border-slate-800/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
                            <p className="text-sm text-slate-400">Daily performance metrics</p>
                        </div>
                        <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>

                    {/* THE FIX IS HERE: Added h-full and justify-end to the mapping container */}
                    <div className="h-64 w-full flex items-end justify-between gap-3 pt-4">
                        {[45, 70, 50, 90, 60, 80, 100].map((height, i) => (
                            <div key={i} className="w-full h-full flex flex-col justify-end items-center gap-3 group">
                                <div
                                    className="w-full max-w-[3rem] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Day {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-[#1e293b] border border-slate-800/50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {recentActivity.map((act) => (
                            <div key={act.id} className="flex gap-4 items-start border-b border-slate-800/50 pb-4 last:border-0 last:pb-0">
                                <div className="p-2 rounded-lg bg-slate-800">
                                    {act.amount ? <ShoppingBag className="w-4 h-4 text-blue-400" /> : <Clock className="w-4 h-4 text-slate-400" />}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm text-white font-medium">
                                        {act.user} <span className="text-slate-400 font-normal">{act.action}</span>
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                                </div>
                                {act.amount && <span className="text-xs font-bold text-emerald-500">{act.amount}</span>}
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-all">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
}