import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Users, Settings, LogOut, Menu, X, Monitor } from 'lucide-react';
import { PageId } from '../../types';
import HeroImagesManager from './HeroImagesManager';
import GalleryManager from './GalleryManager';
import LeadsViewer from './LeadsViewer';
import ProjectsManager from './ProjectsManager';
import SiteVisitsViewer from './SiteVisitsViewer';

interface AdminDashboardProps {
  setActivePage: (page: PageId) => void;
}

type TabId = 'dashboard' | 'projects' | 'gallery' | 'leads' | 'site-visits' | 'settings' | 'hero-images';

export default function AdminDashboard({ setActivePage }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ projects: 0, leads: 0, gallery: 0, siteVisits: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, [activeTab]); // Refetch stats when switching tabs

  const tabs = [
    { id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'projects', label: 'Manage Projects', icon: FolderKanban },
    { id: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
    { id: 'leads', label: 'View Leads', icon: Users },
    { id: 'site-visits', label: 'Site Visits', icon: Monitor }, // Using monitor icon for now
    { id: 'hero-images', label: 'Hero Images', icon: Monitor },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const handleLogout = () => {
    sessionStorage.removeItem('sk_admin_auth');
    setActivePage('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Welcome, Admin</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Projects</h3>
                <p className="text-3xl font-bold text-white">{stats.projects}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Leads</h3>
                <p className="text-3xl font-bold text-white">{stats.leads}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <h3 className="text-zinc-400 text-sm font-medium mb-2">Gallery Images</h3>
                <p className="text-3xl font-bold text-white">{stats.gallery}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl border-l-4 border-l-orange-500">
                <h3 className="text-zinc-400 text-sm font-medium mb-2">Site Visits</h3>
                <p className="text-3xl font-bold text-white">{stats.siteVisits}</p>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return <ProjectsManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'leads':
        return <LeadsViewer />;
      case 'site-visits':
        return <SiteVisitsViewer />;
      case 'hero-images':
        return <HeroImagesManager />;
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
              Settings features coming soon.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-zinc-950 border-b border-zinc-900 p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-bold text-orange-500">SK Admin</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-zinc-400 hover:text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : 0 }} // On mobile handled by CSS classes
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-orange-500">SK Admin</h1>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-500 border-r-2 border-orange-500'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}
