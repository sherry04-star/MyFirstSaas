"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search, Filter, Loader2, MapPin, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔴 NAYA HISSA: Status Update Function
  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // Local state update karein taake fauran nazar aaye
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error: any) {
      alert("Status update failed: " + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto selection:bg-blue-500/30">

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Orders Management</h1>
          <p className="text-slate-400">Manage real-time order fulfillment and status updates.</p>
        </div>
      </div>

      <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]/40">
          <h2 className="text-lg font-bold text-white">All Orders</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search orders..." className="bg-[#0f172a] border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-[#0f172a]/80 border-b border-slate-800 tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer Info</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" /></td></tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">#{order.id.substring(0, 6).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="text-white font-bold">{order.customer_name}</div>
                    <div className="text-xs text-slate-500">{order.customer_email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit ${order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      }`}>
                      {order.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                      {order.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">${order.total_amount.toFixed(2)}</td>

                  {/* 🔴 NAYA HISSA: Status Change Dropdown */}
                  <td className="px-6 py-4 text-center">
                    {updatingId === order.id ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-500" />
                    ) : (
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-[#0f172a] border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="Pending">Set Pending</option>
                        <option value="Delivered">Set Delivered</option>
                        <option value="Cancelled">Set Cancelled</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
