import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CareerForm from '../components/CareerForm';
import RoadmapDisplay from '../components/RoadmapDisplay';
import { generateCareerRoadmap } from '../services/careerMentor';
import { CareerRoadmap, UserInput } from '../types/career';
import { FaBullseye, FaArrowRight, FaTachometerAlt, FaRocket, FaUsers, FaTrophy, FaBriefcase } from 'react-icons/fa';
import { useScrollAnimation, useScrollReveal } from '../hooks/useScrollAnimation';

function Index() {
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<{ grade: string; experience: string } | null>(null);
  
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollReveal(200);
  const ctaRef = useScrollReveal(400);

  const handleFormSubmit = async (input: UserInput) => {
    setIsLoading(true);
    
    // Store user details for display
    setUserDetails({
      grade: input.grade,
      experience: input.experience
    });
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedRoadmap = generateCareerRoadmap(input);
    setRoadmap(generatedRoadmap);
    setIsLoading(false);
  };

  const handleStartOver = () => {
    setRoadmap(null);
    setUserDetails(null);
  };

  return (
    <Layout>
      {!roadmap ? (
        <div>
          {/* Hero Section */}
          <div ref={heroRef} className="text-center mb-20 scroll-reveal">
            <div className="mb-12">
              <div className="inline-block p-6 bg-gradient-primary rounded-3xl shadow-glow-lg mb-8 animate-float">
                <FaBullseye className="text-6xl text-white" />
              </div>
              <h1 className="text-display text-gradient mb-6 animate-fade-in">
                Career Platform
              </h1>
              <p className="text-body text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-12 animate-slide-in-up">
                Build your professional profile and advance your career with our comprehensive platform. 
                Get personalized roadmaps, track your progress, and connect with opportunities.
              </p>
              
              {/* Quick Dashboard Access */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
                <Link
                  to="/dashboard"
                  className="btn-primary btn-lg inline-flex items-center space-x-3 hover:scale-105"
                >
                  <FaTachometerAlt className="text-lg" />
                  <span>Go to Dashboard</span>
                  <FaArrowRight className="text-lg" />
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-outline btn-lg inline-flex items-center space-x-3 hover:scale-105"
                >
                  <FaRocket className="text-lg" />
                  <span>Start Your Journey</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 mb-20 scroll-reveal">
            <div className="card-modern p-xl text-center hover-lift group">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h3 className="text-headline mb-4">Professional Network</h3>
              <p className="text-body-sm text-neutral-600">
                Connect with industry professionals and expand your network for better career opportunities.
              </p>
            </div>
            
            <div className="card-modern p-xl text-center hover-lift group">
              <div className="w-16 h-16 bg-gradient-cool rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaTrophy className="text-2xl text-white" />
              </div>
              <h3 className="text-headline mb-4">Achievement Tracking</h3>
              <p className="text-body-sm text-neutral-600">
                Track your certificates, skills, and career milestones to showcase your progress.
              </p>
            </div>
            
            <div className="card-modern p-xl text-center hover-lift group">
              <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBriefcase className="text-2xl text-white" />
              </div>
              <h3 className="text-headline mb-4">Job Opportunities</h3>
              <p className="text-body-sm text-neutral-600">
                Discover and apply to relevant job opportunities that match your skills and interests.
              </p>
            </div>
          </div>

          <CareerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {/* Call to Action */}
          <div ref={ctaRef} className="text-center mt-20 scroll-reveal">
            <div className="card-gradient p-2xl max-w-4xl mx-auto shadow-glow-lg">
              <h3 className="text-headline text-white mb-6">Ready to Build Your Professional Profile?</h3>
              <p className="text-body text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are advancing their careers with our platform. 
                Add certificates, apply to jobs, and connect with employers.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/dashboard"
                  className="btn-secondary btn-lg inline-flex items-center justify-center space-x-3 hover:scale-105"
                >
                  <FaTachometerAlt className="text-lg" />
                  <span>Access Dashboard</span>
                  <FaArrowRight className="text-lg" />
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-ghost btn-lg inline-flex items-center justify-center space-x-3 hover:scale-105 text-white border-white/20 hover:bg-white/10"
                >
                  <span>Manage Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RoadmapDisplay roadmap={roadmap} onStartOver={handleStartOver} userDetails={userDetails || undefined} />
      )}
    </Layout>
  );
}

export default Index;