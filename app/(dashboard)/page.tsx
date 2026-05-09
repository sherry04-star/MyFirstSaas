import DashboardStats from "@/components/DashboardStats";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Welcome back, here's what's happening with your store today.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all active:scale-95 w-full sm:w-auto">
          Download Report
        </button>
      </div>

      <DashboardStats />
    </div>
  );
}
