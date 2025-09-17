import { useState } from 'react';
import { Certificate } from '../types/professional';
import { FaTrophy, FaEdit, FaTrash } from 'react-icons/fa';

interface CertificateManagerProps {
  certificates: Certificate[];
  onAddCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  onUpdateCertificate: (id: string, certificate: Partial<Certificate>) => void;
  onDeleteCertificate: (id: string) => void;
}

const popularPlatforms = [
  'Coursera',
  'Udemy',
  'LinkedIn Learning',
  'edX',
  'Google',
  'Microsoft',
  'AWS',
  'IBM',
  'Meta',
  'Oracle',
  'Cisco',
  'CompTIA',
  'Other'
];

function CertificateManager({ 
  certificates, 
  onAddCertificate, 
  onUpdateCertificate, 
  onDeleteCertificate 
}: CertificateManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    skills: '',
    description: '',
    verified: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const certificateData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate || undefined,
      credentialId: formData.credentialId || undefined,
      credentialUrl: formData.credentialUrl || undefined,
      description: formData.description || undefined
    };

    if (editingId) {
      onUpdateCertificate(editingId, certificateData);
      setEditingId(null);
    } else {
      onAddCertificate(certificateData);
    }

    setFormData({
      title: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      skills: '',
      description: '',
      verified: false
    });
    setShowAddForm(false);
  };

  const handleEdit = (certificate: Certificate) => {
    setFormData({
      title: certificate.title,
      issuer: certificate.issuer,
      issueDate: certificate.issueDate,
      expiryDate: certificate.expiryDate || '',
      credentialId: certificate.credentialId || '',
      credentialUrl: certificate.credentialUrl || '',
      skills: certificate.skills.join(', '),
      description: certificate.description || '',
      verified: certificate.verified
    });
    setEditingId(certificate.id);
    setShowAddForm(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">My Certificates</h2>
          <p className="text-slate-400">Manage your professional certifications and achievements</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-lg border border-slate-600 transition-colors"
        >
          + Add Certificate
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
          <h3 className="text-xl font-bold text-slate-100 mb-4">
            {editingId ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Issuing Organization *
                </label>
                <select
                  value={formData.issuer}
                  onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  required
                >
                  <option value="">Select platform</option>
                  {popularPlatforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Issue Date *
                </label>
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Expiry Date (if applicable)
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) => setFormData({...formData, credentialId: e.target.value})}
                  placeholder="e.g., ABC123456"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Verification URL
                </label>
                <input
                  type="url"
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({...formData, credentialUrl: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g., Python, Machine Learning, Data Analysis"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of what you learned or achieved..."
                rows={3}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                className="w-4 h-4 text-slate-600 bg-slate-800 border-slate-600 rounded focus:ring-slate-500"
              />
              <label htmlFor="verified" className="text-sm text-slate-300">
                This certificate is verified
              </label>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-lg border border-slate-600 transition-colors"
              >
                {editingId ? 'Update Certificate' : 'Add Certificate'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    issuer: '',
                    issueDate: '',
                    expiryDate: '',
                    credentialId: '',
                    credentialUrl: '',
                    skills: '',
                    description: '',
                    verified: false
                  });
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates List */}
      <div className="space-y-4">
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <FaTrophy className="text-6xl mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No certificates yet</h3>
            <p className="text-slate-500 mb-4">Start building your professional profile by adding your first certificate!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-6 py-3 rounded-lg border border-slate-600 transition-colors"
            >
              Add Your First Certificate
            </button>
          </div>
        ) : (
          certificates.map((certificate) => (
            <div key={certificate.id} className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-100">{certificate.title}</h3>
                    {certificate.verified && (
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-400 mb-2">{certificate.issuer}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                    <span>Issued: {formatDate(certificate.issueDate)}</span>
                    {certificate.expiryDate && (
                      <span>Expires: {formatDate(certificate.expiryDate)}</span>
                    )}
                    {certificate.credentialId && (
                      <span>ID: {certificate.credentialId}</span>
                    )}
                  </div>

                  {certificate.skills.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, index) => (
                          <span key={index} className="bg-slate-800 text-slate-300 px-2 py-1 rounded-full text-sm border border-slate-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {certificate.description && (
                    <p className="text-slate-400 text-sm mb-3">{certificate.description}</p>
                  )}

                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-slate-100 underline text-sm"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="text-slate-400 hover:text-slate-200 p-2"
                    title="Edit certificate"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDeleteCertificate(certificate.id)}
                    className="text-slate-400 hover:text-red-400 p-2"
                    title="Delete certificate"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CertificateManager;
