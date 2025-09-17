import { Link } from 'react-router-dom';
import { CareerRoadmap } from '../types/career';
import { 
  FaBullseye, 
  FaGraduationCap, 
  FaRocket, 
  FaBriefcase, 
  FaBuilding, 
  FaFileAlt,
  FaDownload,
  FaFileCode,
  FaGift,
  FaGem,
  FaPlay,
  FaTachometerAlt,
  FaArrowRight
} from 'react-icons/fa';

interface RoadmapDisplayProps {
  roadmap: CareerRoadmap;
  onStartOver: () => void;
  userDetails?: {
    grade: string;
    experience: string;
  };
}

function RoadmapDisplay({ roadmap, onStartOver, userDetails }: RoadmapDisplayProps) {
  const phaseColors = {
    'Beginner': 'from-green-500 to-emerald-600',
    'Intermediate': 'from-yellow-500 to-orange-600',
    'Advanced': 'from-purple-500 to-indigo-600'
  };

  const downloadRoadmap = () => {
    const roadmapText = `
CAREER ROADMAP
==============

Domain: ${roadmap.domain}
${userDetails ? `Education Level: ${userDetails.grade}` : ''}
${userDetails ? `Experience Level: ${userDetails.experience}` : ''}

LEARNING ROADMAP
================

${roadmap.roadmap.map((phase, index) => `
${index + 1}. ${phase.phase.toUpperCase()} PHASE
${'='.repeat(phase.phase.length + 10)}

Skills to Learn:
${phase.skills.map(skill => `• ${skill}`).join('\n')}

Free Resources:
${phase.free_resources.map(resource => {
  const [url, name] = resource.includes('|') ? resource.split('|') : [resource, resource];
  return `• ${name}: ${url}`;
}).join('\n')}

Paid Resources:
${phase.paid_resources.map(resource => {
  const [url, name] = resource.includes('|') ? resource.split('|') : [resource, resource];
  return `• ${name}: ${url}`;
}).join('\n')}

Project Ideas:
${phase.projects.map(project => `• ${project}`).join('\n')}
`).join('\n')}

CAREER INFORMATION
==================

Possible Job Roles:
${roadmap.career_paths.map(path => `• ${path}`).join('\n')}

Top Companies:
${roadmap.companies.map(company => `• ${company}`).join('\n')}

Interview Preparation:
${roadmap.interview_prep.map(prep => `• ${prep}`).join('\n')}

JSON FORMAT
===========
${JSON.stringify(roadmap, null, 2)}
    `.trim();

    const blob = new Blob([roadmapText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${roadmap.domain.replace(/\s+/g, '_')}_Career_Roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(roadmap, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${roadmap.domain.replace(/\s+/g, '_')}_Career_Roadmap.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const parseResource = (resource: string) => {
    if (resource.includes('|')) {
      const [url, name] = resource.split('|');
      return { url, name };
    }
    return { url: '#', name: resource };
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-soft mb-6">
          <FaBullseye className="text-2xl text-blue-600" />
          <span className="text-xl font-bold text-gray-800">{roadmap.domain}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Career Roadmap</h2>
        
        {/* User Details Summary */}
        {userDetails && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md mx-auto mb-6 shadow-soft">
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-center">
                <span className="block text-gray-500">Education Level</span>
                <span className="font-medium text-gray-800">{userDetails.grade}</span>
              </div>
              <div className="text-center">
                <span className="block text-gray-500">Experience</span>
                <span className="font-medium text-gray-800">{userDetails.experience}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={onStartOver}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-soft"
          >
            ← Start Over
          </button>
          <Link
            to="/dashboard"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-soft"
          >
            <FaTachometerAlt />
            <span>Go to Dashboard</span>
            <FaArrowRight />
          </Link>
          <button
            onClick={downloadRoadmap}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-soft"
          >
            <FaDownload />
            <span>Download Roadmap</span>
          </button>
          <button
            onClick={downloadJSON}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-soft"
          >
            <FaFileCode />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      {/* Roadmap Phases */}
      <div className="space-y-8 mb-12">
        {roadmap.roadmap.map((phase, index) => (
          <div key={phase.phase} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-soft-lg">
            <div className={`bg-gradient-to-r ${phaseColors[phase.phase as keyof typeof phaseColors]} px-6 py-4`}>
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                  {index + 1}
                </span>
                {phase.phase} Phase
              </h3>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Skills */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaGraduationCap className="mr-2 text-blue-600" />
                  Skills to Learn
                </h4>
                <ul className="space-y-2">
                  {phase.skills.map((skill, i) => (
                    <li key={i} className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Free Resources */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaGift className="mr-2 text-green-600" />
                  Free Resources
                </h4>
                <ul className="space-y-2">
                  {phase.free_resources.map((resource, i) => {
                    const { url, name } = parseResource(resource);
                    return (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full block transition-colors underline border border-blue-200"
                        >
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Paid Resources */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaGem className="mr-2 text-purple-600" />
                  Paid Resources
                </h4>
                <ul className="space-y-2">
                  {phase.paid_resources.map((resource, i) => {
                    const { url, name } = parseResource(resource);
                    return (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-full block transition-colors underline border border-purple-200"
                        >
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaRocket className="mr-2 text-green-600" />
                  Project Ideas
                </h4>
                <ul className="space-y-2">
                  {phase.projects.map((project, i) => (
                    <li key={i} className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* YouTube Videos Section */}
            {phase.youtube_videos && phase.youtube_videos.length > 0 && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FaPlay className="mr-2 text-red-600" />
                  Recommended YouTube Videos
                </h4>
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
                  {phase.youtube_videos.map((video, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-red-300 transition-colors shadow-soft">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">▶</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                            {video.title}
                          </h5>
                          <p className="text-gray-600 text-xs mb-2">{video.channel}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                            <span>{video.duration}</span>
                            <span>•</span>
                            <span>{video.views} views</span>
                          </div>
                          <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                            {video.description}
                          </p>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-red-600 hover:text-red-700 text-xs font-medium"
                          >
                            Watch on YouTube →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Career Information */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Career Paths */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-blue-600" />
            Career Paths
          </h3>
          <div className="space-y-2">
            {roadmap.career_paths.map((path, i) => (
              <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-800">{path}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaBuilding className="mr-2 text-green-600" />
            Top Companies
          </h3>
          <div className="space-y-2">
            {roadmap.companies.map((company, i) => (
              <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-800">{company}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Prep */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaFileAlt className="mr-2 text-purple-600" />
            Interview Prep
          </h3>
          <div className="space-y-2">
            {roadmap.interview_prep.map((prep, i) => (
              <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-800">{prep}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapDisplay;