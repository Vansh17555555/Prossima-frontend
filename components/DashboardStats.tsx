"use client";

import { motion } from "framer-motion";
import { TrendingUp, FileCheck, Clock, Layers } from "lucide-react";

interface StatsProps {
  total: number;
  active: number;
  expiring: number;
}

export default function DashboardStats({ total, active, expiring }: StatsProps) {
  const stats = [
    { label: "Total Tenders", value: total.toLocaleString(), icon: Layers, color: "from-blue-500/20 to-blue-400/20", text: "text-blue-400" },
    { label: "Active Tenders", value: active.toLocaleString(), icon: FileCheck, color: "from-green-500/20 to-green-400/20", text: "text-green-400" },
    { label: "Expiring Soon", value: expiring.toLocaleString(), icon: Clock, color: "from-orange-500/20 to-orange-400/20", text: "text-orange-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all cursor-default"
        >
          <div className={`absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity`}>
            <stat.icon className="w-12 h-12" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
          </div>
          
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} opacity-30`}></div>
        </motion.div>
      ))}
    </div>
  );
}
