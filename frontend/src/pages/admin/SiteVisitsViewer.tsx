import { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, FileText, CheckCircle2, Wallet, MapPin } from 'lucide-react';

interface SiteVisit {
  id: number;
  name: string;
  phone: string;
  email: string;
  project_interest: string;
  budget: string;
  preferred_date: string;
  notes: string;
  created_at: string;
}

export default function SiteVisitsViewer() {
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteVisits = async () => {
      try {
        const response = await fetch('/api/site-visits');
        if (response.ok) {
          const data = await response.json();
          setSiteVisits(data);
        }
      } catch (err) {
        console.error('Failed to fetch site visits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteVisits();
  }, []);

  if (loading) {
    return <div className="text-zinc-400">Loading site visits...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Site Visit Requests</h2>
          <p className="text-zinc-400 text-sm">Manage all scheduled site visits.</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
          <Calendar size={18} />
          Total Bookings: {siteVisits.length}
        </div>
      </div>

      {siteVisits.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
          No site visit requests yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {siteVisits.map((visit) => (
            <div key={visit.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{visit.name}</h3>
                    <div className="text-xs text-zinc-500 flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-500" />
                      Received {new Date(visit.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-4 bg-black/50 rounded-lg p-3 border border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone size={14} className="text-zinc-500" />
                  <a href={`tel:${visit.phone}`} className="hover:text-orange-400 transition-colors">{visit.phone}</a>
                </div>
                {visit.email && (
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail size={14} className="text-zinc-500" />
                    <a href={`mailto:${visit.email}`} className="truncate hover:text-orange-400 transition-colors">{visit.email}</a>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-zinc-300 col-span-2 mt-1">
                  <MapPin size={14} className="text-orange-500 shrink-0" />
                  <span className="font-medium text-orange-50/90">{visit.project_interest || 'Not specified'}</span>
                </div>
                
                <div className="flex items-center gap-2 text-zinc-300 col-span-2">
                  <Wallet size={14} className="text-emerald-500 shrink-0" />
                  <span>Budget: <span className="font-medium text-emerald-400/90">{visit.budget || 'Not specified'}</span></span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300 col-span-2">
                  <Calendar size={14} className="text-blue-500 shrink-0" />
                  <span>Preferred Date: <span className="font-medium text-blue-400/90">{visit.preferred_date || 'To be decided'}</span></span>
                </div>
              </div>

              {visit.notes && (
                <div className="text-sm bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1 text-xs font-semibold uppercase tracking-wider">
                    <FileText size={12} />
                    Additional Notes
                  </div>
                  <p className="text-zinc-300 italic whitespace-pre-wrap">{visit.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
