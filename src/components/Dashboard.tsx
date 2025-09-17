import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, JobPosting, Certificate, JobApplication } from '../types/professional';
import UserProfileComponent from './UserProfile';
import CertificateManager from './CertificateManager';
import JobBoard from './JobBoard';
import { FaUser, FaTrophy, FaBriefcase, FaClipboardList, FaHome, FaArrowLeft } from 'react-icons/fa';

interface DashboardProps {
  userProfile: UserProfile;
  jobs: JobPosting[];
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onAddCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  onUpdateCertificate: (id: string, certificate: Partial<Certificate>) => void;
  onDeleteCertificate: (id: string) => void;
  onApplyToJob: (jobId: string, coverLetter?: string) => void;
}

type TabType = 'profile' | 'certificates' | 'jobs' | 'applications';

function Dashboard({ 
  userProfile, 
  jobs, 
  onUpdateProfile, 
  onAddCertificate, 
  onUpdateCertificate, 
  onDeleteCertificate,
  onApplyToJob 
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Get user's applications from all jobs
  const userApplications = jobs.flatMap(job => 
    job.applications.filter(app => app.userId === userProfile.id)
  );

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: FaUser },
    { id: 'certificates' as TabType, label: 'Certificates', icon: FaTrophy },
    { id: 'jobs' as TabType, label: 'Job Board', icon: FaBriefcase },
    { id: 'applications' as TabType, label: 'My Applications', icon: FaClipboardList }
  ];

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'reviewed': return 'bg-blue-600';
      case 'interview': return 'bg-purple-600';
      case 'accepted': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Dashboard Header with Home Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-mono-large mb-2" style={{ color: 'var(--mono-black)' }}>
            Dashboard
          </h1>
          <p className="text-mono-body" style={{ color: 'var(--mono-grey-700)' }}>
            Manage your professional profile and career development
          </p>
        </div>
        <Link
          to="/"
          className="btn-mono-secondary inline-flex items-center space-x-2 hover:shadow-mono-lg transition-all duration-200"
        >
          <FaHome className="text-sm" />
          <span>Back to Home</span>
          <FaArrowLeft className="text-sm" />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="card-mono p-1 mb-6">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 transition-all duration-200 font-medium text-sm ${
                activeTab === tab.id
                  ? 'text-white shadow-mono'
                  : 'text-mono-grey-600 hover:text-mono-grey-900 hover:bg-mono-grey-100'
              }`}
              style={activeTab === tab.id ? { background: 'var(--mono-black)' } : {}}
            >
              <tab.icon className="text-sm" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'profile' && (
          <UserProfileComponent
            profile={userProfile}
            isOwnProfile={true}
            onUpdateProfile={onUpdateProfile}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificateManager
            certificates={userProfile.certificates}
            onAddCertificate={onAddCertificate}
            onUpdateCertificate={onUpdateCertificate}
            onDeleteCertificate={onDeleteCertificate}
          />
        )}

        {activeTab === 'jobs' && (
          <JobBoard
            jobs={jobs}
            userProfile={userProfile}
            onApplyToJob={onApplyToJob}
          />
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-mono-headline">My Job Applications</h2>
              <p className="text-mono-body">Track the status of your job applications</p>
            </div>

            {userApplications.length === 0 ? (
              <div className="text-center py-12">
                <FaClipboardList className="text-6xl mb-4 animate-mono-fade text-gray-400" />
                <h3 className="text-mono-headline mb-3">No applications yet</h3>
                <p className="text-mono-body mb-6">Start applying to jobs to see your applications here!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="btn-mono"
                  >
                    Browse Jobs
                  </button>
                  <Link
                    to="/"
                    className="btn-mono-secondary inline-flex items-center justify-center space-x-2"
                  >
                    <FaHome className="text-sm" />
                    <span>Back to Home</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {userApplications.map((application) => {
                  const job = jobs.find(j => j.id === application.jobId);
                  if (!job) return null;

                  return (
                    <div key={application.id} className="card-mono p-mono-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-mono-headline">{job.title}</h3>
                            <span 
                              className="px-2 py-1 text-xs text-white font-medium"
                              style={{ background: getApplicationStatusColor(application.status) }}
                            >
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                          
                          <p className="text-mono-body mb-3">{job.company} • {job.location}</p>
                          
                          <div className="flex items-center space-x-4 text-mono-caption mb-3">
                            <span>Applied: {formatDate(application.appliedAt)}</span>
                            {application.interviewScheduled && (
                              <span>Interview: {formatDate(application.interviewScheduled)}</span>
                            )}
                          </div>

                          {application.coverLetter && (
                            <div className="mb-3">
                              <h4 className="text-mono-body font-medium mb-1">Cover Letter:</h4>
                              <p className="text-mono-caption line-clamp-2">{application.coverLetter}</p>
                            </div>
                          )}

                          {application.notes && (
                            <div className="mb-3">
                              <h4 className="text-mono-body font-medium mb-1">HR Notes:</h4>
                              <p className="text-mono-caption">{application.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          <button
                            onClick={() => {
                              setActiveTab('jobs');
                              // Scroll to the specific job
                            }}
                            className="text-mono-black hover:text-mono-grey-700 text-sm font-medium transition-colors"
                          >
                            View Job →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <div className="card-mono p-mono-lg text-center group hover:shadow-mono-lg transition-all duration-200">
          <div className="text-2xl font-bold text-mono-black mb-1">{userProfile.certificates.length}</div>
          <div className="text-mono-caption">Certificates</div>
        </div>
        
        <div className="card-mono p-mono-lg text-center group hover:shadow-mono-lg transition-all duration-200">
          <div className="text-2xl font-bold text-mono-black mb-1">{userProfile.completedRoadmaps.length}</div>
          <div className="text-mono-caption">Completed Paths</div>
        </div>
        
        <div className="card-mono p-mono-lg text-center group hover:shadow-mono-lg transition-all duration-200">
          <div className="text-2xl font-bold text-mono-black mb-1">{userApplications.length}</div>
          <div className="text-mono-caption">Applications</div>
        </div>
        
        <div className="card-mono p-mono-lg text-center group hover:shadow-mono-lg transition-all duration-200">
          <div className="text-2xl font-bold text-mono-black mb-1">{userProfile.skills.length}</div>
          <div className="text-mono-caption">Skills</div>
        </div>
      </div>

      {/* Floating Home Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/"
          className="btn-mono inline-flex items-center space-x-2 shadow-mono-lg hover:shadow-mono-xl transition-all duration-200 transform hover:scale-105"
          title="Go back to Home"
        >
          <FaHome className="text-sm" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
