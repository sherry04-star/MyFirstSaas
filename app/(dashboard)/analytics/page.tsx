"use client";

import { Search, Globe, Share2, Link as LinkIcon, DollarSign, Users, ShoppingBag, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-slate-400 mt-1">Detailed performance metrics for your store.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-[#1e293b] border border-slate-700/50 text-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:border-slate-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
            Download
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Revenue" 
          value="$45,231.89" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<DollarSign className="w-5 h-5 text-blue-500" />} 
        />
        <MetricCard 
          title="Average Order Value" 
          value="$128.50" 
          trend="+3.2%" 
          isPositive={true} 
          icon={<ShoppingBag className="w-5 h-5 text-indigo-500" />} 
        />
        <MetricCard 
          title="Conversion Rate" 
          value="3.8%" 
          trend="+0.4%" 
          isPositive={true} 
          icon={<Activity className="w-5 h-5 text-emerald-500" />} 
        />
        <MetricCard 
          title="Store Visits" 
          value="84,230" 
          trend="-2.1%" 
          isPositive={false} 
          icon={<Users className="w-5 h-5 text-amber-500" />} 
        />
      </div>

      {/* Main Chart Section */}
      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Revenue Over Time</h3>
            <p className="text-sm text-slate-400">Daily revenue for the selected period</p>
          </div>
          <div className="flex items-center gap-4 text-sm hidden sm:flex">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              <span className="text-slate-300 font-medium">Revenue</span>
            </div>
          </div>
        </div>
        
        {/* Mock Chart */}
        <div className="h-72 w-full flex items-end justify-between gap-1 sm:gap-2 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full border-t border-slate-500"></div>
            <div className="w-full border-t border-slate-500"></div>
            <div className="w-full border-t border-slate-500"></div>
            <div className="w-full border-t border-slate-500"></div>
            <div className="w-full border-t border-slate-500"></div>
          </div>
          
          {/* Generating dummy bars */}
          {Array.from({ length: 30 }).map((_, i) => {
            const baseHeight = 30 + Math.sin(i / 3) * 20;
            const randomVariance = Math.random() * 30;
            const height = Math.min(100, Math.max(10, baseHeight + randomVariance));
            
            return (
              <div key={i} className="w-full flex flex-col justify-end group h-full z-10 relative">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 text-center absolute bottom-[calc(100%+8px)] w-full flex justify-center z-20">
                  <span className="bg-slate-800 text-white text-[10px] font-medium py-1.5 px-2 rounded shadow-xl border border-slate-700 whitespace-nowrap">
                    ${(height * 120).toFixed(0)}
                  </span>
                </div>
                <div 
                  className="w-full bg-gradient-to-t from-blue-600/30 to-blue-500/80 rounded-t-sm group-hover:to-blue-400 transition-all cursor-crosshair border-t border-blue-400/50"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            );
          })}
        </div>
        
        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 text-xs font-medium text-slate-500 px-1">
          <span>Oct 1</span>
          <span>Oct 8</span>
          <span>Oct 15</span>
          <span>Oct 22</span>
          <span>Oct 29</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Categories */}
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Top Categories</h3>
              <p className="text-sm text-slate-400">Revenue breakdown by category</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-6">
            <CategoryRow name="Electronics" value="$24,500" percentage={65} color="bg-blue-500" />
            <CategoryRow name="Accessories" value="$12,350" percentage={35} color="bg-indigo-500" />
            <CategoryRow name="Furniture" value="$5,200" percentage={15} color="bg-purple-500" />
            <CategoryRow name="Apparel" value="$3,181" percentage={8} color="bg-pink-500" />
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Traffic Sources</h3>
              <p className="text-sm text-slate-400">Where visitors are coming from</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Report
            </button>
          </div>
          
          <div className="space-y-4">
            <TrafficRow source="Organic Search" visits="42,150" percentage="45%" icon={<Search className="w-4 h-4" />} color="text-emerald-400 bg-emerald-400/10 border-emerald-400/20" />
            <TrafficRow source="Direct" visits="28,400" percentage="25%" icon={<Globe className="w-4 h-4" />} color="text-blue-400 bg-blue-400/10 border-blue-400/20" />
            <TrafficRow source="Social Media" visits="18,200" percentage="20%" icon={<Share2 className="w-4 h-4" />} color="text-purple-400 bg-purple-400/10 border-purple-400/20" />
            <TrafficRow source="Referral" visits="9,100" percentage="10%" icon={<LinkIcon className="w-4 h-4" />} color="text-amber-400 bg-amber-400/10 border-amber-400/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, isPositive, icon }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-5 shadow-sm backdrop-blur-sm hover:border-slate-600 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 group-hover:scale-110 transition-transform shadow-inner">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
          isPositive ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"
        }`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {trend}
        </div>
      </div>
      <div>
        <h4 className="text-slate-400 text-sm font-medium mb-1">{title}</h4>
        <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function CategoryRow({ name, value, percentage, color }: { name: string, value: string, percentage: number, color: string }) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-slate-200 font-medium group-hover:text-white transition-colors">{name}</span>
        <span className="text-slate-400 text-sm font-medium">{value}</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
        <div className={`h-full rounded-full ${color} transition-all duration-1000 relative`} style={{ width: `${percentage}%` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}

function TrafficRow({ source, visits, percentage, icon, color }: { source: string, visits: string, percentage: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/80 hover:border-slate-600 transition-all cursor-pointer group">
      <div className="flex items-center gap-3.5">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105 ${color}`}>
          {icon}
        </div>
        <span className="text-slate-200 font-medium group-hover:text-white transition-colors">{source}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-white font-semibold">{visits}</span>
        <span className="text-xs text-slate-500 font-medium">{percentage}</span>
      </div>
    </div>
  );
}
