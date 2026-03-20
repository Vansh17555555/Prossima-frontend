"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Tag, ChevronRight, Activity } from "lucide-react";

interface Tender {
  tender_no: string;
  department: string;
  title: string;
  status: string;
  work_area: string;
  due_at: string;
  due_days: string;
  pdf_link: string;
}

export default function TenderCard({ tender }: { tender: Tender }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass p-5 rounded-2xl group hover:border-primary-purple/30 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/5 blur-[60px] rounded-full pointer-events-none"></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground group-hover:text-primary-blue transition-colors">
              {tender.tender_no}
            </span>
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${
              tender.status === 'Open' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
            }`}>
              {tender.status}
            </span>
          </div>
          <h3 className="text-sm font-semibold leading-relaxed line-clamp-2 group-hover:text-white transition-colors">
            {tender.title}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-1 truncate italic">
            {tender.department}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{tender.work_area}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{tender.due_at ? new Date(tender.due_at).toLocaleDateString() : 'N/A'}</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
        <div className="p-1.5 rounded-full bg-primary-purple shadow-lg shadow-primary-purple/20">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
