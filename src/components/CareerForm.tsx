import { useState } from 'react';
import { UserInput } from '../types/career';
import { getAllDomains } from '../services/careerMentor';

interface CareerFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const [interests, setInterests] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [grade, setGrade] = useState('');
  const [experience, setExperience] = useState('');

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'SQL',
    'HTML/CSS', 'React', 'Vue.js', 'Angular', 'Node.js', 'Django', 'Flask',
    'Spring Boot', 'Express.js', 'Laravel', 'ASP.NET', 'None/Other'
  ];

  const interestSuggestions = [
    'Data Analysis & Visualization', 'Machine Learning & AI', 'Web Development',
    'Mobile App Development', 'Cybersecurity', 'Cloud Computing', 'DevOps',
    'UI/UX Design', 'Game Development', 'Blockchain & Cryptocurrency',
    'IoT & Embedded Systems', 'Robotics', 'Digital Marketing', 'Content Creation',
    'Project Management', 'Business Analysis', 'Financial Technology',
    'Healthcare Technology', 'Education Technology', 'E-commerce',
    'Social Media & Community Management', 'Photography & Video Editing',
    'Music & Audio Production', 'Writing & Communication', 'Research & Analytics'
  ];

  const domains = getAllDomains().map(domain => ({
    value: domain,
    label: domain,
    icon: getDomainIcon(domain)
  }));

  function getDomainIcon(domain: string): string {
    const iconMap: { [key: string]: string } = {
      'Software Engineering': '💻',
      'Data Science': '📊',
      'Cybersecurity': '🔒',
      'Product Management': '📋',
      'UX/UI Design': '🎨',
      'Digital Marketing': '📱',
      'Business Analytics': '📈',
      'Cloud Computing': '☁️',
      'DevOps': '⚙️',
      'Machine Learning': '🤖',
      'Web Development': '🌐',
      'Mobile Development': '📱',
      'Game Development': '🎮',
      'Blockchain': '⛓️',
      'AI Research': '🧠',
      'Fintech': '💰',
      'Healthcare Tech': '🏥',
      'EdTech': '📚',
      'E-commerce': '🛒',
      'IoT': '🌐'
    };
    return iconMap[domain] || '🎯';
  }
  const grades = [
    { value: 'High School (9th-12th)', label: 'High School (9th-12th)', icon: '🎓' },
    { value: 'College Freshman', label: 'College Freshman', icon: '📚' },
    { value: 'College Sophomore', label: 'College Sophomore', icon: '📖' },
    { value: 'College Junior', label: 'College Junior', icon: '📝' },
    { value: 'College Senior', label: 'College Senior', icon: '🎯' },
    { value: 'Graduate Student', label: 'Graduate Student', icon: '🎓' },
    { value: 'Recent Graduate', label: 'Recent Graduate', icon: '🎉' },
    { value: 'Working Professional', label: 'Working Professional', icon: '💼' }
  ];

  const experienceLevels = [
    { value: 'Complete Beginner', label: 'Complete Beginner', icon: '🌱' },
    { value: 'Some Basic Knowledge', label: 'Some Basic Knowledge', icon: '🌿' },
    { value: 'Intermediate', label: 'Intermediate', icon: '🌳' },
    { value: 'Advanced', label: 'Advanced', icon: '🚀' },
    { value: 'Expert', label: 'Expert', icon: '🏆' }
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedInterests = [
      ...selectedInterests,
      ...(interests.trim() ? [interests.trim()] : [])
    ].join(', ');
    
    const combinedSkills = [
      ...selectedSkills,
      ...(selectedSkills.length === 0 ? ['No programming experience'] : [])
    ].join(', ');

    if ((combinedInterests || selectedInterests.length > 0) && (combinedSkills || selectedSkills.length > 0) && grade && experience) {
      onSubmit({ 
        interests: combinedInterests, 
        skills: combinedSkills,
        selectedDomain: selectedDomain || undefined,
        grade,
        experience
      });
    }
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto border-2 border-gray-200 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-mono-title mb-4">
          Discover Your Career Path
        </h2>
        <p className="text-mono-body">
          Tell us about yourself, and we'll create a personalized roadmap for your dream career.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="grade" className="block text-mono-body font-semibold mb-3 text-lg">
              Current Education Level 🎓
            </label>
            <div className="relative">
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-lg appearance-none cursor-pointer"
                required
              >
                <option value="">🎓 Select your education level</option>
                {grades.map((gradeOption) => (
                  <option key={gradeOption.value} value={gradeOption.value} className="py-3 text-lg">
                    {gradeOption.icon} {gradeOption.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="block text-mono-body font-semibold mb-3 text-lg">
              Experience Level 📊
            </label>
            <div className="relative">
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-lg appearance-none cursor-pointer"
                required
              >
                <option value="">📊 Select your experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value} className="py-3 text-lg">
                    {level.icon} {level.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Career Domain Selection */}
        <div className="space-y-2">
          <label htmlFor="domain" className="block text-mono-body font-semibold mb-3 text-lg">
            Interested Career Domain (Optional) 🎯
          </label>
          <div className="relative">
            <select
              id="domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-lg appearance-none cursor-pointer"
            >
              <option value="">🎯 Let AI choose the best domain for me</option>
              {domains.map((domain) => (
                <option key={domain.value} value={domain.value} className="py-3 text-lg">
                  {domain.icon} {domain.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-6 h-6 text-mono-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-mono-caption mt-3 text-sm text-mono-grey-600">
            Leave blank to let our AI analyze your interests and choose the best domain
          </p>
        </div>

        {/* Programming Skills Section */}
        <div>
          <label className="block text-mono-body font-medium mb-4">
            Programming Languages & Technologies 💻
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {programmingLanguages.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`p-3 text-sm font-medium transition-all duration-200 border-2 shadow-sm ${
                  selectedSkills.includes(skill)
                    ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <label className="block text-mono-body font-medium mb-4">
            What are your interests and passions? 💡
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {interestSuggestions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`p-3 text-sm font-medium transition-all duration-200 border-2 shadow-sm ${
                  selectedInterests.includes(interest)
                    ? 'bg-green-50 border-green-300 text-green-700 shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Or describe your interests in your own words..."
            className="w-full p-4 border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-md resize-none"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || (selectedInterests.length === 0 && !interests.trim()) || (selectedSkills.length === 0) || !grade || !experience}
          className="w-full py-4 px-6 text-lg font-semibold bg-blue-600 text-white border-2 border-blue-600 shadow-lg hover:bg-blue-700 hover:border-blue-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="mono-loader-large"></div>
              <span>Generating your personalized roadmap...</span>
            </div>
          ) : (
            'Generate My Career Roadmap 🚀'
          )}
        </button>
      </form>

    </div>
  );
}

export default CareerForm;