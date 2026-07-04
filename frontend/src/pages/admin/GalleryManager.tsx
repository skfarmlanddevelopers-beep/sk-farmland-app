import { useState, useEffect } from 'react';
import { Trash2, Upload } from 'lucide-react';

interface GalleryImage {
  id: string;
  image: string;
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<string>('');

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        // filter out only uploaded ones that have id as timestamp (or just show all)
        setImages(data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery images', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedFiles(null);
        const fileInput = document.getElementById('gallery-upload') as HTMLInputElement;
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const response = await fetch(`/api/gallery/${id}`, {
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

  // We only allow deleting custom uploaded images from here
  const customImages = images.filter(img => img.image.startsWith('/uploads/'));

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Gallery Images</h2>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-zinc-400 mb-1">Image File</label>
            <input
              id="gallery-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20"
            />
          </div>
          
          <button
            type="submit"
            disabled={uploading || !selectedFiles || selectedFiles.length === 0}
            className="w-full md:w-auto px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {uploading ? 'Uploading...' : <><Upload size={18} /> Upload</>}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 mb-4">Custom Uploaded Images ({customImages.length})</h3>
        {customImages.length === 0 ? (
          <p className="text-zinc-500 text-sm">No custom images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customImages.map(img => (
              <div key={img.id} className="flex items-center gap-4 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <img src={img.image} alt="Gallery" className="w-20 h-20 object-cover rounded" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-zinc-400 break-all">{img.image}</p>
                </div>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
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
  );
}
