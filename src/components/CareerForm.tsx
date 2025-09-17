import { useState } from 'react';
import { UserInput } from '../types/career';
import { getAllDomains } from '../services/careerMentor';
import { 
  FaLaptopCode, 
  FaChartBar, 
  FaLock, 
  FaClipboardList, 
  FaPalette, 
  FaMobileAlt, 
  FaChartLine, 
  FaCloud, 
  FaCogs, 
  FaRobot, 
  FaGlobe, 
  FaGamepad, 
  FaLink, 
  FaBrain, 
  FaDollarSign, 
  FaHospital, 
  FaBook, 
  FaShoppingCart, 
  FaBullseye,
  FaGraduationCap,
  FaBookOpen,
  FaFileAlt,
  FaRocket,
  FaTrophy,
  FaSeedling,
  FaTree,
  FaLightbulb,
  FaFlask,
  FaUser,
  FaBuilding,
  FaMagic,
  FaStar
} from 'react-icons/fa';
import { useScrollAnimation, useScrollReveal } from '../hooks/useScrollAnimation';

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
  const [customSkills, setCustomSkills] = useState('');
  const [showCustomSkillsInput, setShowCustomSkillsInput] = useState(false);
  const [customInterests, setCustomInterests] = useState('');
  const [showCustomInterestsInput, setShowCustomInterestsInput] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [showCustomDomainInput, setShowCustomDomainInput] = useState(false);
  
  const formRef = useScrollAnimation();
  const headerRef = useScrollReveal(100);

  const programmingLanguages = [
    // Top 10 Most Popular Programming Languages & Technologies
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'React', 'Node.js', 'SQL',
    'No Programming Experience', 'Others (Specify Below)'
  ];

  const interestSuggestions = [
    // Main 10 Interest Categories
    'Technology & Programming', 'Business & Management', 'Engineering & Technical',
    'Healthcare & Medical', 'Arts & Creative', 'Education & Learning',
    'Science & Research', 'Finance & Accounting', 'Marketing & Communication',
    'Others (Specify Below)'
  ];

  const domains = getAllDomains().map(domain => ({
    value: domain,
    label: domain,
    icon: getDomainIcon(domain)
  }));

  function getDomainIcon(domain: string) {
    const iconMap: { [key: string]: any } = {
      'Software Engineering': FaLaptopCode,
      'Data Science': FaChartBar,
      'Cybersecurity': FaLock,
      'Product Management': FaClipboardList,
      'UX/UI Design': FaPalette,
      'Digital Marketing': FaMobileAlt,
      'Business Analytics': FaChartLine,
      'Cloud Computing': FaCloud,
      'DevOps': FaCogs,
      'Machine Learning': FaRobot,
      'Web Development': FaGlobe,
      'Mobile Development': FaMobileAlt,
      'Game Development': FaGamepad,
      'Blockchain': FaLink,
      'AI Research': FaBrain,
      'Fintech': FaDollarSign,
      'Healthcare Tech': FaHospital,
      'EdTech': FaBook,
      'E-commerce': FaShoppingCart,
      'IoT': FaGlobe
    };
    return iconMap[domain] || FaBullseye;
  }
  const grades = [
    // High School & Pre-College
    { value: 'High School (9th-12th)', label: 'High School (9th-12th)', icon: FaGraduationCap },
    { value: '12th Grade Passed', label: '12th Grade Passed', icon: FaTrophy },
    { value: 'Diploma', label: 'Diploma', icon: FaFileAlt },
    
    // Undergraduate Degrees - Engineering
    { value: 'B.Tech (Computer Science)', label: 'B.Tech (Computer Science)', icon: FaLaptopCode },
    { value: 'B.Tech (Mechanical)', label: 'B.Tech (Mechanical)', icon: FaCogs },
    { value: 'B.Tech (Civil)', label: 'B.Tech (Civil)', icon: FaBuilding },
    { value: 'B.Tech (Electrical)', label: 'B.Tech (Electrical)', icon: FaLightbulb },
    { value: 'B.Tech (Electronics)', label: 'B.Tech (Electronics)', icon: FaMobileAlt },
    { value: 'B.Tech (Chemical)', label: 'B.Tech (Chemical)', icon: FaFlask },
    { value: 'B.Tech (Aerospace)', label: 'B.Tech (Aerospace)', icon: FaRocket },
    { value: 'B.Tech (Biotechnology)', label: 'B.Tech (Biotechnology)', icon: FaSeedling },
    { value: 'B.Tech (Other)', label: 'B.Tech (Other)', icon: FaGraduationCap },
    
    // Undergraduate Degrees - Business & Management
    { value: 'BBA (Bachelor of Business Administration)', label: 'BBA (Bachelor of Business Administration)', icon: FaChartBar },
    { value: 'B.Com (Bachelor of Commerce)', label: 'B.Com (Bachelor of Commerce)', icon: FaDollarSign },
    { value: 'BBA (Finance)', label: 'BBA (Finance)', icon: FaChartLine },
    { value: 'BBA (Marketing)', label: 'BBA (Marketing)', icon: FaMobileAlt },
    { value: 'BBA (HR)', label: 'BBA (HR)', icon: FaUser },
    { value: 'BBA (Operations)', label: 'BBA (Operations)', icon: FaCogs },
    
    // Undergraduate Degrees - Arts & Humanities
    { value: 'BA (Bachelor of Arts)', label: 'BA (Bachelor of Arts)', icon: FaBook },
    { value: 'BA (English)', label: 'BA (English)', icon: FaBookOpen },
    { value: 'BA (Psychology)', label: 'BA (Psychology)', icon: FaBrain },
    { value: 'BA (Economics)', label: 'BA (Economics)', icon: FaChartBar },
    { value: 'BA (Political Science)', label: 'BA (Political Science)', icon: FaGlobe },
    { value: 'BA (History)', label: 'BA (History)', icon: FaBook },
    { value: 'BA (Sociology)', label: 'BA (Sociology)', icon: FaUser },
    
    // Undergraduate Degrees - Science
    { value: 'B.Sc (Bachelor of Science)', label: 'B.Sc (Bachelor of Science)', icon: FaFlask },
    { value: 'B.Sc (Mathematics)', label: 'B.Sc (Mathematics)', icon: FaChartLine },
    { value: 'B.Sc (Physics)', label: 'B.Sc (Physics)', icon: FaLightbulb },
    { value: 'B.Sc (Chemistry)', label: 'B.Sc (Chemistry)', icon: FaFlask },
    { value: 'B.Sc (Biology)', label: 'B.Sc (Biology)', icon: FaSeedling },
    { value: 'B.Sc (Computer Science)', label: 'B.Sc (Computer Science)', icon: FaLaptopCode },
    { value: 'B.Sc (Statistics)', label: 'B.Sc (Statistics)', icon: FaChartBar },
    
    // Undergraduate Degrees - Other Fields
    { value: 'B.Arch (Architecture)', label: 'B.Arch (Architecture)', icon: FaBuilding },
    { value: 'B.Pharm (Pharmacy)', label: 'B.Pharm (Pharmacy)', icon: FaHospital },
    { value: 'BDS (Dentistry)', label: 'BDS (Dentistry)', icon: FaHospital },
    { value: 'MBBS (Medicine)', label: 'MBBS (Medicine)', icon: FaHospital },
    { value: 'B.Ed (Education)', label: 'B.Ed (Education)', icon: FaBook },
    { value: 'BFA (Fine Arts)', label: 'BFA (Fine Arts)', icon: FaPalette },
    { value: 'BHM (Hotel Management)', label: 'BHM (Hotel Management)', icon: FaBuilding },
    { value: 'B.Sc (Agriculture)', label: 'B.Sc (Agriculture)', icon: FaSeedling },
    { value: 'B.Sc (Nursing)', label: 'B.Sc (Nursing)', icon: FaHospital },
    { value: 'LLB (Law)', label: 'LLB (Law)', icon: FaFileAlt },
    
    // Postgraduate Degrees - Business & Management
    { value: 'MBA (Master of Business Administration)', label: 'MBA (Master of Business Administration)', icon: FaChartBar },
    { value: 'MBA (Finance)', label: 'MBA (Finance)', icon: FaDollarSign },
    { value: 'MBA (Marketing)', label: 'MBA (Marketing)', icon: FaMobileAlt },
    { value: 'MBA (HR)', label: 'MBA (HR)', icon: FaUser },
    { value: 'MBA (Operations)', label: 'MBA (Operations)', icon: FaCogs },
    { value: 'MBA (IT)', label: 'MBA (IT)', icon: FaLaptopCode },
    { value: 'MBA (International Business)', label: 'MBA (International Business)', icon: FaGlobe },
    { value: 'M.Com (Master of Commerce)', label: 'M.Com (Master of Commerce)', icon: FaDollarSign },
    { value: 'PGDM (Post Graduate Diploma in Management)', label: 'PGDM (Post Graduate Diploma in Management)', icon: FaChartBar },
    
    // Postgraduate Degrees - Engineering
    { value: 'M.Tech (Master of Technology)', label: 'M.Tech (Master of Technology)', icon: FaLaptopCode },
    { value: 'M.Tech (Computer Science)', label: 'M.Tech (Computer Science)', icon: FaLaptopCode },
    { value: 'M.Tech (Mechanical)', label: 'M.Tech (Mechanical)', icon: FaCogs },
    { value: 'M.Tech (Civil)', label: 'M.Tech (Civil)', icon: FaBuilding },
    { value: 'M.Tech (Electrical)', label: 'M.Tech (Electrical)', icon: FaLightbulb },
    { value: 'M.E (Master of Engineering)', label: 'M.E (Master of Engineering)', icon: FaGraduationCap },
    
    // Postgraduate Degrees - Science
    { value: 'M.Sc (Master of Science)', label: 'M.Sc (Master of Science)', icon: FaFlask },
    { value: 'M.Sc (Mathematics)', label: 'M.Sc (Mathematics)', icon: FaChartLine },
    { value: 'M.Sc (Physics)', label: 'M.Sc (Physics)', icon: FaLightbulb },
    { value: 'M.Sc (Chemistry)', label: 'M.Sc (Chemistry)', icon: FaFlask },
    { value: 'M.Sc (Biology)', label: 'M.Sc (Biology)', icon: FaSeedling },
    { value: 'M.Sc (Computer Science)', label: 'M.Sc (Computer Science)', icon: FaLaptopCode },
    { value: 'M.Sc (Statistics)', label: 'M.Sc (Statistics)', icon: FaChartBar },
    
    // Postgraduate Degrees - Arts & Humanities
    { value: 'MA (Master of Arts)', label: 'MA (Master of Arts)', icon: FaBook },
    { value: 'MA (English)', label: 'MA (English)', icon: FaBookOpen },
    { value: 'MA (Psychology)', label: 'MA (Psychology)', icon: FaBrain },
    { value: 'MA (Economics)', label: 'MA (Economics)', icon: FaChartBar },
    { value: 'MA (Political Science)', label: 'MA (Political Science)', icon: FaGlobe },
    { value: 'MA (History)', label: 'MA (History)', icon: FaBook },
    { value: 'MA (Sociology)', label: 'MA (Sociology)', icon: FaUser },
    
    // Doctoral Degrees
    { value: 'PhD (Doctor of Philosophy)', label: 'PhD (Doctor of Philosophy)', icon: FaGraduationCap },
    { value: 'PhD (Computer Science)', label: 'PhD (Computer Science)', icon: FaLaptopCode },
    { value: 'PhD (Engineering)', label: 'PhD (Engineering)', icon: FaCogs },
    { value: 'PhD (Business)', label: 'PhD (Business)', icon: FaChartBar },
    { value: 'PhD (Science)', label: 'PhD (Science)', icon: FaFlask },
    { value: 'PhD (Arts)', label: 'PhD (Arts)', icon: FaBook },
    
    // Professional Certifications & Others
    { value: 'CA (Chartered Accountant)', label: 'CA (Chartered Accountant)', icon: FaDollarSign },
    { value: 'CS (Company Secretary)', label: 'CS (Company Secretary)', icon: FaFileAlt },
    { value: 'ICWA (Cost Accountant)', label: 'ICWA (Cost Accountant)', icon: FaChartLine },
    { value: 'CFA (Chartered Financial Analyst)', label: 'CFA (Chartered Financial Analyst)', icon: FaDollarSign },
    { value: 'FRM (Financial Risk Manager)', label: 'FRM (Financial Risk Manager)', icon: FaChartBar },
    { value: 'PMP (Project Management Professional)', label: 'PMP (Project Management Professional)', icon: FaClipboardList },
    { value: 'Certified Professional', label: 'Certified Professional', icon: FaTrophy },
    
    // Current Status
    { value: 'Currently Studying', label: 'Currently Studying', icon: FaBookOpen },
    { value: 'Recent Graduate', label: 'Recent Graduate', icon: FaTrophy },
    { value: 'Working Professional', label: 'Working Professional', icon: FaLaptopCode },
    { value: 'Career Changer', label: 'Career Changer', icon: FaRocket },
    { value: 'Self-Taught', label: 'Self-Taught', icon: FaLightbulb }
  ];

  const experienceLevels = [
    { value: 'Complete Beginner', label: 'Complete Beginner', icon: FaSeedling },
    { value: 'Some Basic Knowledge', label: 'Some Basic Knowledge', icon: FaTree },
    { value: 'Intermediate', label: 'Intermediate', icon: FaTree },
    { value: 'Advanced', label: 'Advanced', icon: FaRocket },
    { value: 'Expert', label: 'Expert', icon: FaTrophy }
  ];

  const handleSkillToggle = (skill: string) => {
    if (skill === 'Others (Specify Below)') {
      setShowCustomSkillsInput(!showCustomSkillsInput);
      // Remove the "Others" option from selected skills if showing input
      if (showCustomSkillsInput) {
        setSelectedSkills(prev => prev.filter(s => s !== 'Others (Specify Below)'));
      } else {
        setSelectedSkills(prev => [...prev, skill]);
      }
    } else {
      setSelectedSkills(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (interest === 'Others (Specify Below)') {
      setShowCustomInterestsInput(!showCustomInterestsInput);
      // Remove the "Others" option from selected interests if showing input
      if (showCustomInterestsInput) {
        setSelectedInterests(prev => prev.filter(i => i !== 'Others (Specify Below)'));
      } else {
        setSelectedInterests(prev => [...prev, interest]);
      }
    } else {
      setSelectedInterests(prev => 
        prev.includes(interest) 
          ? prev.filter(i => i !== interest)
          : [...prev, interest]
      );
    }
  };

  const handleDomainChange = (domain: string) => {
    if (domain === 'Others (Specify Below)') {
      setShowCustomDomainInput(true);
      setSelectedDomain(''); // Clear the selected domain
    } else {
      setShowCustomDomainInput(false);
      setSelectedDomain(domain);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedInterests = [
      ...selectedInterests.filter(interest => interest !== 'Others (Specify Below)'),
      ...(customInterests.trim() ? [customInterests.trim()] : []),
      ...(interests.trim() ? [interests.trim()] : [])
    ].join(', ');
    
    const combinedSkills = [
      ...selectedSkills.filter(skill => skill !== 'Others (Specify Below)'),
      ...(customSkills.trim() ? [customSkills.trim()] : []),
      ...(selectedSkills.length === 0 && !customSkills.trim() ? ['No programming experience'] : [])
    ].join(', ');

    if ((combinedInterests || selectedInterests.length > 0 || customInterests.trim()) && (combinedSkills || selectedSkills.length > 0 || customSkills.trim()) && grade && experience) {
      onSubmit({ 
        interests: combinedInterests, 
        skills: combinedSkills,
        selectedDomain: customDomain.trim() || selectedDomain || undefined,
        grade,
        experience
      });
    }
  };

  return (
    <div ref={formRef} className="card-modern p-2xl max-w-4xl mx-auto scroll-reveal">
      <div ref={headerRef} className="text-center mb-12 scroll-reveal">
        <div className="inline-block p-6 bg-gradient-primary rounded-3xl shadow-glow-lg mb-8 animate-float">
          <FaMagic className="text-4xl text-white" />
        </div>
        <h2 className="text-headline text-gradient mb-4">
          Discover Your Career Path
        </h2>
        <p className="text-body text-neutral-600 max-w-2xl mx-auto">
          Tell us about yourself, and we'll create a personalized roadmap for your dream career. 
          Our AI will analyze your interests and suggest the perfect path forward.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Row */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label htmlFor="grade" className="block text-subheadline text-neutral-800 flex items-center">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <FaGraduationCap className="text-white text-lg" />
              </div>
              Education Level
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="input-modern"
              required
            >
              <option value="">Select education level</option>
              {grades.map((gradeOption) => (
                <option key={gradeOption.value} value={gradeOption.value}>
                  {gradeOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label htmlFor="experience" className="block text-subheadline text-neutral-800 flex items-center">
              <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
                <FaChartBar className="text-white text-lg" />
              </div>
              Experience Level
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="input-modern"
              required
            >
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Career Domain Selection */}
        <div className="space-y-2">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 flex items-center">
            <FaBullseye className="mr-2 text-gray-500" />
            Career Domain (Optional)
          </label>
          <select
            id="domain"
            value={selectedDomain}
            onChange={(e) => handleDomainChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Let AI choose the best domain for me</option>
            {domains.map((domain) => (
              <option key={domain.value} value={domain.value}>
                {domain.label}
              </option>
            ))}
          </select>
          
          {/* Custom Domain Input */}
          {showCustomDomainInput && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <label htmlFor="customDomain" className="block text-sm font-medium text-blue-800 mb-2">
                Specify your custom career domain:
              </label>
              <input
                id="customDomain"
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="Enter your specific career domain"
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          )}
          
          <p className="text-xs text-gray-500">
            Leave blank to let our AI analyze your interests and choose the best domain
          </p>
        </div>

        {/* Programming Skills Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FaLaptopCode className="mr-2 text-gray-500" />
            Programming Languages & Technologies
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {programmingLanguages.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedSkills.includes(skill)
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          
          {/* Custom Skills Input */}
          {showCustomSkillsInput && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <label htmlFor="customSkills" className="block text-sm font-medium text-blue-800 mb-2">
                Specify your custom skills:
              </label>
              <textarea
                id="customSkills"
                value={customSkills}
                onChange={(e) => setCustomSkills(e.target.value)}
                placeholder="Enter your skills separated by commas"
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                rows={2}
              />
            </div>
          )}
        </div>

        {/* Interests Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FaLightbulb className="mr-2 text-gray-500" />
            What are your interests and passions?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
            {interestSuggestions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedInterests.includes(interest)
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          
          {/* Custom Interests Input */}
          {showCustomInterestsInput && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <label htmlFor="customInterests" className="block text-sm font-medium text-green-800 mb-2">
                Specify your custom interests:
              </label>
              <textarea
                id="customInterests"
                value={customInterests}
                onChange={(e) => setCustomInterests(e.target.value)}
                placeholder="Enter your interests separated by commas"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                rows={2}
              />
            </div>
          )}
          
          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Or describe your interests in your own words..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
          />
        </div>

        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isLoading || (selectedInterests.length === 0 && !interests.trim() && !customInterests.trim()) || (selectedSkills.length === 0 && !customSkills.trim()) || !grade || !experience}
            className="btn-primary btn-xl w-full max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="loader"></div>
                <span>Generating roadmap...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <FaRocket className="text-xl" />
                <span>Generate My Career Roadmap</span>
                <FaStar className="text-xl" />
              </div>
            )}
          </button>
        </div>
      </form>

    </div>
  );
}

export default CareerForm;