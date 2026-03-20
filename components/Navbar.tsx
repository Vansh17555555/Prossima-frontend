"use client";

import { motion } from "framer-motion";
import { Search, Bell, User, LayoutDashboard, FileText, Settings, HelpCircle } from "lucide-react";

interface NavbarProps {
  onSearch: (term: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ onSearch, activeTab, onTabChange }: NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tenders', label: 'Tenders' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 glass px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center shadow-lg animate-glow">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            PROSSIMA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`transition-colors relative py-1 ${
                activeTab === item.id ? 'text-white' : 'hover:text-primary-purple'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-primary-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-primary-purple/50 transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tenders..." 
            className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted-foreground/60"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-purple rounded-full border-2 border-[#030303]"></span>
        </button>

        <div className="h-8 w-px bg-white/10 mx-1"></div>

        <button className="flex items-center gap-2 pl-2 group">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-purple/50 transition-all overflow-hidden">
            <User className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
          </div>
          <span className="text-sm font-medium hidden sm:block">Vansh Verma</span>
        </button>
      </div>
    </nav>
  );
}
