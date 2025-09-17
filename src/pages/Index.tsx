import { useState } from 'react';
import Layout from '../components/Layout';
import CareerForm from '../components/CareerForm';
import RoadmapDisplay from '../components/RoadmapDisplay';
import { generateCareerRoadmap } from '../services/careerMentor';
import { CareerRoadmap, UserInput } from '../types/career';

function Index() {
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<{ grade: string; experience: string } | null>(null);

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
          <div className="text-center mb-12">
            <div className="mb-8">
              <span className="inline-block text-6xl mb-6 animate-mono-fade">🎯</span>
              <h1 className="text-mono-large mb-6" style={{ color: 'var(--mono-black)' }}>
                Career Platform
              </h1>
              <p className="text-mono-body max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--mono-grey-700)' }}>
                Build your professional profile and advance your career with our comprehensive platform.
              </p>
            </div>
          </div>

          <CareerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="card-mono p-mono-xl max-w-2xl mx-auto shadow-mono-lg">
              <h3 className="text-mono-headline mb-4">Ready to Build Your Professional Profile?</h3>
              <p className="text-mono-body mb-6">
                Join thousands of professionals who are advancing their careers with our platform. 
                Add certificates, apply to jobs, and connect with employers.
              </p>
              <a
                href="/dashboard"
                className="btn-mono inline-block"
              >
                Go to Dashboard →
              </a>
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