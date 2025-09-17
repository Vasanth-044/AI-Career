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
          <h2 className="text-mono-headline">My Certificates</h2>
          <p className="text-mono-body" style={{ color: 'var(--mono-grey-600)' }}>Manage your professional certifications and achievements</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-sm font-medium rounded-md border text-white"
          style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
        >
          + Add Certificate
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
          <h3 className="text-mono-headline mb-4">
            {editingId ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                  Issuing Organization *
                </label>
                <select
                  value={formData.issuer}
                  onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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
                <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                  Issue Date *
                </label>
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                  Expiry Date (if applicable)
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) => setFormData({...formData, credentialId: e.target.value})}
                  placeholder="e.g., ABC123456"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                  Verification URL
                </label>
                <input
                  type="url"
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({...formData, credentialUrl: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g., Python, Machine Learning, Data Analysis"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of what you learned or achieved..."
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                className="w-4 h-4 text-mono-black bg-white border border-mono-grey-300 rounded focus:ring-mono-black focus:ring-1"
              />
              <label htmlFor="verified" className="text-sm" style={{ color: 'var(--mono-grey-700)' }}>
                This certificate is verified
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-md border text-white"
                style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
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
                className="px-4 py-2 text-sm font-medium rounded-md border"
                style={{ background: 'transparent', borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
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
          <div className="text-center py-12 rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
            <FaTrophy className="text-6xl mb-4" style={{ color: 'var(--mono-grey-500)' }} />
            <h3 className="text-mono-headline mb-2">No certificates yet</h3>
            <p className="text-mono-body mb-4" style={{ color: 'var(--mono-grey-600)' }}>Start building your professional profile by adding your first certificate!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 text-sm font-medium rounded-md border text-white"
              style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
            >
              Add Your First Certificate
            </button>
          </div>
        ) : (
          certificates.map((certificate) => (
            <div key={certificate.id} className="rounded-2xl p-6 border" style={{ background: 'white', borderColor: 'var(--mono-grey-200)' }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{certificate.title}</h3>
                    {certificate.verified && (
                      <span className="text-white text-xs px-2 py-1 rounded-full" style={{ background: 'var(--mono-grey-700)' }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-mono-body mb-2" style={{ color: 'var(--mono-grey-700)' }}>{certificate.issuer}</p>
                  
                  <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--mono-grey-600)' }}>
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
                          <span key={index} className="px-2.5 py-1 text-xs font-medium rounded-full border" style={{ background: 'white', color: 'var(--mono-grey-800)', borderColor: 'var(--mono-grey-200)' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {certificate.description && (
                    <p className="text-sm mb-3" style={{ color: 'var(--mono-grey-700)' }}>{certificate.description}</p>
                  )}

                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm"
                      style={{ color: 'var(--mono-grey-800)' }}
                    >
                      View Certificate →
                    </a>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="p-2 rounded-md border"
                    style={{ color: 'var(--mono-grey-700)', borderColor: 'var(--mono-grey-200)' }}
                    title="Edit certificate"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDeleteCertificate(certificate.id)}
                    className="p-2 rounded-md border"
                    style={{ color: 'var(--mono-grey-700)', borderColor: 'var(--mono-grey-200)' }}
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
