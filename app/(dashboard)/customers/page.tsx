"use client";

import { useState } from "react";
import { Search, Download, MoreVertical, Mail } from "lucide-react";

const DUMMY_CUSTOMERS = [
  { id: 1, name: "Alice Freeman", email: "alice.freeman@example.com", orders: 12, spent: "$1,240.50", status: "Active", avatarColor: "bg-purple-500" },
  { id: 2, name: "Marcus Johnson", email: "marcus.j@example.com", orders: 3, spent: "$345.00", status: "Active", avatarColor: "bg-blue-500" },
  { id: 3, name: "Sarah Williams", email: "sarah.wills99@example.com", orders: 0, spent: "$0.00", status: "Inactive", avatarColor: "bg-emerald-500" },
  { id: 4, name: "James Smith", email: "jsmith.business@example.com", orders: 28, spent: "$4,890.20", status: "Active", avatarColor: "bg-amber-500" },
  { id: 5, name: "Emily Davis", email: "emily.davis@example.com", orders: 5, spent: "$590.00", status: "Active", avatarColor: "bg-pink-500" },
  { id: 6, name: "Robert Wilson", email: "r.wilson88@example.com", orders: 1, spent: "$120.00", status: "Inactive", avatarColor: "bg-indigo-500" },
];

const getStatusBadge = (status: string) => {
  if (status === 'Active') {
    return <span className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>;
  }
  return <span className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">Inactive</span>;
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = DUMMY_CUSTOMERS.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Customers</h1>
        <p className="text-slate-400 mt-1">Manage your customer base and view their purchase history.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1e293b]/50 border border-slate-700/50 text-white rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 backdrop-blur-sm shadow-sm"
          />
        </div>
        <button className="bg-[#1e293b] hover:bg-slate-800 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.98] shrink-0">
          <Download className="w-4 h-4 text-slate-400" />
          Export CSV
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold hidden sm:table-cell">Contact</th>
                <th className="px-6 py-4 font-semibold">Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0 ${customer.avatarColor}`}>
                          {getInitials(customer.name)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">{customer.name}</div>
                          {/* Email shown here on small screens */}
                          <div className="text-xs text-slate-400 sm:hidden mt-0.5">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300 font-medium">{customer.orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-200 font-semibold">{customer.spent}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-700/50 rounded-lg inline-flex items-center justify-center">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No customers found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-slate-700/50 flex items-center justify-between bg-slate-800/30">
          <span className="text-sm text-slate-400">
            Showing <span className="font-medium text-slate-300">{filteredCustomers.length > 0 ? 1 : 0}</span> to <span className="font-medium text-slate-300">{filteredCustomers.length}</span> of <span className="font-medium text-slate-300">{DUMMY_CUSTOMERS.length}</span> customers
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm text-slate-400 bg-[#1e293b] border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm text-slate-400 bg-[#1e293b] border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
