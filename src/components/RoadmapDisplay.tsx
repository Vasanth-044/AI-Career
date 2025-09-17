import { Link } from 'react-router-dom';
import { CareerRoadmap } from '../types/career';
import { 
  FaBullseye, 
  FaBriefcase, 
  FaBuilding, 
  FaFileAlt,
  FaPlay,
  FaCode,
  FaTasks,
  FaChevronDown,
  FaChevronRight,
  FaDownload,
  FaEye
} from 'react-icons/fa';
import { useState } from 'react';
import DailyCodingTasks from './DailyCodingTasks';
import CodingCompiler from './CodingCompiler';

interface RoadmapDisplayProps {
  roadmap: CareerRoadmap;
  onStartOver: () => void;
  userDetails?: {
    grade: string;
    experience: string;
  };
}

function RoadmapDisplay({ roadmap, onStartOver, userDetails }: RoadmapDisplayProps) {
  const [showDailyTasks, setShowDailyTasks] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [selectedPhase, setSelectedPhase] = useState('Beginner');
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([0]));

  const togglePhase = (idx: number) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
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
      {/* Minimal Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <FaBullseye className="text-gray-600" />
          {roadmap.domain}
        </h1>
        {userDetails && (
          <p className="text-sm text-gray-600 mt-2">
            {userDetails.grade} · {userDetails.experience}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            onClick={onStartOver}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Start over
          </button>
          <Link to="/dashboard" className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
            Go to dashboard
          </Link>
          <div className="h-5 w-px bg-gray-200 mx-1" />
          <button 
            onClick={() => setShowDailyTasks(true)}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <FaTasks className="text-xs" />
            Daily tasks
          </button>
          <button 
            onClick={() => setShowCompiler(true)}
            className="px-3 py-1.5 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2"
          >
            <FaCode className="text-xs" />
            Open compiler
          </button>
          <div className="h-5 w-px bg-gray-200 mx-1" />
          <button onClick={downloadRoadmap} className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <FaDownload className="text-xs" />
            Download text
          </button>
          <button onClick={() => setShowJsonPreview(true)} className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <FaEye className="text-xs" />
            Preview JSON
          </button>
          <button onClick={downloadJSON} className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
            Download JSON
          </button>
        </div>
      </div>

      {/* Roadmap Phases - minimal cards */}
      <div className="space-y-6 mb-10">
        {roadmap.roadmap.map((phase, index) => (
          <div key={phase.phase} className="border border-gray-200 rounded-md overflow-hidden">
            <button onClick={() => togglePhase(index)} className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
                {expandedPhases.has(index) ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />}
                {index + 1}. {phase.phase}
              </h3>
              <span className="text-xs text-gray-500">{phase.skills.length} skills · {phase.projects.length} projects</span>
            </button>
            {expandedPhases.has(index) && (
            <>
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                <ul className="space-y-1">
                  {phase.skills.map((skill, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Free Resources */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Free resources</h4>
                <ul className="space-y-1">
                  {phase.free_resources.map((resource, i) => {
                    const { url, name } = parseResource(resource);
                    return (
                      <li key={i} className="text-sm">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Paid Resources */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Paid resources</h4>
                <ul className="space-y-1">
                  {phase.paid_resources.map((resource, i) => {
                    const { url, name } = parseResource(resource);
                    return (
                      <li key={i} className="text-sm">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-purple-700 underline hover:text-purple-900">
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Projects</h4>
                <ul className="space-y-1">
                  {phase.projects.map((project, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* YouTube Videos - minimal list */}
            {phase.youtube_videos && phase.youtube_videos.length > 0 && (
              <div className="px-4 pb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <FaPlay className="text-gray-600" /> Videos
                </h4>
                <ul className="space-y-1">
                  {phase.youtube_videos.map((video, i) => (
                    <li key={i} className="text-sm">
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-red-600 underline hover:text-red-700">
                        {video.title}
                      </a>
                      <span className="text-gray-500"> — {video.channel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </>
            )}
          </div>
        ))}
      </div>

      {/* Career Information - minimal lists */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Career Paths */}
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
            <FaBriefcase className="text-gray-600" /> Career paths
          </h3>
          <div className="space-y-1">
            {roadmap.career_paths.map((path, i) => (
              <div key={i} className="text-sm text-gray-700">{path}</div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
            <FaBuilding className="text-gray-600" /> Top companies
          </h3>
          <div className="space-y-1">
            {roadmap.companies.map((company, i) => (
              <div key={i} className="text-sm text-gray-700">{company}</div>
            ))}
          </div>
        </div>

        {/* Interview Prep */}
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
            <FaFileAlt className="text-gray-600" /> Interview prep
          </h3>
          <div className="space-y-1">
            {roadmap.interview_prep.map((prep, i) => (
              <div key={i} className="text-sm text-gray-700">{prep}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Tasks Modal */}
      {showDailyTasks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <FaTasks className="text-blue-600" />
                  Daily Coding Tasks
                </h2>
                <button
                  onClick={() => setShowDailyTasks(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Programming Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="JavaScript">JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="C#">C#</option>
                      <option value="Go">Go</option>
                      <option value="Rust">Rust</option>
                      <option value="PHP">PHP</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Swift">Swift</option>
                      <option value="Kotlin">Kotlin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                    <select
                      value={selectedPhase}
                      onChange={(e) => setSelectedPhase(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              <DailyCodingTasks
                language={selectedLanguage}
                phase={selectedPhase}
                onOpenCompiler={(lang) => {
                  setSelectedLanguage(lang);
                  setShowDailyTasks(false);
                  setShowCompiler(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Code Compiler Modal */}
      {showCompiler && (
        <CodingCompiler
          language={selectedLanguage}
          onClose={() => setShowCompiler(false)}
        />
      )}

      {/* JSON Preview Modal */}
      {showJsonPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <FaFileAlt className="text-gray-600" /> Roadmap JSON (read-only)
              </h3>
              <button onClick={() => setShowJsonPreview(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <pre className="flex-1 m-4 p-4 bg-gray-50 rounded text-xs text-gray-800 overflow-auto">{JSON.stringify(roadmap, null, 2)}</pre>
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button onClick={() => setShowJsonPreview(false)} className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoadmapDisplay;