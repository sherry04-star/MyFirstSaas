"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Package, Users, BarChart2, Settings, LogOut } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";

const navItems = [
  { name: "Home", href: "/overview", icon: Home },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-[#334155] min-h-screen p-4 flex-col hidden md:flex">
      <div className="flex items-center space-x-2 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">SaaSify</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                ? "bg-blue-500/10 text-blue-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  }`}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 py-4">
        <div className="flex items-center justify-between space-x-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-inner flex-shrink-0"></div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Merchant</p>
              <p className="text-xs text-slate-400 truncate">demo@saasify.com</p>
            </div>
          </div>
          <form action={signOut}>
            <button type="submit" className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors flex-shrink-0" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
