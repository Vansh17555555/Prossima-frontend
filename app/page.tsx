"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import TenderCard from "../components/TenderCard";
import { Filter, RefreshCcw, LayoutGrid, List as ListIcon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Home() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const LIMIT = 12;

  const fetchTenders = async (query = "", currentOffset = 0, append = false) => {
    if (!append) setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await axios.get(`${baseUrl}/api/tenders?limit=${LIMIT}&offset=${currentOffset}&q=${query}`);
      
      if (response.data && response.data.tenders) {
        if (append) {
          setTenders(prev => [...prev, ...response.data.tenders]);
        } else {
          setTenders(response.data.tenders);
        }
        setTotalCount(response.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching tenders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchTenders(searchTerm, 0, false);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleLoadMore = () => {
    const nextOffset = offset + LIMIT;
    setOffset(nextOffset);
    fetchTenders(searchTerm, nextOffset, true);
  };

  return (
    <main className="min-h-screen pb-20">
      <Navbar onSearch={handleSearch} />

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

        <DashboardStats 
          total={totalCount} 
          active={Math.floor(totalCount * 0.4)} 
          expiring={Math.floor(totalCount * 0.05)} 
          growth="+12.5%" 
        />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Latest Tenders
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                Found {tenders.length}
              </span>
            </h2>
            <button 
              onClick={() => fetchTenders(searchTerm)}
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
                  <TenderCard key={`${tender.tender_no}-${tender.department}`} tender={tender} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {tenders.length < totalCount && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleLoadMore}
                disabled={loading}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all font-bold text-sm flex items-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Load More Tenders
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const MOCK_DATA = [
  { tender_no: "WCR-EL-2024-042", department: "ELECTRICAL/WCR", title: "Electrification of various sections in West Central Railway Including Sub-stations", status: "Open", work_area: "Jabalpur, MP", due_at: "2024-05-15T14:30:00Z", due_days: "10", pdf_link: "#" },
  { tender_no: "NR-CIVIL-25-101", department: "CIVIL/NR", title: "Construction of Loop Line with Platform and other utility shifted works at Ambala Cantt", status: "Open", work_area: "Ambala, HR", due_at: "2024-06-01T10:00:00Z", due_days: "20", pdf_link: "#" },
  { tender_no: "SR-SNT-2024-88", department: "S&T/SR", title: "Maintenance of S&T Assets for a period of 2 years in Madurai Division", status: "Open", work_area: "Madurai, TN", due_at: "2024-05-20T11:00:00Z", due_days: "15", pdf_link: "#" },
];
