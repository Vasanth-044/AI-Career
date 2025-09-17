import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, JobPosting, Certificate, JobApplication } from '../types/professional';
import UserProfileComponent from './UserProfile';
import CertificateManager from './CertificateManager';
import JobBoard from './JobBoard';
import { FaUser, FaTrophy, FaBriefcase, FaClipboardList, FaHome, FaArrowLeft, FaChartLine, FaStar, FaRocket } from 'react-icons/fa';
import { useScrollAnimation, useScrollReveal } from '../hooks/useScrollAnimation';

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
  
  const headerRef = useScrollAnimation();
  const statsRef = useScrollReveal(200);
  const tabsRef = useScrollReveal(400);

  // Get user's applications from all jobs
  const userApplications = jobs.flatMap(job => 
    job.applications.filter(app => app.userId === userProfile.id)
  );

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: FaUser, color: 'bg-gradient-primary' },
    { id: 'certificates' as TabType, label: 'Certificates', icon: FaTrophy, color: 'bg-gradient-secondary' },
    { id: 'jobs' as TabType, label: 'Job Board', icon: FaBriefcase, color: 'bg-gradient-cool' },
    { id: 'applications' as TabType, label: 'My Applications', icon: FaClipboardList, color: 'bg-gradient-warm' }
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
      <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 scroll-reveal">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-display text-gradient mb-4">
            Dashboard
          </h1>
          <p className="text-body text-neutral-700 max-w-2xl">
            Manage your professional profile and career development. Track your progress, 
            showcase your achievements, and discover new opportunities.
          </p>
        </div>
        <Link
          to="/"
          className="btn-outline btn-lg inline-flex items-center space-x-3 hover:scale-105"
        >
          <FaHome className="text-lg" />
          <span>Back to Home</span>
          <FaArrowLeft className="text-lg" />
        </Link>
      </div>

      {/* Quick Stats */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 scroll-reveal">
        <div className="card-modern p-lg text-center hover-lift group">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <FaTrophy className="text-xl text-white" />
          </div>
          <div className="text-3xl font-bold text-gradient mb-2">{userProfile.certificates.length}</div>
          <div className="text-caption text-neutral-600">Certificates</div>
        </div>
        
        <div className="card-modern p-lg text-center hover-lift group">
          <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <FaChartLine className="text-xl text-white" />
          </div>
          <div className="text-3xl font-bold text-gradient mb-2">{userProfile.completedRoadmaps.length}</div>
          <div className="text-caption text-neutral-600">Completed Paths</div>
        </div>
        
        <div className="card-modern p-lg text-center hover-lift group">
          <div className="w-12 h-12 bg-gradient-cool rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <FaClipboardList className="text-xl text-white" />
          </div>
          <div className="text-3xl font-bold text-gradient mb-2">{userApplications.length}</div>
          <div className="text-caption text-neutral-600">Applications</div>
        </div>
        
        <div className="card-modern p-lg text-center hover-lift group">
          <div className="w-12 h-12 bg-gradient-warm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <FaStar className="text-xl text-white" />
          </div>
          <div className="text-3xl font-bold text-gradient mb-2">{userProfile.skills.length}</div>
          <div className="text-caption text-neutral-600">Skills</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div ref={tabsRef} className="card-glass p-2 mb-8 scroll-reveal">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                activeTab === tab.id
                  ? `${tab.color} text-white shadow-glow`
                  : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <tab.icon className="text-lg" />
              <span className="hidden sm:inline">{tab.label}</span>
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-headline text-gradient mb-4">My Job Applications</h2>
              <p className="text-body text-neutral-600">Track the status of your job applications</p>
            </div>

            {userApplications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-warm rounded-3xl flex items-center justify-center mx-auto mb-8 animate-float">
                  <FaClipboardList className="text-4xl text-white" />
                </div>
                <h3 className="text-headline mb-4">No applications yet</h3>
                <p className="text-body text-neutral-600 mb-8 max-w-md mx-auto">
                  Start applying to jobs to see your applications here! Browse available positions and submit your applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="btn-primary btn-lg inline-flex items-center space-x-3 hover:scale-105"
                  >
                    <FaRocket className="text-lg" />
                    <span>Browse Jobs</span>
                  </button>
                  <Link
                    to="/"
                    className="btn-outline btn-lg inline-flex items-center justify-center space-x-3 hover:scale-105"
                  >
                    <FaHome className="text-lg" />
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
                    <div key={application.id} className="card-modern p-xl hover-lift">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            <h3 className="text-headline">{job.title}</h3>
                            <span 
                              className={`px-4 py-2 text-sm font-semibold text-white rounded-xl ${getApplicationStatusColor(application.status)}`}
                            >
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                          
                          <p className="text-body text-neutral-600 mb-4">{job.company} • {job.location}</p>
                          
                          <div className="flex flex-wrap items-center gap-6 text-caption text-neutral-500 mb-4">
                            <span>Applied: {formatDate(application.appliedAt)}</span>
                            {application.interviewScheduled && (
                              <span>Interview: {formatDate(application.interviewScheduled)}</span>
                            )}
                          </div>

                          {application.coverLetter && (
                            <div className="mb-4">
                              <h4 className="text-body font-semibold mb-2 text-neutral-800">Cover Letter:</h4>
                              <p className="text-body-sm text-neutral-600 line-clamp-3">{application.coverLetter}</p>
                            </div>
                          )}

                          {application.notes && (
                            <div className="mb-4">
                              <h4 className="text-body font-semibold mb-2 text-neutral-800">HR Notes:</h4>
                              <p className="text-body-sm text-neutral-600">{application.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0">
                          <button
                            onClick={() => {
                              setActiveTab('jobs');
                              // Scroll to the specific job
                            }}
                            className="btn-outline btn-sm inline-flex items-center space-x-2 hover:scale-105"
                          >
                            <span>View Job</span>
                            <FaArrowLeft className="text-sm rotate-180" />
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

      {/* Floating Home Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          to="/"
          className="btn-primary btn-lg inline-flex items-center space-x-3 shadow-glow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-110 animate-float"
          title="Go back to Home"
        >
          <FaHome className="text-lg" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
