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
  FaBuilding
} from 'react-icons/fa';

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

  const programmingLanguages = [
    // Programming Languages - General
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'SQL',
    'C', 'C#', 'Perl', 'Haskell', 'Clojure', 'Erlang', 'Elixir', 'Dart',
    'Lua', 'Julia', 'Fortran', 'COBOL', 'Assembly', 'Shell/Bash', 'PowerShell',
    
    // Web Development
    'HTML/CSS', 'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
    'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot',
    'Laravel', 'ASP.NET', 'Ruby on Rails', 'Symfony', 'CodeIgniter',
    'jQuery', 'Bootstrap', 'Tailwind CSS', 'Sass/SCSS', 'Webpack', 'Vite',
    
    // Mobile Development
    'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Cordova/PhoneGap',
    'Android Studio', 'Xcode', 'Kotlin (Android)', 'Swift (iOS)',
    
    // Database Technologies
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle',
    'SQL Server', 'MariaDB', 'Cassandra', 'Neo4j', 'Firebase', 'Supabase',
    'DynamoDB', 'Elasticsearch', 'InfluxDB', 'CouchDB',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins',
    'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet',
    'Nginx', 'Apache', 'Linux', 'Ubuntu', 'CentOS', 'Windows Server',
    
    // Data Science & Analytics
    'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras',
    'Jupyter', 'R Studio', 'Tableau', 'Power BI', 'Apache Spark', 'Hadoop',
    'Apache Kafka', 'Apache Airflow', 'D3.js', 'Plotly', 'Matplotlib',
    'Seaborn', 'ggplot2', 'Excel', 'Google Analytics', 'Mixpanel',
    
    // Game Development
    'Unity', 'Unreal Engine', 'Godot', 'Blender', 'Maya', '3ds Max',
    'Cocos2d', 'Phaser', 'Pygame', 'OpenGL', 'DirectX', 'Vulkan',
    
    // Blockchain & Cryptocurrency
    'Solidity', 'Web3.js', 'Ethers.js', 'Truffle', 'Hardhat', 'Ganache',
    'MetaMask', 'IPFS', 'Hyperledger', 'Ethereum', 'Bitcoin', 'Cardano',
    
    // IoT & Embedded Systems
    'Arduino', 'Raspberry Pi', 'ESP32', 'MicroPython', 'CircuitPython',
    'MQTT', 'CoAP', 'LoRaWAN', 'Zigbee', 'Bluetooth', 'WiFi', 'Ethernet',
    
    // Cybersecurity
    'Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'OWASP ZAP',
    'Nessus', 'OpenVAS', 'Snort', 'Suricata', 'Kali Linux', 'Parrot OS',
    
    // Business & Finance Tools
    'SAP', 'Oracle ERP', 'Salesforce', 'HubSpot', 'QuickBooks', 'Xero',
    'Sage', 'Microsoft Dynamics', 'Workday', 'ServiceNow', 'Jira',
    'Confluence', 'Slack', 'Microsoft Teams', 'Zoom', 'Trello', 'Asana',
    
    // Design & Multimedia
    'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma',
    'Sketch', 'Adobe XD', 'Canva', 'GIMP', 'Inkscape', 'Blender',
    'Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'After Effects',
    
    // CAD & Engineering
    'AutoCAD', 'SolidWorks', 'CATIA', 'Inventor', 'Fusion 360', 'Revit',
    'SketchUp', 'Rhino', 'Maya', '3ds Max', 'ANSYS', 'MATLAB Simulink',
    
    // Medical & Healthcare
    'Epic', 'Cerner', 'Allscripts', 'Meditech', 'NextGen', 'eClinicalWorks',
    'DICOM', 'HL7', 'FHIR', 'PACS', 'EMR', 'EHR',
    
    // Legal & Compliance
    'LexisNexis', 'Westlaw', 'Clio', 'MyCase', 'PracticePanther', 'Smokeball',
    'Filevine', 'Litify', 'Zola Suite', 'TimeSolv',
    
    // Education & E-learning
    'Moodle', 'Blackboard', 'Canvas', 'Google Classroom', 'Zoom', 'Microsoft Teams',
    'Kahoot', 'Quizlet', 'Duolingo', 'Coursera', 'Udemy', 'edX',
    
    // Marketing & SEO
    'Google Ads', 'Facebook Ads', 'Google Analytics', 'SEMrush', 'Ahrefs',
    'Moz', 'Hootsuite', 'Buffer', 'Mailchimp', 'HubSpot', 'Salesforce',
    'WordPress', 'Shopify', 'WooCommerce', 'Magento', 'Squarespace',
    
    // Project Management
    'Microsoft Project', 'Primavera', 'Smartsheet', 'Monday.com', 'Basecamp',
    'Wrike', 'ClickUp', 'Notion', 'Airtable', 'Miro', 'Lucidchart',
    
    // No Programming Experience
    'No Programming Experience', 'Others (Specify Below)'
  ];

  const interestSuggestions = [
    // Technology & Programming
    'Data Analysis & Visualization', 'Machine Learning & AI', 'Web Development',
    'Mobile App Development', 'Cybersecurity', 'Cloud Computing', 'DevOps',
    'UI/UX Design', 'Game Development', 'Blockchain & Cryptocurrency',
    'IoT & Embedded Systems', 'Robotics', 'Software Engineering', 'Database Design',
    'API Development', 'Microservices', 'System Architecture', 'Performance Optimization',
    'Quality Assurance & Testing', 'Code Review & Best Practices', 'Open Source Development',
    
    // Business & Management
    'Project Management', 'Business Analysis', 'Financial Technology', 'Digital Marketing',
    'E-commerce', 'Social Media & Community Management', 'Business Strategy',
    'Operations Management', 'Supply Chain Management', 'Human Resources',
    'Customer Relationship Management', 'Sales & Business Development',
    'Market Research & Analysis', 'Product Management', 'Consulting',
    'Entrepreneurship & Startups', 'International Business', 'Corporate Finance',
    'Investment Banking', 'Risk Management', 'Compliance & Regulatory Affairs',
    
    // Engineering & Technical
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Chemical Engineering', 'Aerospace Engineering', 'Biomedical Engineering',
    'Environmental Engineering', 'Industrial Engineering', 'Materials Science',
    'Renewable Energy', 'Automotive Engineering', 'Manufacturing & Production',
    'Quality Control', 'Safety Engineering', 'Structural Analysis',
    'Thermodynamics', 'Fluid Mechanics', 'Control Systems', 'Signal Processing',
    
    // Healthcare & Medical
    'Healthcare Technology', 'Medical Research', 'Public Health', 'Nursing',
    'Pharmacy', 'Dentistry', 'Physical Therapy', 'Mental Health',
    'Medical Device Development', 'Telemedicine', 'Health Informatics',
    'Epidemiology', 'Clinical Research', 'Medical Imaging', 'Biotechnology',
    'Pharmaceutical Development', 'Healthcare Administration', 'Patient Care',
    'Medical Education', 'Health Policy', 'Global Health',
    
    // Arts & Creative
    'Photography & Video Editing', 'Music & Audio Production', 'Writing & Communication',
    'Content Creation', 'Graphic Design', 'Illustration', 'Animation',
    'Film & Video Production', 'Podcasting', 'Creative Writing', 'Journalism',
    'Fashion Design', 'Interior Design', 'Architecture', 'Fine Arts',
    'Digital Art', '3D Modeling', 'Game Art', 'Web Design', 'Brand Design',
    'Typography', 'Color Theory', 'User Experience Design',
    
    // Education & Learning
    'Education Technology', 'Teaching & Training', 'Curriculum Development',
    'Educational Research', 'Online Learning', 'Language Learning',
    'Special Education', 'Early Childhood Education', 'Higher Education',
    'Educational Psychology', 'Learning Analytics', 'Instructional Design',
    'Educational Assessment', 'Student Affairs', 'Academic Research',
    'Educational Policy', 'International Education', 'Adult Education',
    
    // Science & Research
    'Research & Analytics', 'Scientific Research', 'Laboratory Work',
    'Data Science', 'Statistics', 'Mathematics', 'Physics', 'Chemistry',
    'Biology', 'Environmental Science', 'Geology', 'Astronomy', 'Psychology',
    'Sociology', 'Anthropology', 'Political Science', 'Economics',
    'History', 'Philosophy', 'Linguistics', 'Archaeology', 'Geography',
    
    // Legal & Compliance
    'Law & Legal Studies', 'Corporate Law', 'Criminal Law', 'Intellectual Property',
    'Contract Law', 'Immigration Law', 'Family Law', 'Environmental Law',
    'International Law', 'Legal Research', 'Paralegal Studies', 'Court Reporting',
    'Legal Technology', 'Compliance', 'Regulatory Affairs', 'Ethics',
    'Legal Writing', 'Mediation', 'Arbitration', 'Legal Consulting',
    
    // Finance & Accounting
    'Accounting', 'Financial Planning', 'Investment Analysis', 'Banking',
    'Insurance', 'Tax Planning', 'Auditing', 'Corporate Finance',
    'Personal Finance', 'Real Estate', 'Financial Modeling', 'Trading',
    'Portfolio Management', 'Risk Assessment', 'Financial Reporting',
    'Cost Accounting', 'Management Accounting', 'Forensic Accounting',
    'International Finance', 'Fintech', 'Cryptocurrency & Blockchain',
    
    // Marketing & Communication
    'Digital Marketing', 'Content Marketing', 'Social Media Marketing',
    'Search Engine Optimization (SEO)', 'Search Engine Marketing (SEM)',
    'Email Marketing', 'Influencer Marketing', 'Brand Management',
    'Public Relations', 'Advertising', 'Market Research', 'Consumer Behavior',
    'Marketing Analytics', 'Event Planning', 'Public Speaking', 'Copywriting',
    'Technical Writing', 'Translation', 'Interpretation', 'Media Relations',
    
    // Agriculture & Environment
    'Sustainable Agriculture', 'Environmental Conservation', 'Climate Change',
    'Renewable Energy', 'Water Management', 'Soil Science', 'Crop Science',
    'Animal Science', 'Forestry', 'Wildlife Conservation', 'Marine Biology',
    'Environmental Policy', 'Green Technology', 'Waste Management',
    'Biodiversity', 'Ecosystem Management', 'Environmental Impact Assessment',
    
    // Hospitality & Tourism
    'Hotel Management', 'Restaurant Management', 'Event Management',
    'Tourism Development', 'Travel Planning', 'Customer Service',
    'Culinary Arts', 'Food & Beverage Management', 'Hospitality Marketing',
    'Convention Management', 'Resort Management', 'Airline Management',
    'Cruise Line Management', 'Adventure Tourism', 'Cultural Tourism',
    
    // Sports & Fitness
    'Sports Management', 'Fitness Training', 'Physical Education',
    'Sports Medicine', 'Athletic Training', 'Sports Psychology',
    'Sports Marketing', 'Recreation Management', 'Exercise Science',
    'Nutrition', 'Wellness Coaching', 'Sports Analytics', 'Sports Broadcasting',
    'Sports Journalism', 'Youth Sports', 'Adaptive Sports',
    
    // Social Work & Community
    'Social Work', 'Community Development', 'Non-profit Management',
    'Social Services', 'Crisis Intervention', 'Family Services',
    'Child Welfare', 'Elder Care', 'Disability Services', 'Mental Health Counseling',
    'Substance Abuse Counseling', 'Community Outreach', 'Volunteer Management',
    'Grant Writing', 'Program Development', 'Policy Advocacy',
    
    // Transportation & Logistics
    'Supply Chain Management', 'Logistics', 'Transportation Planning',
    'Fleet Management', 'Warehouse Management', 'Inventory Management',
    'Procurement', 'International Trade', 'Customs & Compliance',
    'Freight Forwarding', 'Shipping & Receiving', 'Distribution Management',
    'Third-Party Logistics', 'Reverse Logistics', 'Cold Chain Management',
    
    // Real Estate & Construction
    'Real Estate Development', 'Property Management', 'Real Estate Sales',
    'Construction Management', 'Architecture', 'Urban Planning',
    'Landscape Architecture', 'Building Inspection', 'Real Estate Appraisal',
    'Commercial Real Estate', 'Residential Real Estate', 'Real Estate Investment',
    'Property Valuation', 'Real Estate Law', 'Construction Technology',
    
    // Media & Entertainment
    'Broadcasting', 'Journalism', 'Media Production', 'Television Production',
    'Radio Production', 'Podcasting', 'Streaming Media', 'Social Media Management',
    'Content Strategy', 'Media Relations', 'Entertainment Law', 'Talent Management',
    'Event Production', 'Live Streaming', 'Digital Media', 'Media Analytics',
    
    // Others & Custom
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
            <label htmlFor="grade" className="block text-mono-body font-semibold mb-3 text-lg flex items-center">
              <FaGraduationCap className="mr-2" />
              Current Education Level
            </label>
            <div className="relative">
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-lg appearance-none cursor-pointer"
                required
              >
                <option value="">Select your education level</option>
                {grades.map((gradeOption) => (
                  <option key={gradeOption.value} value={gradeOption.value} className="py-3 text-lg">
                    {gradeOption.label}
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
            <label htmlFor="experience" className="block text-mono-body font-semibold mb-3 text-lg flex items-center">
              <FaChartBar className="mr-2" />
              Experience Level
            </label>
            <div className="relative">
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-lg appearance-none cursor-pointer"
                required
              >
                <option value="">Select your experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value} className="py-3 text-lg">
                    {level.label}
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
          <label htmlFor="domain" className="block text-mono-body font-semibold mb-3 text-lg flex items-center">
            <FaBullseye className="mr-2" />
            Interested Career Domain (Optional)
          </label>
          <div className="relative">
            <select
              id="domain"
              value={selectedDomain}
              onChange={(e) => handleDomainChange(e.target.value)}
              className="w-full text-lg py-4 px-6 bg-white border-2 border-gray-200 shadow-md focus:border-gray-400 focus:shadow-lg transition-all duration-200 hover:border-gray-300 hover:shadow-lg appearance-none cursor-pointer"
            >
              <option value="">Let AI choose the best domain for me</option>
              {domains.map((domain) => (
                <option key={domain.value} value={domain.value} className="py-3 text-lg">
                  {domain.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-6 h-6 text-mono-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Custom Domain Input */}
          {showCustomDomainInput && (
            <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
              <label htmlFor="customDomain" className="block text-sm font-medium text-purple-800 mb-2">
                Specify your custom career domain:
              </label>
              <input
                id="customDomain"
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="Enter your specific career domain (e.g., Quantum Computing, Space Technology, etc.)"
                className="w-full p-3 border border-purple-300 rounded-md focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              />
              <p className="text-xs text-purple-600 mt-2">
                💡 Tip: Enter a specific career domain that isn't listed above.
              </p>
            </div>
          )}
          
          <p className="text-mono-caption mt-3 text-sm text-mono-grey-600">
            Leave blank to let our AI analyze your interests and choose the best domain
          </p>
        </div>

        {/* Programming Skills Section */}
        <div>
          <label className="block text-mono-body font-medium mb-4 flex items-center">
            <FaLaptopCode className="mr-2" />
            Programming Languages & Technologies
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
          
          {/* Custom Skills Input */}
          {showCustomSkillsInput && (
            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <label htmlFor="customSkills" className="block text-sm font-medium text-blue-800 mb-2">
                Specify your custom skills or technologies:
              </label>
              <textarea
                id="customSkills"
                value={customSkills}
                onChange={(e) => setCustomSkills(e.target.value)}
                placeholder="Enter your skills separated by commas (e.g., AutoCAD, SolidWorks, SAP, etc.)"
                className="w-full p-3 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                rows={3}
              />
              <p className="text-xs text-blue-600 mt-2">
                💡 Tip: Include any specialized tools, software, or technologies you know that aren't listed above.
              </p>
            </div>
          )}
        </div>

        {/* Interests Section */}
        <div>
          <label className="block text-mono-body font-medium mb-4 flex items-center">
            <FaLightbulb className="mr-2" />
            What are your interests and passions?
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
          
          {/* Custom Interests Input */}
          {showCustomInterestsInput && (
            <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg mb-4">
              <label htmlFor="customInterests" className="block text-sm font-medium text-green-800 mb-2">
                Specify your custom interests or passions:
              </label>
              <textarea
                id="customInterests"
                value={customInterests}
                onChange={(e) => setCustomInterests(e.target.value)}
                placeholder="Enter your interests separated by commas (e.g., Sustainable Fashion, Space Exploration, Community Service, etc.)"
                className="w-full p-3 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none"
                rows={3}
              />
              <p className="text-xs text-green-600 mt-2">
                💡 Tip: Include any specific interests, hobbies, or passions that aren't listed above.
              </p>
            </div>
          )}
          
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
          disabled={isLoading || (selectedInterests.length === 0 && !interests.trim() && !customInterests.trim()) || (selectedSkills.length === 0 && !customSkills.trim()) || !grade || !experience}
          className="w-full py-4 px-6 text-lg font-semibold bg-blue-600 text-white border-2 border-blue-600 shadow-lg hover:bg-blue-700 hover:border-blue-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="mono-loader-large"></div>
              <span>Generating your personalized roadmap...</span>
            </div>
          ) : (
            <>
              <FaRocket className="mr-2" />
              Generate My Career Roadmap
            </>
          )}
        </button>
      </form>

    </div>
  );
}

export default CareerForm;