"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import TenderCard from "../components/TenderCard";
import { Filter, RefreshCcw, LayoutGrid, List as ListIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tender {
  tender_no: string;
  work_name: string;
  status: string;
  work_area: string;
  closing_date: string;
}

export default function Home() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const fetchTenders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/tenders?limit=12");
      // Fallback data if API is not running or empty for demonstration
      if (response.data && response.data.length > 0) {
        setTenders(response.data);
      } else {
        setTenders(MOCK_DATA);
      }
    } catch (error) {
      console.error("Error fetching tenders:", error);
      setTenders(MOCK_DATA); // Use mock data on error for visual demo
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-xs font-bold tracking-wider mb-4"
            >
              <RefreshCcw className="w-3 h-3" />
              LIVE UPDATES ACTIVE
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Tender Analytics <span className="text-primary-purple">&</span> Control
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Real-time monitoring and analytics for IREPS railway tenders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-purple text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-purple text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all font-medium text-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </header>

        <DashboardStats />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Latest Tenders
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                Found {tenders.length}
              </span>
            </h2>
            <button 
              onClick={fetchTenders}
              className="text-xs text-primary-purple hover:underline font-medium"
            >
              Refresh Results
            </button>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="glass h-48 rounded-2xl animate-pulse bg-white/5"></div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
                }
              >
                {tenders.map((tender) => (
                  <TenderCard key={tender.tender_no} tender={tender} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

const MOCK_DATA = [
  { tender_no: "WCR-EL-2024-042", work_name: "Electrification of various sections in West Central Railway Including Sub-stations", status: "Open", work_area: "Jabalpur, MP", closing_date: "2024-05-15" },
  { tender_no: "NR-CIVIL-25-101", work_name: "Construction of Loop Line with Platform and other utility shifted works at Ambala Cantt", status: "Open", work_area: "Ambala, HR", closing_date: "2024-06-01" },
  { tender_no: "SR-SNT-2024-88", work_name: "Maintenance of S&T Assets for a period of 2 years in Madurai Division", status: "Open", work_area: "Madurai, TN", closing_date: "2024-05-20" },
  { tender_no: "ER-MECH-24-009", work_name: "Supply and Commissioning of 500kW Solar Plant at Howrah Station", status: "Closed", work_area: "Howrah, WB", closing_date: "2024-04-10" },
  { tender_no: "WR-TRD-24-512", work_name: "Replacement of OHE insulators and contact wires at Mumbai Central", status: "Open", work_area: "Mumbai, MH", closing_date: "2024-05-28" },
  { tender_no: "CR-COMM-001-A", work_name: "Digital Signage implementation for various stations in Pune Division", status: "Open", work_area: "Pune, MH", closing_date: "2024-06-15" },
  { tender_no: "SCR-PW-2024-04", work_name: "Periodic track renewal and sleepers replacement in Secunderabad Division", status: "Closed", work_area: "Secunderabad, TS", closing_date: "2024-03-30" },
  { tender_no: "NER-GEN-24-11", work_name: "Annual Maintenance Contract for IT Infrastructure across various offices", status: "Open", work_area: "Gorakhpur, UP", closing_date: "2024-05-12" },
];
