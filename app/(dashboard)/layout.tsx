import Sidebar from "@/components/Sidebar";
import { Menu, Search, Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/60 flex items-center justify-between px-4 sm:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="md:hidden text-slate-400 hover:text-white transition-colors p-1 -ml-1">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex relative max-w-xs w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search everywhere..."
                className="w-full bg-[#1e293b]/50 border border-slate-700/50 text-white rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 backdrop-blur-sm"
              />
            </div>
            
            {/* Mobile Brand */}
            <div className="md:hidden flex-1 text-center font-bold text-white tracking-tight text-lg">
              SaaSify
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="text-slate-400 hover:text-white transition-colors relative p-2 rounded-full hover:bg-slate-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0f172a]"></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
