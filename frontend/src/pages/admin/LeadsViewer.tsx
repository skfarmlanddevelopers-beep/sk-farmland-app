import { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  budget: string;
  notes: string;
  created_at: string;
}

export default function LeadsViewer() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return <div className="text-zinc-400">Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Leads</h2>
        <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-semibold">
          Total: {leads.length}
        </span>
      </div>

      {leads.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
          No leads have been submitted yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-colors rounded-xl p-5 flex flex-col gap-4">
              
              <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                      <Calendar size={12} />
                      {new Date(lead.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> New
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-zinc-300">
                    <Phone size={14} className="text-orange-500 mt-0.5 shrink-0" />
                    <span className="font-mono">{lead.phone}</span>
                  </div>
                  {lead.email && (
                    <div className="flex items-start gap-2 text-zinc-300">
                      <Mail size={14} className="text-orange-500 mt-0.5 shrink-0" />
                      <span className="break-all">{lead.email}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {lead.budget && (
                    <div>
                      <span className="text-xs text-zinc-500 block mb-0.5">Budget</span>
                      <span className="text-white font-medium">{lead.budget}</span>
                    </div>
                  )}
                  {lead.interest && (
                    <div>
                      <span className="text-xs text-zinc-500 block mb-0.5">Interest</span>
                      <span className="text-white font-medium">{lead.interest}</span>
                    </div>
                  )}
                </div>
              </div>

              {lead.notes && (
                <div className="mt-2 p-3 bg-zinc-950 rounded-lg text-sm text-zinc-400 border border-zinc-900 flex gap-2 items-start">
                  <FileText size={14} className="text-zinc-600 mt-0.5 shrink-0" />
                  <p className="leading-relaxed">{lead.notes}</p>
                </div>
              )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
