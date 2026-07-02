import { useState, useEffect } from 'react';
import { Trash2, Upload } from 'lucide-react';

interface HeroImage {
  id: number;
  side: 'left' | 'right';
  image_path: string;
  created_at: string;
}

export default function HeroImagesManager() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [side, setSide] = useState<'left' | 'right'>('left');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/hero-images');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (err) {
      console.error('Failed to fetch hero images', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('side', side);
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/hero-images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        await fetchImages();
      } else {
        const data = await response.json();
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const response = await fetch(`/api/hero-images/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchImages();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  if (loading) {
    return <div className="text-zinc-400">Loading images...</div>;
  }

  const leftImages = images.filter(img => img.side === 'left');
  const rightImages = images.filter(img => img.side === 'right');

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Hero Images</h2>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-zinc-400 mb-1">Target Side</label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value as 'left' | 'right')}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="left">Left Carousel</option>
              <option value="right">Right Carousel</option>
            </select>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-zinc-400 mb-1">Image File</label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20"
            />
          </div>
          
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="w-full md:w-auto px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {uploading ? 'Uploading...' : <><Upload size={18} /> Upload</>}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 mb-4">Left Carousel Images ({leftImages.length})</h3>
          {leftImages.length === 0 ? (
            <p className="text-zinc-500 text-sm">No custom images uploaded. Default static images will be shown.</p>
          ) : (
            <div className="space-y-4">
              {leftImages.map(img => (
                <div key={img.id} className="flex items-center gap-4 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <img src={img.image_path} alt="Left Hero" className="w-20 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300 break-all">{img.image_path}</p>
                    <p className="text-xs text-zinc-500">{new Date(img.created_at).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 mb-4">Right Carousel Images ({rightImages.length})</h3>
          {rightImages.length === 0 ? (
            <p className="text-zinc-500 text-sm">No custom images uploaded. Default static images will be shown.</p>
          ) : (
            <div className="space-y-4">
              {rightImages.map(img => (
                <div key={img.id} className="flex items-center gap-4 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <img src={img.image_path} alt="Right Hero" className="w-20 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300 break-all">{img.image_path}</p>
                    <p className="text-xs text-zinc-500">{new Date(img.created_at).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
