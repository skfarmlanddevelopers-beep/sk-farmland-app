import React, { useState, useEffect } from 'react';
import { Save, User, Lock, AlertCircle, CheckCircle2, Edit, Trash2, Plus, X } from 'lucide-react';

interface AdminUser {
  id: number;
  username: string;
}

export default function AdminSettings() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`/api/admin/users?t=${new Date().getTime()}`, { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage({ type: 'error', text: errorData?.error || `HTTP Error ${response.status} while fetching admins` });
      }
    } catch (err: any) {
      console.error('Failed to fetch admin users:', err);
      setMessage({ type: 'error', text: `Network error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage({ type: 'error', text: 'Username and password are required' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const url = editingId ? `/api/admin/users/${editingId}` : '/api/admin/users';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: editingId ? 'Admin updated successfully!' : 'New admin added successfully!' });
        setUsername('');
        setPassword('');
        setEditingId(null);
        await fetchAdmins();
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage({ type: 'error', text: errorData?.error || 'Failed to save admin credentials' });
      }
    } catch (err) {
      console.error('Error saving admin:', err);
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (admin: AdminUser) => {
    setEditingId(admin.id);
    setUsername(admin.username);
    setPassword('');
    setMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this admin account?')) return;
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Admin deleted successfully!' });
        await fetchAdmins();
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage({ type: 'error', text: errorData?.error || 'Failed to delete admin' });
      }
    } catch (err) {
      console.error('Failed to delete admin', err);
      setMessage({ type: 'error', text: 'An unexpected error occurred while deleting' });
    }
  };

  if (loading) return <div className="text-zinc-400">Loading settings...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Admin Settings</h2>
        <p className="text-zinc-400 text-sm mb-6">Manage login credentials and admin accounts.</p>

        {message && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-6 text-sm font-medium ${
            message.type === 'success' 
              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Add/Edit Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {editingId ? 'Edit Admin' : 'Add New Admin'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setUsername('');
                    setPassword('');
                    setMessage(null);
                  }}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <X size={14} /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  {editingId ? 'New Password' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder={editingId ? 'Enter new password' : 'Enter password'}
                    required
                  />
                </div>
                {editingId && (
                  <p className="text-xs text-zinc-500 mt-2">
                    Enter a new password to update this admin's credentials.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={saving || !username || !password}
                className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : (
                  <>
                    {editingId ? <Save size={18} /> : <Plus size={18} />} 
                    {editingId ? 'Update Credentials' : 'Add Admin'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List of Admins */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-between">
              Existing Admins
              <span className="text-xs font-normal bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">
                {admins.length} {admins.length === 1 ? 'Account' : 'Accounts'}
              </span>
            </h3>

            <div className="space-y-3">
              {admins.length === 0 ? (
                <div className="text-sm text-zinc-500 text-center py-4">No admins found.</div>
              ) : (
                admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-lg group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{admin.username}</div>
                        <div className="text-xs text-zinc-500">Admin ID: {admin.id}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(admin)}
                        className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                        title="Edit Admin"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                        title="Delete Admin"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
