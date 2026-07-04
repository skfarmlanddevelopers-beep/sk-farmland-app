import { useState, useEffect } from 'react';
import { Trash2, Upload, Plus, X, Edit } from 'lucide-react';

interface Project {
  id: string;
  heading?: string;
  sub_heading?: string;
  name: string;
  price: string;
  bank_loan: string;
  images: string[];
  show_on_home?: boolean;
  display_order?: number;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [orderEdits, setOrderEdits] = useState<{ [id: string]: number }>({});
  const [savingOrder, setSavingOrder] = useState(false);

  // Form states
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [bankLoan, setBankLoan] = useState('');
  const [highlights, setHighlights] = useState<string[]>(['']);
  const [files, setFiles] = useState<FileList | null>(null);
  const [showOnHome, setShowOnHome] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projects?all=true&t=${new Date().getTime()}`, { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((proj: any) => ({
          ...proj,
          images: typeof proj.images === 'string' ? JSON.parse(proj.images) : proj.images,
          highlights: typeof proj.highlights === 'string' ? JSON.parse(proj.highlights) : proj.highlights,
        }));
        setProjects(formattedData);
        
        const initialOrders: { [id: string]: number } = {};
        formattedData.forEach((proj: Project) => {
          initialOrders[proj.id] = proj.display_order || 0;
        });
        setOrderEdits(initialOrders);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (!editingId && (!files || files.length === 0)) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('sub_heading', subHeading);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('bank_loan', bankLoan);
    
    const validHighlights = highlights.map(h => h.trim()).filter(h => h.length > 0);
    
    formData.append('highlights', JSON.stringify(validHighlights));
    formData.append('show_on_home', showOnHome.toString());

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });
    }

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        setHeading('');
        setSubHeading('');
        setName('');
        setPrice('');
        setBankLoan('');
        setHighlights(['']);
        setFiles(null);
        setShowOnHome(false);
        setEditingId(null);
        const fileInput = document.getElementById('projectImages') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        await fetchProjects();
      } else {
        alert('Action failed');
      }
    } catch (err) {
      console.error('Failed to save project', err);
      alert('Action failed');
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setHeading(project.heading || '');
    setSubHeading(project.sub_heading || '');
    setName(project.name || '');
    setPrice(project.price || '');
    setBankLoan(project.bank_loan || '');
    setHighlights(project.highlights?.length ? project.highlights : ['']);
    setShowOnHome(!!project.show_on_home);
    setFiles(null);
    const fileInput = document.getElementById('projectImages') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchProjects();
      }
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  const handleSaveOrder = async () => {
    setSavingOrder(true);
    try {
      const updates = Object.entries(orderEdits).map(([id, display_order]) => ({
        id: id,
        display_order
      }));

      const response = await fetch('/api/projects/order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (response.ok) {
        await fetchProjects();
        alert('Order updated successfully!');
      } else {
        alert('Failed to update order');
      }
    } catch (err) {
      console.error('Error saving order', err);
      alert('Network error while saving order');
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDeleteSingleImage = async (projectId: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`/api/projects/${projectId}/image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      if (response.ok) {
        // Update local state to reflect deletion
        setProjects(projects.map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              images: p.images.filter(img => img !== imageUrl)
            };
          }
          return p;
        }));
      } else {
        alert('Failed to delete image');
      }
    } catch (err) {
      console.error('Failed to delete image', err);
      alert('Network error while deleting image');
    }
  };

  if (loading) return <div className="text-zinc-400">Loading projects...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Manage Projects</h2>
        
        {/* Upload Form */}
        <form onSubmit={handleUpload} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setHeading('');
                  setSubHeading('');
                  setName('');
                  setPrice('');
                  setBankLoan('');
                  setHighlights(['']);
                  setShowOnHome(false);
                  setFiles(null);
                }}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <X size={14} /> Cancel Edit
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Heading (Orange Text)</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. VAIKUNTAM"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Project Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. Project 1"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Sub Heading / Location Text</label>
              <input
                type="text"
                value={subHeading}
                onChange={(e) => setSubHeading(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. Vaikuntam is towards Anekal Thalli Road"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Images {editingId ? '(Optional, leaves existing if empty)' : '*'}
              </label>
              <input
                id="projectImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                required={!editingId}
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. ₹849 per sq. ft."
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Bank Loan</label>
              <input
                type="text"
                value={bankLoan}
                onChange={(e) => setBankLoan(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. Available / Not Available"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Highlights</label>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const newHighlights = [...highlights];
                        newHighlights[index] = e.target.value;
                        setHighlights(newHighlights);
                      }}
                      className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                      placeholder={`Highlight ${index + 1} (e.g. 24x7 security)`}
                    />
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newHighlights = highlights.filter((_, i) => i !== index);
                          setHighlights(newHighlights);
                        }}
                        className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors shrink-0"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setHighlights([...highlights, ''])}
                  className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors"
                >
                  <Plus size={16} /> Add Another Highlight
                </button>
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 bg-zinc-950 p-4 rounded-lg border border-zinc-800">
              <input
                type="checkbox"
                id="showOnHome"
                checked={showOnHome}
                onChange={(e) => setShowOnHome(e.target.checked)}
                className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
              />
              <label htmlFor="showOnHome" className="text-sm font-semibold text-white cursor-pointer select-none">
                Show this project on the Home Page
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || !name || (!editingId && (!files || files.length === 0))}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <span className="flex items-center gap-2"><Upload className="animate-bounce" size={18} /> Saving...</span>
            ) : (
              <span className="flex items-center gap-2">
                {editingId ? <Upload size={18} /> : <Plus size={18} />}
                {editingId ? 'Update Project' : 'Add Project'}
              </span>
            )}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Existing Projects</h3>
          <button
            onClick={handleSaveOrder}
            disabled={savingOrder || projects.length === 0}
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700 disabled:opacity-50"
          >
            {savingOrder ? 'Saving...' : 'Save Order Changes'}
          </button>
        </div>
        {projects.length === 0 ? (
          <div className="text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            No projects added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => handleEditClick(project)}
                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                    title="Edit Project"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    {project.name}
                    {project.show_on_home && (
                      <span className="text-[10px] uppercase font-bold bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded border border-orange-500/30">
                        Home Page
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-zinc-500">Order:</label>
                      <input 
                        type="number" 
                        value={orderEdits[project.id] ?? 0}
                        onChange={(e) => setOrderEdits({...orderEdits, [project.id]: parseInt(e.target.value) || 0})}
                        className="w-16 bg-zinc-950 border border-zinc-700 rounded px-2 py-0.5 text-sm text-white focus:ring-1 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">{project.images?.length || 0} Images</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-xs text-zinc-500 mb-1">Price</span>
                    <span className="text-white font-medium">{project.price || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-500 mb-1">Bank Loan</span>
                    <span className="text-white font-medium">{project.bank_loan || 'N/A'}</span>
                  </div>
                </div>
                
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <span className="block text-xs text-zinc-500 mb-2">Highlights ({project.highlights.length})</span>
                    <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4 line-clamp-3">
                      {project.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>{typeof h === "object" && h !== null ? ((h as any).heading ? (h as any).heading + ": " + (h as any).text : (h as any).text) : h}</li>
                      ))}
                      {project.highlights.length > 3 && <li>...and {project.highlights.length - 3} more</li>}
                    </ul>
                  </div>
                )}
                
                {project.images && project.images.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-2 snap-x">
                    {project.images.map((img, i) => (
                      <div key={i} className="relative group/img shrink-0 snap-start">
                        <img src={img} alt="" className="h-16 w-16 object-cover rounded-lg" />
                        <button
                          onClick={() => handleDeleteSingleImage(project.id, img)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                          title="Delete image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
