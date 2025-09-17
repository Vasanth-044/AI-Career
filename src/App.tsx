import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import { UserProfile, JobPosting, Certificate, JobApplication } from "./types/professional";

// Mock data for demonstration
const mockUserProfile: UserProfile = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  title: "Full Stack Developer",
  location: "San Francisco, CA",
  bio: "Passionate developer with 3+ years of experience building web applications. Love working with React, Node.js, and cloud technologies.",
  skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
  experience: "Intermediate",
  education: "Bachelor's in Computer Science",
  certificates: [],
  completedRoadmaps: ["Web Development"],
  currentLearning: ["Machine Learning", "DevOps"],
  socialLinks: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev"
  },
  isAvailableForHire: true,
  expectedSalary: "$80,000 - $100,000",
  preferredLocation: "Remote or San Francisco",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const mockJobs: JobPosting[] = [
  {
    id: "job-1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "full-time",
    remote: true,
    salary: { min: 120000, max: 150000, currency: "$" },
    description: "We're looking for a senior React developer to join our team and help build amazing user experiences.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership experience"],
    benefits: ["Health insurance", "401k matching", "Flexible PTO"],
    skills: ["React", "TypeScript", "Redux", "Jest", "CI/CD"],
    experience: "Senior",
    education: "Bachelor's degree or equivalent experience",
    postedBy: "hr-1",
    postedAt: "2024-01-15T00:00:00Z",
    isActive: true,
    applications: []
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "full-time",
    remote: true,
    salary: { min: 80000, max: 120000, currency: "$" },
    description: "Join our fast-growing startup and help build the next generation of web applications.",
    requirements: ["3+ years full-stack experience", "React and Node.js", "Database design"],
    benefits: ["Equity", "Health insurance", "Learning budget"],
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    experience: "Mid-level",
    education: "Bachelor's degree preferred",
    postedBy: "hr-2",
    postedAt: "2024-01-10T00:00:00Z",
    isActive: true,
    applications: []
  }
];

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);

  // Load profile from localStorage on app initialization
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
      }
    }
  }, []);

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleAddCertificate = (certificate: Omit<Certificate, 'id'>) => {
    const newCertificate: Certificate = {
      ...certificate,
      id: `cert-${Date.now()}`
    };
    setUserProfile(prev => ({
      ...prev,
      certificates: [...prev.certificates, newCertificate]
    }));
  };

  const handleUpdateCertificate = (id: string, updates: Partial<Certificate>) => {
    setUserProfile(prev => ({
      ...prev,
      certificates: prev.certificates.map(cert => 
        cert.id === id ? { ...cert, ...updates } : cert
      )
    }));
  };

  const handleDeleteCertificate = (id: string) => {
    setUserProfile(prev => ({
      ...prev,
      certificates: prev.certificates.filter(cert => cert.id !== id)
    }));
  };

  const handleApplyToJob = (jobId: string, coverLetter?: string) => {
    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      userId: userProfile.id,
      coverLetter,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, applications: [...job.applications, newApplication] }
        : job
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<Index />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard
              userProfile={userProfile}
              jobs={jobs}
              onUpdateProfile={handleUpdateProfile}
              onAddCertificate={handleAddCertificate}
              onUpdateCertificate={handleUpdateCertificate}
              onDeleteCertificate={handleDeleteCertificate}
              onApplyToJob={handleApplyToJob}
            />
          } 
        />

        {/* IMPORTANT: DO NOT place any routes below this. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
