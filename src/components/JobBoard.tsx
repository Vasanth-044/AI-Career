import { useEffect, useRef, useState } from 'react';
import { JobPosting, UserProfile } from '../types/professional';
import { FaBriefcase } from 'react-icons/fa';

interface JobBoardProps {
  jobs: JobPosting[];
  userProfile?: UserProfile;
  onApplyToJob: (jobId: string, coverLetter?: string) => void;
  onPostJob?: (job: Omit<JobPosting, 'id' | 'postedAt' | 'applications'>) => void;
  isHR?: boolean;
}

function JobBoard({ jobs, userProfile, onApplyToJob, onPostJob, isHR = false }: JobBoardProps) {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const pushedJobStateRef = useRef(false);
  const pushedAppStateRef = useRef(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    remote: false
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesRemote = !filters.remote || job.remote;

    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  const handleApply = () => {
    if (selectedJob) {
      onApplyToJob(selectedJob.id, coverLetter);
      setShowApplicationForm(false);
      setCoverLetter('');
      setSelectedJob(null);
    }
  };

  // Handle browser back/forward to close modals
  useEffect(() => {
    const onPopState = () => {
      if (pushedAppStateRef.current) {
        setShowApplicationForm(false);
        pushedAppStateRef.current = false;
      } else if (pushedJobStateRef.current) {
        setSelectedJob(null);
        pushedJobStateRef.current = false;
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const formatSalary = (salary?: { min: number; max: number; currency: string }) => {
    if (!salary) return 'Salary not specified';
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-mono-headline">Job Board</h2>
          <p className="text-mono-body" style={{ color: 'var(--mono-grey-600)' }}>Find your next career opportunity</p>
        </div>
        {isHR && onPostJob && (
          <button
            onClick={() => {/* TODO: Implement post job form */}}
            className="px-4 py-2 text-sm font-medium rounded-md border text-white"
            style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
          >
            + Post Job
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="rounded-2xl p-6 border" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-mono-body font-medium mb-3">Search</label>
            <input
              type="text"
              placeholder="Job title, company, or skills..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-mono-body font-medium mb-3">Location</label>
            <input
              type="text"
              placeholder="City, state, or remote"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-mono-body font-medium mb-3">Job Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.remote}
                onChange={(e) => setFilters({...filters, remote: e.target.checked})}
                className="w-5 h-5 text-mono-black bg-white border-2 border-mono-grey-300 rounded focus:ring-mono-black focus:ring-2"
              />
              <span className="text-mono-body">Remote only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <FaBriefcase className="text-8xl mb-6 text-gray-400" />
            <h3 className="text-mono-headline mb-4">No jobs found</h3>
            <p className="text-mono-body" style={{ color: 'var(--mono-grey-600)' }}>Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="rounded-2xl p-6 border hover:shadow-sm transition-shadow" style={{ background: 'white', borderColor: 'var(--mono-grey-200)' }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <h3 className="text-mono-headline">{job.title}</h3>
                    <span 
                      className="px-3 py-1 rounded-xl text-sm font-medium"
                      style={{ background: 'var(--mono-grey-100)', color: 'var(--mono-grey-800)' }}
                    >
                      {job.type}
                    </span>
                    {job.remote && (
                      <span 
                        className="px-3 py-1 rounded-xl text-sm font-medium text-white"
                        style={{ background: 'var(--mono-black)' }}
                      >
                        Remote
                      </span>
                    )}
                  </div>
                  
                  <p className="text-mono-body mb-4" style={{ color: 'var(--mono-grey-700)' }}>{job.company} • {job.location}</p>
                  
                  <div className="flex items-center space-x-6 text-mono-caption mb-4" style={{ color: 'var(--mono-grey-600)' }}>
                    <span>{formatSalary(job.salary)}</span>
                    <span>Posted {getTimeAgo(job.postedAt)}</span>
                    <span>{job.applications.length} applications</span>
                  </div>

                  <p className="text-mono-body mb-6 line-clamp-2" style={{ color: 'var(--mono-grey-700)' }}>
                    {job.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-3">
                      {job.skills.slice(0, 5).map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-full text-sm font-medium border"
                          style={{ background: 'white', color: 'var(--mono-grey-800)', borderColor: 'var(--mono-grey-200)' }}
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 5 && (
                        <span className="text-mono-caption text-sm" style={{ color: 'var(--mono-grey-600)' }}>+{job.skills.length - 5} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        if (!pushedJobStateRef.current) {
                          window.history.pushState({ modal: 'job' }, '');
                          pushedJobStateRef.current = true;
                        }
                      }}
                      className="px-6 py-3 rounded-xl border text-mono-body font-medium"
                      style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                    >
                      View Details
                    </button>
                    {userProfile && (
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          if (!pushedJobStateRef.current) {
                            window.history.pushState({ modal: 'job' }, '');
                            pushedJobStateRef.current = true;
                          }
                          setShowApplicationForm(true);
                          if (!pushedAppStateRef.current) {
                            window.history.pushState({ modal: 'apply' }, '');
                            pushedAppStateRef.current = true;
                          }
                        }}
                        className="px-6 py-3 rounded-xl border text-white"
                        style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-2xl border max-w-4xl w-full max-h-[90vh] overflow-y-auto text-neutral-900" style={{ background: 'white', borderColor: 'var(--mono-grey-200)' }}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-mono-headline mb-2">{selectedJob.title}</h2>
                  <p className="text-mono-body text-lg text-neutral-700">{selectedJob.company} • {selectedJob.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (pushedJobStateRef.current) {
                        window.history.back();
                      } else {
                        setSelectedJob(null);
                      }
                    }}
                    className="px-3 py-1.5 rounded-md border text-sm"
                    style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-2xl"
                    style={{ color: 'var(--mono-grey-600)' }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-neutral-900">Job Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Type:</span>
                      <span className="text-neutral-800">{selectedJob.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Salary:</span>
                      <span className="text-neutral-800">{formatSalary(selectedJob.salary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Experience:</span>
                      <span className="text-neutral-800">{selectedJob.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Education:</span>
                      <span className="text-neutral-800">{selectedJob.education}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Remote:</span>
                      <span className="text-neutral-800">{selectedJob.remote ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-neutral-900">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="px-2.5 py-1 text-xs font-medium rounded-full border" style={{ background: 'white', color: 'var(--mono-grey-800)', borderColor: 'var(--mono-grey-200)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-neutral-900">Description</h3>
                <p className="whitespace-pre-wrap text-neutral-800">{selectedJob.description}</p>
              </div>

              {selectedJob.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-neutral-900">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-neutral-800">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-neutral-900">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-neutral-800">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {userProfile && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowApplicationForm(true);
                      if (!pushedAppStateRef.current) {
                        window.history.pushState({ modal: 'apply' }, '');
                        pushedAppStateRef.current = true;
                      }
                    }}
                    className="px-6 py-3 rounded-xl border text-white"
                    style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
                  >
                    Apply for this position
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-2xl border max-w-2xl w-full" style={{ background: 'var(--mono-grey-50)', borderColor: 'var(--mono-grey-200)' }}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-mono-headline">Apply for {selectedJob.title}</h2>
                  <p className="text-mono-body" style={{ color: 'var(--mono-grey-700)' }}>{selectedJob.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (pushedAppStateRef.current) {
                        window.history.back();
                      } else {
                        setShowApplicationForm(false);
                      }
                    }}
                    className="px-3 py-1.5 rounded-md border text-sm"
                    style={{ borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-2xl"
                    style={{ color: 'var(--mono-grey-600)' }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-mono-grey-700 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell the employer why you're interested in this position..."
                    rows={6}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleApply}
                    className="px-6 py-3 rounded-xl border text-white"
                    style={{ background: 'var(--mono-black)', borderColor: 'var(--mono-black)' }}
                  >
                    Submit Application
                  </button>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-3 rounded-xl border"
                    style={{ background: 'transparent', borderColor: 'var(--mono-grey-300)', color: 'var(--mono-grey-800)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobBoard;
