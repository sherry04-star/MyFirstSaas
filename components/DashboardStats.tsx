import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    {
      name: "Total Sales",
      value: "$45,231.89",
      change: "+20.1%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-emerald-500/10 text-emerald-500",
      changeColor: "bg-emerald-500/10 text-emerald-400"
    },
    {
      name: "Active Sessions",
      value: "2,350",
      change: "+15.2%",
      isPositive: true,
      icon: Activity,
      color: "bg-blue-500/10 text-blue-500",
      changeColor: "bg-emerald-500/10 text-emerald-400"
    },
    {
      name: "Conversion Rate",
      value: "3.24%",
      change: "-0.4%",
      isPositive: false,
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-500",
      changeColor: "bg-red-500/10 text-red-400"
    },
    {
      name: "Total Customers",
      value: "12,234",
      change: "+4.1%",
      isPositive: true,
      icon: Users,
      color: "bg-orange-500/10 text-orange-500",
      changeColor: "bg-emerald-500/10 text-emerald-400"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-[#1e293b] rounded-2xl p-6 border border-[#334155] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl transition-colors group-hover:bg-opacity-20 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${stat.changeColor}`}
                >
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.name}</h3>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Dummy Chart Area */}
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#334155] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
            <p className="text-sm text-slate-400">Daily revenue for the past week</p>
          </div>
          <select className="bg-[#0f172a] border border-[#334155] text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
        </div>
        
        {/* CSS-based Bar Chart */}
        <div className="h-64 flex items-end justify-between space-x-2 pt-4 border-b border-dashed border-[#334155]">
          {[40, 70, 45, 90, 65, 85, 110].map((height, i) => (
            <div key={i} className="w-full flex flex-col items-center group h-full justify-end relative">
              {/* Tooltip */}
              <div className="absolute -top-10 bg-slate-800 text-white text-xs py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-10 shadow-lg border border-slate-700 whitespace-nowrap">
                ${height * 100}
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-700"></div>
              </div>
              
              {/* Bar */}
              <div
                className="w-full max-w-[48px] bg-gradient-to-t from-blue-600/40 to-blue-400/60 hover:from-blue-500/60 hover:to-blue-300/80 rounded-t-lg transition-all duration-300 relative cursor-pointer group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                style={{ height: `${(height / 110) * 100}%` }}
              >
              </div>
              <div className="text-slate-500 text-xs mt-4 font-medium">Day {i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
