"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, FolderOpen, Users, MessageSquare, BarChart2,
  Settings, LogOut, Search, Plus, TrendingUp,
  DollarSign, Briefcase, Star, ChevronRight, Activity,
  Menu, X, RefreshCw, Send, Trash2
} from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Inquiry {
  id: string; name: string; email: string; budget: string;
  message: string; status: string; created_at: string;
}
interface Project {
  id: string; title: string; client: string; category: string;
  status: string; progress: number; budget: string; created_at: string;
}
interface Testimonial {
  id: string; name: string; role: string; company: string;
  rating: number; text: string; approved: boolean;
}

const statusColor: Record<string, string> = {
  Live: "text-green-400 bg-green-400/10 border-green-400/20",
  "In Progress": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Review: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Planning: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Paused: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  new: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  contacted: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  converted: "text-green-400 bg-green-400/10 border-green-400/20",
  closed: "text-gray-400 bg-gray-400/10 border-gray-400/20",
};

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", id: "dashboard" },
  { icon: <FolderOpen size={18} />, label: "Projects", id: "projects" },
  { icon: <MessageSquare size={18} />, label: "Inquiries", id: "inquiries" },
  { icon: <Users size={18} />, label: "Testimonials", id: "testimonials" },
  { icon: <BarChart2 size={18} />, label: "Analytics", id: "analytics" },
  { icon: <Settings size={18} />, label: "Settings", id: "settings" },
];

function Sidebar({ open, onClose, activeTab, setActiveTab, onLogout }: {
  open: boolean; onClose: () => void; activeTab: string;
  setActiveTab: (t: string) => void; onLogout: () => void;
}) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#111111] border-r border-white/5 z-40 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Image src="/images/roshix-logo.png" alt="Roshix" width={130} height={40} className="h-8 w-auto" />
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? "bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/20" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            >
              {item.icon}{item.label}
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="/" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors px-3 py-2">← Back to Website</Link>
          <button onClick={onLogout} className="w-full flex items-center gap-2 text-xs text-red-400/60 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-400/5">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function DashboardTab({ projects, inquiries }: { projects: Project[]; inquiries: Inquiry[] }) {
  const newInquiries = inquiries.filter(i => i.status === "new").length;
  const stats = [
    { label: "Total Projects", value: String(projects.length), icon: <Briefcase size={20} />, sub: "All time" },
    { label: "Active Projects", value: String(projects.filter(p => p.status === "In Progress").length), icon: <DollarSign size={20} />, sub: "In progress" },
    { label: "Total Inquiries", value: String(inquiries.length), icon: <MessageSquare size={20} />, sub: `${newInquiries} new` },
    { label: "Avg. Rating", value: "4.9★", icon: <Star size={20} />, sub: "Client feedback" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-[#111111] border border-white/5 rounded-xl p-5 group hover:border-[#FF6B00]/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/30 text-xs">{s.label}</span>
              <span className="text-[#FF6B00]/60">{s.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-xs text-green-400 flex items-center gap-1"><TrendingUp size={12} />{s.sub}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h2 className="font-semibold text-white">Recent Projects</h2>
            <span className="text-xs text-white/30">{projects.length} total</span>
          </div>
          <div className="divide-y divide-white/5">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3">
                <div><p className="text-sm text-white font-medium">{p.title}</p><p className="text-xs text-white/40">{p.client}</p></div>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColor[p.status] || "text-white/50 bg-white/5 border-white/10"}`}>{p.status}</span>
              </div>
            ))}
            {projects.length === 0 && <div className="px-5 py-8 text-center text-white/30 text-sm">No projects yet</div>}
          </div>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h2 className="font-semibold text-white">Recent Inquiries</h2>
            <span className="text-xs text-[#FF6B00]">{newInquiries} new</span>
          </div>
          <div className="divide-y divide-white/5">
            {inquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] text-xs font-bold flex-shrink-0">{inq.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{inq.name}</p>
                  <p className="text-xs text-white/40 truncate">{inq.email}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[inq.status] || "text-white/50 bg-white/5 border-white/10"}`}>{inq.status}</span>
              </div>
            ))}
            {inquiries.length === 0 && <div className="px-5 py-8 text-center text-white/30 text-sm">No inquiries yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsTab({ projects, onRefresh }: { projects: Project[]; onRefresh: () => void }) {
  const supabase = createClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", client: "", category: "Web", status: "Planning", progress: 0, budget: "", description: "" });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("projects").insert([{ ...form, tech: [] }]);
    setShowForm(false);
    setForm({ title: "", client: "", category: "Web", status: "Planning", progress: 0, budget: "", description: "" });
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm py-2 px-4"><Plus size={14} /> Add Project</button>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd} className="bg-[#111111] border border-[#FF6B00]/20 rounded-xl p-6 grid grid-cols-2 gap-4">
            {[{ key: "title", label: "Project Title" }, { key: "client", label: "Client Name" }, { key: "budget", label: "Budget" }].map((f) => (
              <div key={f.key}>
                <label className="text-xs text-white/40 mb-1 block uppercase tracking-wider">{f.label}</label>
                <input required value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50" />
              </div>
            ))}
            <div>
              <label className="text-xs text-white/40 mb-1 block uppercase tracking-wider">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50">
                {["Planning", "In Progress", "Review", "Live", "Paused"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block uppercase tracking-wider">Progress (%)</label>
              <input type="number" min={0} max={100} value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50" />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="btn-primary text-sm py-2 px-6">Save Project</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm py-2 px-6">Cancel</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Project", "Client", "Progress", "Budget", "Status", "Action"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-white/30 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 group">
                  <td className="px-5 py-3.5"><p className="text-sm font-medium text-white">{p.title}</p><p className="text-xs text-white/40">{p.client}</p></td>
                  <td className="px-5 py-3.5 text-sm text-white/50">{p.client}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C33]" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-white/40">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-white/60 font-mono">{p.budget}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColor[p.status] || "text-white/50 bg-white/5 border-white/10"}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => handleDelete(p.id)} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-white/30 text-sm">No projects yet. Click &quot;Add Project&quot; to start!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InquiriesTab({ inquiries, onRefresh }: { inquiries: Inquiry[]; onRefresh: () => void }) {
  const supabase = createClient();
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    setSelected(prev => prev ? { ...prev, status } : null);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("inquiries").delete().eq("id", id);
    setSelected(null);
    onRefresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Inquiries ({inquiries.length})</h2>
        <button onClick={onRefresh} className="btn-outline text-sm py-2 px-4"><RefreshCw size={14} /> Refresh</button>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden max-h-[600px] overflow-y-auto">
          {inquiries.map((inq) => (
            <div key={inq.id} onClick={() => setSelected(inq)}
              className={`flex items-center gap-3 px-5 py-4 cursor-pointer border-b border-white/5 transition-colors ${selected?.id === inq.id ? "bg-[#FF6B00]/10" : "hover:bg-white/2"}`}>
              <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] font-bold flex-shrink-0">{inq.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm text-white font-medium truncate">{inq.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ml-2 flex-shrink-0 ${statusColor[inq.status] || "text-white/50 bg-white/5 border-white/10"}`}>{inq.status}</span>
                </div>
                <p className="text-xs text-white/40 truncate">{inq.email}</p>
                <p className="text-xs text-white/25 truncate">{inq.message?.substring(0, 60)}...</p>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && <div className="px-5 py-12 text-center text-white/30 text-sm">No inquiries yet</div>}
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white text-lg">{selected.name}</h3>
                <button onClick={() => handleDelete(selected.id)} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
              </div>
              {[{ label: "Email", value: selected.email }, { label: "Budget", value: selected.budget || "Not specified" }, { label: "Date", value: new Date(selected.created_at).toLocaleDateString("en-IN") }].map(({ label, value }) => (
                <div key={label}><p className="text-xs text-white/30 mb-1 uppercase tracking-wider">{label}</p><p className="text-sm text-white">{value}</p></div>
              ))}
              <div>
                <p className="text-xs text-white/30 mb-1 uppercase tracking-wider">Message</p>
                <p className="text-sm text-white/70 leading-relaxed bg-[#1A1A1A] rounded-lg p-3">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs text-white/30 mb-2 uppercase tracking-wider">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {["new", "contacted", "converted", "closed"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize ${selected.status === s ? "bg-[#FF6B00] text-white border-[#FF6B00]" : "text-white/40 border-white/10 hover:border-[#FF6B00]/40"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <a href={`mailto:${selected.email}?subject=Re: Your Inquiry - Roshix Solutions`} className="btn-primary text-sm py-2.5 w-full justify-center flex items-center gap-2">
                <Send size={14} /> Reply via Email
              </a>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <MessageSquare size={32} className="text-white/10 mb-3" />
              <p className="text-white/30 text-sm">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TestimonialsTab({ testimonials, onRefresh }: { testimonials: Testimonial[]; onRefresh: () => void }) {
  const supabase = createClient();

  const toggleApprove = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ approved: !current }).eq("id", id);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-white">Testimonials ({testimonials.length})</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#111111] border border-white/5 rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-semibold text-white">{t.name}</p><p className="text-xs text-white/40">{t.role} — {t.company}</p></div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => toggleApprove(t.id, t.approved)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${t.approved ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-white/30 border-white/10 hover:border-green-400/30"}`}>
                  {t.approved ? "✓ Live" : "Approve"}
                </button>
                <button onClick={() => handleDelete(t.id)} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < t.rating ? "text-[#FF6B00]" : "text-white/10"}>★</span>)}</div>
            <p className="text-sm text-white/60 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
          </div>
        ))}
        {testimonials.length === 0 && <div className="col-span-2 py-12 text-center text-white/30 text-sm bg-[#111111] border border-white/5 rounded-xl">No testimonials yet</div>}
      </div>
    </div>
  );
}

function AnalyticsTab({ projects, inquiries }: { projects: Project[]; inquiries: Inquiry[] }) {
  const byStatus = ["Planning", "In Progress", "Review", "Live", "Paused"].map(s => ({ label: s, count: projects.filter(p => p.status === s).length }));
  const byInqStatus = ["new", "contacted", "converted", "closed"].map(s => ({ label: s, count: inquiries.filter(i => i.status === s).length }));
  const maxP = Math.max(...byStatus.map(s => s.count), 1);
  const maxI = Math.max(...byInqStatus.map(s => s.count), 1);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Analytics</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-5">Projects by Status</h3>
          <div className="space-y-3">
            {byStatus.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-24 flex-shrink-0">{s.label}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(s.count / maxP) * 100}%` }} transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C33] rounded-full" />
                </div>
                <span className="text-xs text-white/60 w-4">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-5">Inquiries by Status</h3>
          <div className="space-y-3">
            {byInqStatus.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20 flex-shrink-0 capitalize">{s.label}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(s.count / maxI) * 100}%` }} transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#FF8C33] to-[#FFB366] rounded-full" />
                </div>
                <span className="text-xs text-white/60 w-4">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: projects.length, color: "#FF6B00" },
          { label: "Live Projects", value: projects.filter(p => p.status === "Live").length, color: "#22c55e" },
          { label: "Total Inquiries", value: inquiries.length, color: "#FF8C33" },
          { label: "Converted", value: inquiries.filter(i => i.status === "converted").length, color: "#a855f7" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111111] border border-white/5 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white">Settings</h2>
      <div className="bg-[#111111] border border-white/5 rounded-xl p-6 space-y-5">
        <h3 className="font-semibold text-white border-b border-white/5 pb-3">Site Information</h3>
        {[{ label: "Company Name", value: "Roshix Solutions Pvt. Ltd." }, { label: "Contact Email", value: "hello@roshixsolutions.com" }, { label: "Phone", value: "+91 98765 43210" }, { label: "Location", value: "Pune, Maharashtra, India" }].map((f) => (
          <div key={f.label}>
            <label className="text-xs text-white/40 mb-2 block uppercase tracking-wider">{f.label}</label>
            <input defaultValue={f.value} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50" />
          </div>
        ))}
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="btn-primary text-sm py-2.5 px-6">
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
      <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
        <h3 className="font-semibold text-white border-b border-white/5 pb-3 mb-4">Admin Credentials</h3>
        <div className="bg-[#FF6B00]/5 border border-[#FF6B00]/10 rounded-lg p-4">
          <p className="text-xs text-white/50 leading-relaxed">
            Current login: <span className="text-[#FF6B00] font-mono">admin@roshix.com / Admin@123</span>
            <br /><br />
            To change password, update in <span className="font-mono text-white/60">.env.local</span>:
            <br />
            <span className="font-mono text-white/60">NEXT_PUBLIC_ADMIN_EMAIL=your@email.com</span>
            <br />
            <span className="font-mono text-white/60">NEXT_PUBLIC_ADMIN_PASSWORD=yourpassword</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, iRes, tRes] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      ]);
      if (pRes.data) setProjects(pRes.data);
      if (iRes.data) setInquiries(iRes.data);
      if (tRes.data) setTestimonials(tRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    const session = localStorage.getItem("roshix_admin");
    if (!session) { router.push("/admin-login"); return; }
    fetchData();
  }, [fetchData, router]);

  const handleLogout = () => {
    localStorage.removeItem("roshix_admin");
    router.push("/admin-login");
  };

  const renderTab = () => {
    if (loading) return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-white/40">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
          </svg>
          Loading data from Supabase...
        </div>
      </div>
    );
    switch (activeTab) {
      case "dashboard": return <DashboardTab projects={projects} inquiries={inquiries} />;
      case "projects": return <ProjectsTab projects={projects} onRefresh={fetchData} />;
      case "inquiries": return <InquiriesTab inquiries={inquiries} onRefresh={fetchData} />;
      case "testimonials": return <TestimonialsTab testimonials={testimonials} onRefresh={fetchData} />;
      case "analytics": return <AnalyticsTab projects={projects} inquiries={inquiries} />;
      case "settings": return <SettingsTab />;
      default: return <DashboardTab projects={projects} inquiries={inquiries} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        <header className="h-16 bg-[#111111] border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input placeholder="Search..." className="bg-[#1A1A1A] border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF6B00]/40 w-56" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} title="Refresh" className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-white/50 hover:text-[#FF6B00] transition-colors">
              <RefreshCw size={15} />
            </button>
            <div className="flex items-center gap-2 text-xs text-white/30 bg-[#1A1A1A] border border-white/5 px-3 py-2 rounded-lg">
              <Activity size={12} className="text-[#FF6B00]" /> Live
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
              <span>Admin</span><ChevronRight size={12} /><span className="text-white/60 capitalize">{activeTab}</span>
            </div>
            {renderTab()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}