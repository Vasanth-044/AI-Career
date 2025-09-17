import { useState } from 'react';
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
          <h2 className="text-apple-headline">Job Board</h2>
          <p className="text-apple-body">Find your next career opportunity</p>
        </div>
        {isHR && onPostJob && (
          <button
            onClick={() => {/* TODO: Implement post job form */}}
            className="btn-apple"
          >
            + Post Job
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card-apple p-apple-lg">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-apple-body font-medium mb-3">Search</label>
            <input
              type="text"
              placeholder="Job title, company, or skills..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="input-apple"
            />
          </div>
          
          <div>
            <label className="block text-apple-body font-medium mb-3">Location</label>
            <input
              type="text"
              placeholder="City, state, or remote"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="input-apple"
            />
          </div>
          
          <div>
            <label className="block text-apple-body font-medium mb-3">Job Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="input-apple"
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
                className="w-5 h-5 text-apple-blue bg-white border-2 border-apple-gray-300 rounded focus:ring-apple-blue focus:ring-2"
              />
              <span className="text-apple-body">Remote only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <FaBriefcase className="text-8xl mb-6 animate-apple-float text-gray-400" />
            <h3 className="text-apple-headline mb-4">No jobs found</h3>
            <p className="text-apple-body">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="card-apple p-apple-xl hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <h3 className="text-apple-headline">{job.title}</h3>
                    <span 
                      className="px-3 py-1 rounded-xl text-sm font-medium"
                      style={{ background: 'var(--apple-gray-200)', color: 'var(--apple-gray-800)' }}
                    >
                      {job.type}
                    </span>
                    {job.remote && (
                      <span 
                        className="px-3 py-1 rounded-xl text-sm font-medium text-white"
                        style={{ background: 'var(--apple-green)' }}
                      >
                        Remote
                      </span>
                    )}
                  </div>
                  
                  <p className="text-apple-body mb-4">{job.company} • {job.location}</p>
                  
                  <div className="flex items-center space-x-6 text-apple-caption mb-4">
                    <span>{formatSalary(job.salary)}</span>
                    <span>Posted {getTimeAgo(job.postedAt)}</span>
                    <span>{job.applications.length} applications</span>
                  </div>

                  <p className="text-apple-body mb-6 line-clamp-2">{job.description}</p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-3">
                      {job.skills.slice(0, 5).map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-lg text-sm font-medium"
                          style={{ background: 'var(--apple-gray-100)', color: 'var(--apple-gray-700)' }}
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 5 && (
                        <span className="text-apple-caption text-sm">+{job.skills.length - 5} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowApplicationForm(true);
                      }}
                      className="px-6 py-3 rounded-xl border-2 border-apple-gray-300 text-apple-gray-600 hover:bg-apple-gray-100 transition-colors font-medium"
                    >
                      View Details
                    </button>
                    {userProfile && (
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplicationForm(true);
                        }}
                        className="btn-apple"
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
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">{selectedJob.title}</h2>
                  <p className="text-slate-400 text-lg">{selectedJob.company} • {selectedJob.location}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-slate-400 hover:text-slate-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Job Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-slate-300">{selectedJob.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Salary:</span>
                      <span className="text-slate-300">{formatSalary(selectedJob.salary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience:</span>
                      <span className="text-slate-300">{selectedJob.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Education:</span>
                      <span className="text-slate-300">{selectedJob.education}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Remote:</span>
                      <span className="text-slate-300">{selectedJob.remote ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="bg-slate-800 text-slate-300 px-2 py-1 rounded-full text-sm border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-3">Description</h3>
                <p className="text-slate-300 whitespace-pre-wrap">{selectedJob.description}</p>
              </div>

              {selectedJob.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
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
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
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
          <div className="bg-slate-900 rounded-xl border border-slate-800 max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Apply for {selectedJob.title}</h2>
                  <p className="text-slate-400">{selectedJob.company}</p>
                </div>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-slate-400 hover:text-slate-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell the employer why you're interested in this position..."
                    rows={6}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleApply}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Submit Application
                  </button>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-lg border border-slate-700 transition-colors"
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
