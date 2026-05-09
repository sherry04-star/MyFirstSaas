"use client";

import { useState } from "react";
import { User, Store, Bell, Upload, Save } from "lucide-react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 max-w-4xl mx-auto xl:mx-0">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account preferences and store configurations.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <section className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
          <div className="p-6 border-b border-slate-700/50 flex items-center gap-3 bg-slate-800/30">
            <User className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-white">Profile Information</h2>
          </div>
          <div className="p-6 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-inner flex items-center justify-center flex-shrink-0 relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Profile Avatar</h3>
                <p className="text-sm text-slate-400 mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors">
                    Upload New
                  </button>
                  <button className="px-4 py-2 text-slate-400 hover:text-red-400 text-sm font-medium transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Merchant Admin"
                  className="w-full bg-[#0f172a] border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="demo@saasify.com"
                  className="w-full bg-[#0f172a] border border-slate-700/50 rounded-xl px-4 py-3 text-slate-400 placeholder-slate-500 focus:outline-none cursor-not-allowed opacity-80"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Store Preferences */}
        <section className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
          <div className="p-6 border-b border-slate-700/50 flex items-center gap-3 bg-slate-800/30">
            <Store className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-white">Store Preferences</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Store Name</label>
              <input
                type="text"
                defaultValue="SaaSify Premium"
                className="w-full bg-[#0f172a] border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
              <div className="relative">
                <select defaultValue="USD" className="w-full bg-[#0f172a] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                  <option value="CAD">CAD ($) - Canadian Dollar</option>
                  <option value="AUD">AUD ($) - Australian Dollar</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
          <div className="p-6 border-b border-slate-700/50 flex items-center gap-3 bg-slate-800/30">
            <Bell className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-white">Notifications</h2>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium mb-1">Email Alerts</h4>
                <p className="text-sm text-slate-400">Receive daily summaries and important account updates.</p>
              </div>
              <button 
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center shrink-0 ml-4 ${emailAlerts ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <span className={`w-4 h-4 bg-white rounded-full transition-transform absolute ${emailAlerts ? 'translate-x-7' : 'translate-x-1'}`}></span>
              </button>
            </div>

            <div className="w-full h-px bg-slate-700/50"></div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium mb-1">SMS Alerts</h4>
                <p className="text-sm text-slate-400">Get text messages for critical stock alerts and new orders.</p>
              </div>
              <button 
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center shrink-0 ml-4 ${smsAlerts ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <span className={`w-4 h-4 bg-white rounded-full transition-transform absolute ${smsAlerts ? 'translate-x-7' : 'translate-x-1'}`}></span>
              </button>
            </div>

          </div>
        </section>

        {/* Action Button */}
        <div className="flex justify-end pt-4 pb-12">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all active:scale-95 flex items-center gap-2">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
