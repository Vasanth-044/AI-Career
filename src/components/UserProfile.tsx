import { useEffect, useState } from 'react';
import { UserProfile as UserProfileType, Certificate } from '../types/professional';

interface UserProfileProps {
  profile: UserProfileType;
  isOwnProfile?: boolean;
  onUpdateProfile?: (updates: Partial<UserProfileType>) => void;
}

function UserProfile({ profile, isOwnProfile = false, onUpdateProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: profile.name,
    title: profile.title,
    location: profile.location,
    bio: profile.bio,
    skills: profile.skills.join(', '),
    isAvailableForHire: profile.isAvailableForHire,
    expectedSalary: profile.expectedSalary || '',
    preferredLocation: profile.preferredLocation || '',
    socialLinks: {
      linkedin: profile.socialLinks.linkedin || '',
      github: profile.socialLinks.github || '',
      portfolio: profile.socialLinks.portfolio || '',
      twitter: profile.socialLinks.twitter || ''
    }
  });

  // Keep local edit form in sync with the latest profile prop
  useEffect(() => {
    setEditData({
      name: profile.name,
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      skills: profile.skills.join(', '),
      isAvailableForHire: profile.isAvailableForHire,
      expectedSalary: profile.expectedSalary || '',
      preferredLocation: profile.preferredLocation || '',
      socialLinks: {
        linkedin: profile.socialLinks.linkedin || '',
        github: profile.socialLinks.github || '',
        portfolio: profile.socialLinks.portfolio || '',
        twitter: profile.socialLinks.twitter || ''
      }
    });
  }, [profile]);

  const handleSave = () => {
    if (onUpdateProfile) {
      const updatedProfile = {
        ...editData,
        skills: editData.skills.split(',').map(s => s.trim()).filter(s => s),
        socialLinks: editData.socialLinks
      };
      onUpdateProfile(updatedProfile);
      
      // Save to localStorage for persistence
      const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const savedProfile = { ...currentProfile, ...updatedProfile };
      localStorage.setItem('userProfile', JSON.stringify(savedProfile));
    }
    setIsEditing(false);
  };

  const getExperienceColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case 'complete beginner': return 'bg-green-600';
      case 'some basic knowledge': return 'bg-blue-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-orange-600';
      case 'expert': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="rounded-2xl p-6 border shadow-sm" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6 space-y-6 md:space-y-0">
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-mono"
              style={{ background: 'var(--mono-black)' }}
            >
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-white font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
            {profile.isAvailableForHire && (
              <div 
                className="absolute -bottom-2 -right-2 text-white text-xs px-2 py-1 font-medium rounded-md"
                style={{ background: 'var(--mono-grey-700)' }}
              >
                Available
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-mono-title">{profile.name}</h1>
                <p className="text-mono-headline mt-1" style={{ color: 'var(--mono-grey-600)' }}>{profile.title}</p>
                <p className="text-mono-body mt-1" style={{ color: 'var(--mono-grey-500)' }}>{profile.location}</p>
              </div>
              {isOwnProfile && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                      isEditing
                        ? 'bg-white text-mono-black' 
                        : 'text-white'
                    }`}
                    style={{ background: isEditing ? 'transparent' : 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-mono-caption">
              <div className="rounded-md px-3 py-2 border" style={{ borderColor: 'var(--mono-grey-200)' }}>Experience: <span className="font-medium">{profile.experience}</span></div>
              <div className="rounded-md px-3 py-2 border" style={{ borderColor: 'var(--mono-grey-200)' }}>Education: <span className="font-medium">{profile.education}</span></div>
              <div className="rounded-md px-3 py-2 border" style={{ borderColor: 'var(--mono-grey-200)' }}>Joined: <span className="font-medium">{formatDate(profile.createdAt)}</span></div>
            </div>

            {(profile.socialLinks.linkedin || profile.socialLinks.github || profile.socialLinks.portfolio || profile.socialLinks.twitter) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm rounded-full border transition-colors"
                    style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    LinkedIn
                  </a>
                )}
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm rounded-full border transition-colors"
                    style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    GitHub
                  </a>
                )}
                {profile.socialLinks.portfolio && (
                  <a
                    href={profile.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm rounded-full border transition-colors"
                    style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    Portfolio
                  </a>
                )}
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm rounded-full border transition-colors"
                    style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    Twitter
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
          <h2 className="text-mono-headline mb-6">Edit Profile</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-mono-body font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="input-mono"
                />
              </div>
              
              <div>
                <label className="block text-mono-body font-medium mb-2">Professional Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="input-mono"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-mono-body font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="input-mono"
                />
              </div>
              
              <div>
                <label className="block text-mono-body font-medium mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={editData.skills}
                  onChange={(e) => setEditData({...editData, skills: e.target.value})}
                  placeholder="e.g., Python, React, Machine Learning"
                  className="input-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-mono-body font-medium mb-2">Bio</label>
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                rows={4}
                className="input-mono resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-mono-body font-medium mb-2">Expected Salary</label>
                <input
                  type="text"
                  value={editData.expectedSalary}
                  onChange={(e) => setEditData({...editData, expectedSalary: e.target.value})}
                  placeholder="e.g., $80,000 - $100,000"
                  className="input-mono"
                />
              </div>
              
              <div>
                <label className="block text-mono-body font-medium mb-2">Preferred Location</label>
                <input
                  type="text"
                  value={editData.preferredLocation}
                  onChange={(e) => setEditData({...editData, preferredLocation: e.target.value})}
                  placeholder="e.g., Remote, San Francisco, New York"
                  className="input-mono"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-mono-body font-medium mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={editData.socialLinks.linkedin}
                  onChange={(e) => setEditData({
                    ...editData, 
                    socialLinks: {...editData.socialLinks, linkedin: e.target.value}
                  })}
                  className="input-mono"
                />
              </div>
              
              <div>
                <label className="block text-mono-body font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={editData.socialLinks.github}
                  onChange={(e) => setEditData({
                    ...editData, 
                    socialLinks: {...editData.socialLinks, github: e.target.value}
                  })}
                  className="input-mono"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-mono-body font-medium mb-2">Portfolio URL</label>
                <input
                  type="url"
                  value={editData.socialLinks.portfolio}
                  onChange={(e) => setEditData({
                    ...editData, 
                    socialLinks: {...editData.socialLinks, portfolio: e.target.value}
                  })}
                  className="input-mono"
                />
              </div>
              
              <div>
                <label className="block text-mono-body font-medium mb-2">Twitter URL</label>
                <input
                  type="url"
                  value={editData.socialLinks.twitter}
                  onChange={(e) => setEditData({
                    ...editData, 
                    socialLinks: {...editData.socialLinks, twitter: e.target.value}
                  })}
                  className="input-mono"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="availableForHire"
                checked={editData.isAvailableForHire}
                onChange={(e) => setEditData({...editData, isAvailableForHire: e.target.checked})}
                className="w-4 h-4 text-mono-black bg-white border border-mono-grey-300 focus:ring-mono-black focus:ring-1"
              />
              <label htmlFor="availableForHire" className="text-mono-body">
                Available for hire
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium rounded-md border text-white"
                style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium rounded-md border"
                style={{ background: 'transparent', borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bio */}
      {profile.bio && (
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
          <h2 className="text-mono-headline mb-4">About</h2>
          <p className="text-mono-body whitespace-pre-wrap">{profile.bio}</p>
        </div>
      )}

      {/* Skills */}
      <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
        <h2 className="text-mono-headline mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-sm font-medium rounded-full border"
              style={{ 
                background: 'white', 
                color: 'var(--mono-grey-800)',
                borderColor: 'var(--mono-grey-200)'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
        <h2 className="text-mono-headline mb-4">Experience Level</h2>
        <div className="flex items-center flex-wrap gap-3">
          <span 
            className="px-3 py-1 text-sm text-white font-medium rounded-full"
            style={{ background: getExperienceColor(profile.experience) }}
          >
            {profile.experience}
          </span>
          <span className="text-mono-caption rounded-md px-2 py-1 border" style={{ borderColor: 'var(--mono-grey-200)' }}>Education: {profile.education}</span>
        </div>
      </div>

      {/* Certificates */}
      {profile.certificates.length > 0 && (
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
          <h2 className="text-mono-headline mb-4">Certificates & Achievements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profile.certificates.map((certificate) => (
              <div key={certificate.id} className="p-5 rounded-xl border hover:shadow-sm transition-shadow" style={{ background: 'white', borderColor: 'var(--mono-grey-200)' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-mono-grey-900">{certificate.title}</h3>
                  {certificate.verified && (
                    <span 
                      className="text-white text-xs px-2 py-1 font-medium rounded"
                      style={{ background: 'var(--mono-grey-700)' }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-mono-body mb-2">{certificate.issuer}</p>
                <p className="text-mono-caption mb-3">
                  Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                </p>
                {certificate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {certificate.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 text-xs font-medium rounded-full border"
                        style={{ background: 'white', color: 'var(--mono-grey-800)', borderColor: 'var(--mono-grey-200)' }}
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="text-mono-caption text-xs">+{certificate.skills.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Progress */}
      {profile.completedRoadmaps.length > 0 && (
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
          <h2 className="text-mono-headline mb-4">Completed Learning Paths</h2>
          <div className="flex flex-wrap gap-2">
            {profile.completedRoadmaps.map((roadmap, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium rounded-full border text-white"
                style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
              >
                {roadmap}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Currently Learning */}
      {profile.currentLearning.length > 0 && (
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
          <h2 className="text-mono-headline mb-4">Currently Learning</h2>
          <div className="flex flex-wrap gap-2">
            {profile.currentLearning.map((topic, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium rounded-full border text-white"
                style={{ background: 'var(--mono-grey-700)', borderColor: 'var(--mono-grey-700)' }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
