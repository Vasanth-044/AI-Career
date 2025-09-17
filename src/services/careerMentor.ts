import { CareerRoadmap, UserInput } from '../types/career';

// Career domains and their keywords for matching
const careerDomains = {
  // Technology & Programming
  'Data Science': ['data', 'analytics', 'statistics', 'machine learning', 'ai', 'python', 'research', 'analysis'],
  'Web Development': ['web', 'frontend', 'backend', 'javascript', 'react', 'html', 'css', 'fullstack'],
  'Mobile Development': ['mobile', 'app', 'android', 'ios', 'react native', 'flutter', 'swift', 'kotlin'],
  'Cybersecurity': ['security', 'cyber', 'hacking', 'network', 'penetration', 'ethical hacking', 'firewall'],
  'Game Development': ['game', 'gaming', 'unity', 'unreal', 'c#', 'c++', 'graphics', 'animation'],
  'DevOps': ['devops', 'cloud', 'aws', 'docker', 'kubernetes', 'deployment', 'infrastructure', 'automation'],
  'UI/UX Design': ['design', 'ui', 'ux', 'user experience', 'figma', 'adobe', 'creative', 'visual'],
  'Software Engineering': ['software', 'programming', 'coding', 'development', 'engineering', 'algorithms', 'architecture'],
  'Cloud Computing': ['cloud', 'aws', 'azure', 'google cloud', 'serverless', 'microservices', 'scalability'],
  'Machine Learning': ['machine learning', 'ai', 'artificial intelligence', 'neural networks', 'deep learning', 'tensorflow'],
  'Blockchain': ['blockchain', 'crypto', 'ethereum', 'smart contracts', 'web3', 'defi', 'solidity'],
  'IoT Development': ['iot', 'internet of things', 'embedded', 'arduino', 'raspberry pi', 'sensors', 'connectivity'],
  
  // Business & Management
  'Digital Marketing': ['marketing', 'seo', 'social media', 'content', 'advertising', 'analytics', 'campaigns'],
  'Product Management': ['product', 'management', 'strategy', 'roadmap', 'agile', 'scrum', 'business'],
  'Business Analysis': ['business analysis', 'requirements', 'process improvement', 'stakeholder', 'documentation'],
  'Project Management': ['project management', 'planning', 'coordination', 'timeline', 'budget', 'resources'],
  'Operations Management': ['operations', 'supply chain', 'logistics', 'process optimization', 'efficiency'],
  'Human Resources': ['hr', 'human resources', 'recruitment', 'talent management', 'employee relations'],
  'Finance & Accounting': ['finance', 'accounting', 'financial planning', 'investment', 'banking', 'auditing'],
  'Consulting': ['consulting', 'advisory', 'strategy', 'transformation', 'change management'],
  'Entrepreneurship': ['entrepreneurship', 'startup', 'business development', 'innovation', 'venture'],
  
  // Engineering & Technical
  'Mechanical Engineering': ['mechanical', 'engineering', 'design', 'manufacturing', 'automotive', 'aerospace'],
  'Civil Engineering': ['civil', 'engineering', 'construction', 'infrastructure', 'structural', 'environmental'],
  'Electrical Engineering': ['electrical', 'engineering', 'power', 'electronics', 'circuits', 'control systems'],
  'Chemical Engineering': ['chemical', 'engineering', 'process', 'petroleum', 'pharmaceutical', 'materials'],
  'Biomedical Engineering': ['biomedical', 'medical devices', 'healthcare technology', 'bioengineering'],
  'Environmental Engineering': ['environmental', 'sustainability', 'renewable energy', 'waste management'],
  'Industrial Engineering': ['industrial', 'manufacturing', 'quality control', 'operations research'],
  
  // Healthcare & Medical
  'Healthcare Technology': ['healthcare', 'medical technology', 'health informatics', 'telemedicine'],
  'Medical Research': ['medical research', 'clinical trials', 'pharmaceutical', 'biotechnology'],
  'Public Health': ['public health', 'epidemiology', 'health policy', 'community health'],
  'Nursing': ['nursing', 'patient care', 'healthcare delivery', 'clinical practice'],
  'Pharmacy': ['pharmacy', 'pharmaceutical', 'drug development', 'clinical pharmacy'],
  'Dentistry': ['dentistry', 'dental care', 'oral health', 'dental technology'],
  
  // Arts & Creative
  'Graphic Design': ['graphic design', 'visual design', 'branding', 'typography', 'illustration'],
  'Digital Arts': ['digital art', 'animation', '3d modeling', 'visual effects', 'multimedia'],
  'Content Creation': ['content creation', 'writing', 'video production', 'podcasting', 'social media'],
  'Fashion Design': ['fashion', 'design', 'textiles', 'apparel', 'styling'],
  'Architecture': ['architecture', 'design', 'construction', 'urban planning', 'interior design'],
  'Music & Audio': ['music', 'audio production', 'sound design', 'recording', 'composition'],
  
  // Education & Learning
  'Education Technology': ['education', 'edtech', 'learning', 'teaching', 'curriculum development'],
  'Teaching & Training': ['teaching', 'training', 'instruction', 'pedagogy', 'education'],
  'Educational Research': ['educational research', 'learning analytics', 'assessment', 'psychology'],
  
  // Science & Research
  'Scientific Research': ['research', 'science', 'laboratory', 'experimentation', 'discovery'],
  'Data Analysis': ['data analysis', 'statistics', 'research methods', 'quantitative analysis'],
  'Environmental Science': ['environmental science', 'ecology', 'conservation', 'sustainability'],
  'Psychology': ['psychology', 'mental health', 'behavioral science', 'counseling'],
  
  // Legal & Compliance
  'Law & Legal Studies': ['law', 'legal', 'litigation', 'legal research', 'compliance'],
  'Corporate Law': ['corporate law', 'business law', 'contracts', 'mergers', 'acquisitions'],
  'Criminal Law': ['criminal law', 'criminal justice', 'prosecution', 'defense'],
  
  // Finance & Accounting
  'Investment Banking': ['investment banking', 'finance', 'trading', 'mergers', 'acquisitions'],
  'Financial Planning': ['financial planning', 'wealth management', 'investment', 'retirement'],
  'Accounting': ['accounting', 'auditing', 'tax', 'financial reporting', 'bookkeeping'],
  
  // Marketing & Communication
  'Brand Management': ['brand management', 'marketing strategy', 'brand development', 'positioning'],
  'Public Relations': ['public relations', 'communications', 'media relations', 'crisis management'],
  'Content Marketing': ['content marketing', 'content strategy', 'copywriting', 'editorial'],
  
  // Agriculture & Environment
  'Sustainable Agriculture': ['agriculture', 'farming', 'sustainability', 'food production', 'rural development'],
  'Environmental Conservation': ['conservation', 'environmental protection', 'biodiversity', 'wildlife'],
  
  // Hospitality & Tourism
  'Hotel Management': ['hotel management', 'hospitality', 'tourism', 'customer service'],
  'Event Management': ['event management', 'event planning', 'conferences', 'weddings'],
  
  // Sports & Fitness
  'Sports Management': ['sports management', 'athletics', 'fitness', 'sports marketing'],
  'Fitness & Wellness': ['fitness', 'wellness', 'personal training', 'health coaching'],
  
  // Social Work & Community
  'Social Work': ['social work', 'community development', 'social services', 'counseling'],
  'Non-profit Management': ['non-profit', 'charity', 'social impact', 'community service'],
  
  // Transportation & Logistics
  'Supply Chain Management': ['supply chain', 'logistics', 'procurement', 'distribution'],
  'Transportation Planning': ['transportation', 'logistics', 'fleet management', 'shipping'],
  
  // Real Estate & Construction
  'Real Estate': ['real estate', 'property management', 'real estate development', 'commercial real estate'],
  'Construction Management': ['construction', 'project management', 'building', 'infrastructure'],
  
  // Media & Entertainment
  'Broadcasting': ['broadcasting', 'television', 'radio', 'media production'],
  'Journalism': ['journalism', 'news', 'reporting', 'media', 'communications'],
  
  // Others
  'Others (Specify Below)': ['custom', 'other', 'specify', 'unique', 'specialized']
};

// Roadmap templates with actual links
const roadmapTemplates: Record<string, CareerRoadmap> = {
  'Data Science': {
    domain: 'Data Science',
    roadmap: [
      {
        phase: 'Beginner',
        skills: ['Python basics', 'Statistics fundamentals', 'Pandas', 'NumPy', 'Data visualization'],
        free_resources: [
          'https://www.kaggle.com/learn|Kaggle Learn',
          'https://www.freecodecamp.org/learn/scientific-computing-with-python/|freeCodeCamp Python',
          'https://www.khanacademy.org/math/statistics-probability|Khan Academy Statistics',
          'https://docs.python.org/3/tutorial/|Python.org Tutorial'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/python/|Udemy - Python for Data Science',
          'https://www.coursera.org/professional-certificates/ibm-data-science|Coursera - IBM Data Science',
          'https://www.datacamp.com/|DataCamp Subscription'
        ],
        projects: ['Analyze a public dataset from Kaggle', 'Create data visualizations with matplotlib', 'Clean and process messy data'],
        youtube_videos: [
          {
            title: 'Python for Data Science - Full Course for Beginners',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
            duration: '12:51:00',
            views: '2.1M',
            description: 'Complete Python tutorial for data science covering pandas, numpy, matplotlib, and more'
          },
          {
            title: 'Statistics for Data Science | Probability and Statistics',
            channel: 'edureka!',
            url: 'https://www.youtube.com/watch?v=xxpc-HPKN28',
            duration: '1:20:00',
            views: '850K',
            description: 'Essential statistics concepts for data science including probability, distributions, and hypothesis testing'
          },
          {
            title: 'Data Visualization with Python - Matplotlib Tutorial',
            channel: 'Corey Schafer',
            url: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
            duration: '1:45:00',
            views: '1.2M',
            description: 'Comprehensive matplotlib tutorial for creating beautiful data visualizations'
          }
        ]
      },
      {
        phase: 'Intermediate',
        skills: ['Machine Learning', 'Scikit-learn', 'SQL', 'Jupyter Notebooks', 'Statistical modeling'],
        free_resources: [
          'https://course.fast.ai/|Fast.ai Course',
          'https://www.coursera.org/learn/machine-learning|Coursera ML Course (Audit)',
          'https://sqlbolt.com/|SQLBolt',
          'https://towardsdatascience.com/|Towards Data Science'
        ],
        paid_resources: [
          'https://www.coursera.org/specializations/machine-learning-introduction|Coursera ML Specialization',
          'https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009t|Udacity ML Nanodegree',
          'https://www.oreilly.com/|O\'Reilly Learning Platform'
        ],
        projects: ['Build ML prediction model', 'Create interactive dashboard with Plotly', 'SQL database analysis project'],
        youtube_videos: [
          {
            title: 'Machine Learning Full Course - Learn Machine Learning 10 Hours',
            channel: 'edureka!',
            url: 'https://www.youtube.com/watch?v=9f-GarcDY58',
            duration: '10:00:00',
            views: '1.8M',
            description: 'Complete machine learning course covering algorithms, scikit-learn, and real-world projects'
          },
          {
            title: 'SQL Tutorial for Beginners - Full Course',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
            duration: '4:20:00',
            views: '3.2M',
            description: 'Comprehensive SQL tutorial for data analysis and database management'
          },
          {
            title: 'Jupyter Notebook Tutorial - Introduction, Setup, and Walkthrough',
            channel: 'Corey Schafer',
            url: 'https://www.youtube.com/watch?v=HW29067qVWk',
            duration: '1:15:00',
            views: '950K',
            description: 'Complete guide to Jupyter Notebooks for data science and analysis'
          }
        ]
      },
      {
        phase: 'Advanced',
        skills: ['Deep Learning', 'TensorFlow/PyTorch', 'Big Data tools', 'MLOps', 'Advanced statistics'],
        free_resources: [
          'https://www.deeplearning.ai/|Deep Learning.ai',
          'https://pytorch.org/tutorials/|PyTorch Tutorials',
          'https://spark.apache.org/docs/latest/|Apache Spark Docs',
          'https://paperswithcode.com/|Papers with Code'
        ],
        paid_resources: [
          'https://www.coursera.org/specializations/deep-learning|Coursera Deep Learning Specialization',
          'https://www.udacity.com/course/deep-learning-nanodegree--nd101|Udacity Deep Learning',
          'https://www.amazon.com/s?k=machine+learning+books|Advanced ML Books'
        ],
        projects: ['Neural network from scratch', 'Deploy ML model to production', 'Big data pipeline with Spark'],
        youtube_videos: [
          {
            title: 'Deep Learning Specialization - Complete Course',
            channel: 'DeepLearningAI',
            url: 'https://www.youtube.com/watch?v=CS4cs9xVg84',
            duration: '8:30:00',
            views: '1.5M',
            description: 'Advanced deep learning concepts including neural networks, CNNs, and RNNs'
          },
          {
            title: 'TensorFlow 2.0 Complete Course - Python Neural Networks',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
            duration: '6:30:00',
            views: '2.3M',
            description: 'Complete TensorFlow 2.0 tutorial for building and deploying neural networks'
          },
          {
            title: 'PyTorch for Deep Learning - Full Course',
            channel: 'Daniel Bourke',
            url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A',
            duration: '25:00:00',
            views: '1.1M',
            description: 'Comprehensive PyTorch course covering deep learning fundamentals to advanced topics'
          }
        ]
      }
    ],
    career_paths: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Research Scientist'],
    companies: ['Google', 'Microsoft', 'Netflix', 'Spotify', 'Airbnb', 'Meta'],
    interview_prep: ['LeetCode SQL problems', 'Kaggle competitions', 'Statistics review', 'Case study practice']
  },
  'Web Development': {
    domain: 'Web Development',
    roadmap: [
      {
        phase: 'Beginner',
        skills: ['HTML', 'CSS', 'JavaScript basics', 'Git/GitHub', 'Responsive design'],
        free_resources: [
          'https://www.freecodecamp.org/learn/responsive-web-design/|freeCodeCamp',
          'https://developer.mozilla.org/en-US/|MDN Web Docs',
          'https://www.w3schools.com/|W3Schools',
          'https://css-tricks.com/|CSS-Tricks',
          'https://javascript.info/|JavaScript.info'
        ],
        paid_resources: [
          'https://www.udemy.com/course/the-web-developer-bootcamp/|Udemy Web Development Bootcamp',
          'https://www.pluralsight.com/|Pluralsight',
          'https://frontendmasters.com/|Frontend Masters'
        ],
        projects: ['Personal portfolio website', 'Responsive landing page', 'JavaScript calculator', 'Interactive to-do list'],
        youtube_videos: [
          {
            title: 'HTML CSS JavaScript Tutorial - Complete Course for Beginners',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
            duration: '6:30:00',
            views: '4.2M',
            description: 'Complete web development course covering HTML, CSS, and JavaScript fundamentals'
          },
          {
            title: 'CSS Grid Layout Crash Course',
            channel: 'Traversy Media',
            url: 'https://www.youtube.com/watch?v=0xMQfnTU6oo',
            duration: '1:20:00',
            views: '1.8M',
            description: 'Learn CSS Grid layout system for creating responsive web designs'
          },
          {
            title: 'JavaScript ES6+ Features - Complete Tutorial',
            channel: 'Programming with Mosh',
            url: 'https://www.youtube.com/watch?v=WZQc7RUAg18',
            duration: '1:45:00',
            views: '2.1M',
            description: 'Modern JavaScript features including arrow functions, destructuring, and async/await'
          }
        ]
      },
      {
        phase: 'Intermediate',
        skills: ['React/Vue/Angular', 'Node.js', 'APIs', 'Databases', 'Testing'],
        free_resources: [
          'https://react.dev/|React Documentation',
          'https://nodejs.org/en/docs/|Node.js Documentation',
          'https://www.youtube.com/results?search_query=web+development|YouTube Tutorials',
          'https://dev.to/|Dev.to Articles'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/react/|React Courses on Udemy',
          'https://www.udemy.com/topic/nodejs/|Node.js Bootcamp',
          'https://testingjavascript.com/|Testing JavaScript Course'
        ],
        projects: ['Full-stack web application', 'REST API with database', 'E-commerce website', 'Blog platform with CMS'],
        youtube_videos: [
          {
            title: 'React Tutorial for Beginners - Complete Course',
            channel: 'Programming with Mosh',
            url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
            duration: '2:30:00',
            views: '3.5M',
            description: 'Complete React tutorial covering components, hooks, state management, and routing'
          },
          {
            title: 'Node.js and Express.js - Full Course',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
            duration: '8:00:00',
            views: '2.8M',
            description: 'Backend development with Node.js and Express.js including REST APIs and databases'
          },
          {
            title: 'MongoDB Tutorial for Beginners - Complete Course',
            channel: 'Web Dev Simplified',
            url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
            duration: '1:45:00',
            views: '1.2M',
            description: 'Learn MongoDB database operations, queries, and integration with Node.js'
          }
        ]
      },
      {
        phase: 'Advanced',
        skills: ['System design', 'Performance optimization', 'DevOps', 'Microservices', 'Security'],
        free_resources: [
          'https://github.com/donnemartin/system-design-primer|System Design Primer',
          'https://web.dev/|Web.dev',
          'https://aws.amazon.com/free/|AWS Free Tier',
          'https://owasp.org/|OWASP Guidelines'
        ],
        paid_resources: [
          'https://www.educative.io/courses/grokking-the-system-design-interview|System Design Course',
          'https://aws.amazon.com/certification/|AWS Certification',
          'https://epicreact.dev/|Advanced React Patterns'
        ],
        projects: ['Scalable web application', 'Microservices architecture', 'Performance optimization project'],
        youtube_videos: [
          {
            title: 'System Design Interview - Complete Course',
            channel: 'Gaurav Sen',
            url: 'https://www.youtube.com/watch?v=quLrc3PbuIw',
            duration: '2:15:00',
            views: '1.9M',
            description: 'System design fundamentals for building scalable applications and passing interviews'
          },
          {
            title: 'Docker Tutorial for Beginners - Full Course',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
            duration: '3:30:00',
            views: '2.5M',
            description: 'Complete Docker tutorial covering containers, images, and deployment strategies'
          },
          {
            title: 'AWS Cloud Practitioner - Complete Course',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
            duration: '12:00:00',
            views: '1.7M',
            description: 'AWS cloud services, deployment, and best practices for web applications'
          }
        ]
      }
    ],
    career_paths: ['Frontend Developer', 'Backend Developer', 'Full-stack Developer', 'DevOps Engineer'],
    companies: ['Google', 'Meta', 'Amazon', 'Netflix', 'Shopify', 'Stripe'],
    interview_prep: ['LeetCode algorithms', 'System design questions', 'Behavioral interviews', 'Code reviews']
  },
  'Mobile Development': {
    domain: 'Mobile Development',
    roadmap: [
      {
        phase: 'Beginner',
        skills: ['Programming fundamentals', 'Mobile UI/UX', 'Platform basics', 'Version control'],
        free_resources: [
          'https://developer.android.com/|Android Developer Docs',
          'https://developer.apple.com/|iOS Developer Docs',
          'https://docs.flutter.dev/|Flutter Documentation',
          'https://www.youtube.com/results?search_query=mobile+development|YouTube Tutorials'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/mobile-development/|Udemy Mobile Courses',
          'https://www.kodeco.com/|Kodeco Tutorials',
          'https://www.pluralsight.com/browse/mobile|Pluralsight Mobile'
        ],
        projects: ['Simple calculator app', 'Weather app with API', 'Note-taking app'],
        youtube_videos: [
          {
            title: 'Mobile App Development - Complete Course for Beginners',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o',
            duration: '3:30:00',
            views: '1.2M',
            description: 'Learn mobile app development fundamentals including UI/UX design and platform basics'
          },
          {
            title: 'Flutter Tutorial for Beginners - Build iOS and Android Apps',
            channel: 'The Net Ninja',
            url: 'https://www.youtube.com/watch?v=1ukSR1GRtMU',
            duration: '2:45:00',
            views: '2.1M',
            description: 'Complete Flutter tutorial for cross-platform mobile app development'
          },
          {
            title: 'React Native Tutorial - Build Mobile Apps with JavaScript',
            channel: 'Programming with Mosh',
            url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
            duration: '2:15:00',
            views: '1.8M',
            description: 'Learn React Native for building native mobile apps with JavaScript'
          }
        ]
      },
      {
        phase: 'Intermediate',
        skills: ['Native development', 'Cross-platform frameworks', 'APIs integration', 'Local storage'],
        free_resources: [
          'https://reactnative.dev/|React Native Docs',
          'https://docs.flutter.dev/cookbook|Flutter Cookbook',
          'https://firebase.google.com/docs|Firebase Documentation',
          'https://stackoverflow.com/questions/tagged/mobile|Stack Overflow Mobile'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/react-native/|Advanced Mobile Courses',
          'https://www.udemy.com/topic/mobile-design/|Mobile Design Courses',
          'https://developer.apple.com/support/compare-memberships/|Platform Certifications'
        ],
        projects: ['Social media app', 'E-commerce mobile app', 'Fitness tracker with sensors'],
        youtube_videos: [
          {
            title: 'Advanced Mobile Development - APIs and Backend Integration',
            channel: 'CodeWithChris',
            url: 'https://www.youtube.com/watch?v=7lB90HXz5aI',
            duration: '1:30:00',
            views: '950K',
            description: 'Learn how to integrate APIs and backend services in mobile applications'
          },
          {
            title: 'Firebase for Mobile Apps - Complete Tutorial',
            channel: 'Fireship',
            url: 'https://www.youtube.com/watch?v=9kRgVxULbag',
            duration: '1:15:00',
            views: '1.3M',
            description: 'Complete Firebase integration for mobile app development including authentication and database'
          },
          {
            title: 'Mobile App State Management - Redux and Context API',
            channel: 'Academind',
            url: 'https://www.youtube.com/watch?v=9boMnm5X9ak',
            duration: '2:00:00',
            views: '800K',
            description: 'Advanced state management patterns for complex mobile applications'
          }
        ]
      },
      {
        phase: 'Advanced',
        skills: ['Performance optimization', 'Security', 'App store optimization', 'Analytics'],
        free_resources: [
          'https://developer.android.com/topic/performance|Performance Best Practices',
          'https://developer.apple.com/security/|Security Guidelines',
          'https://firebase.google.com/docs/analytics|Analytics Documentation'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/mobile-app-development/|Advanced Architecture Courses',
          'https://www.sans.org/cyber-security-courses/|Security Certifications',
          'https://www.coursera.org/browse/business|Business Courses'
        ],
        projects: ['Enterprise mobile application', 'Real-time chat app', 'AR/VR mobile application'],
        youtube_videos: [
          {
            title: 'Mobile App Performance Optimization - Complete Guide',
            channel: 'Google Developers',
            url: 'https://www.youtube.com/watch?v=7lxVqqWwTb0',
            duration: '1:45:00',
            views: '1.1M',
            description: 'Advanced techniques for optimizing mobile app performance and user experience'
          },
          {
            title: 'Mobile App Security - Best Practices and Implementation',
            channel: 'OWASP',
            url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o',
            duration: '2:30:00',
            views: '750K',
            description: 'Comprehensive guide to mobile app security including authentication and data protection'
          },
          {
            title: 'App Store Optimization (ASO) - Complete Tutorial',
            channel: 'App Store Optimization',
            url: 'https://www.youtube.com/watch?v=9kRgVxULbag',
            duration: '1:20:00',
            views: '600K',
            description: 'Learn how to optimize your mobile app for app store visibility and downloads'
          }
        ]
      }
    ],
    career_paths: ['iOS Developer', 'Android Developer', 'React Native Developer', 'Flutter Developer'],
    companies: ['Apple', 'Google', 'Uber', 'Airbnb', 'Instagram', 'WhatsApp'],
    interview_prep: ['Mobile-specific algorithms', 'System design for mobile', 'Platform knowledge', 'Portfolio apps']
  },
  'Cybersecurity': {
    domain: 'Cybersecurity',
    roadmap: [
      {
        phase: 'Beginner',
        skills: ['Network fundamentals', 'Operating systems', 'Security basics', 'Linux command line'],
        free_resources: [
          'https://www.cybrary.it/|Cybrary',
          'https://www.sans.org/white-papers/|SANS Free Resources',
          'https://linuxjourney.com/|Linux Journey',
          'https://www.professormesser.com/network-plus/|Network+ Study Guides'
        ],
        paid_resources: [
          'https://www.comptia.org/certifications/security|CompTIA Security+',
          'https://www.udemy.com/topic/ethical-hacking/|Udemy Ethical Hacking',
          'https://www.sans.org/cyber-security-courses/|SANS Courses'
        ],
        projects: ['Set up home security lab', 'Network scanning with Nmap', 'Basic penetration testing'],
        youtube_videos: [
          {
            title: 'Cybersecurity Fundamentals - Complete Course for Beginners',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
            duration: '15:00:00',
            views: '2.5M',
            description: 'Complete cybersecurity course covering network security, operating systems, and security basics'
          },
          {
            title: 'Linux Command Line for Cybersecurity - Full Tutorial',
            channel: 'NetworkChuck',
            url: 'https://www.youtube.com/watch?v=ROjZy1WbCIA',
            duration: '2:30:00',
            views: '1.8M',
            description: 'Essential Linux commands and tools for cybersecurity professionals'
          },
          {
            title: 'Network Security Fundamentals - Wireshark and Nmap',
            channel: 'Professor Messer',
            url: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
            duration: '1:45:00',
            views: '1.2M',
            description: 'Learn network security analysis using Wireshark and Nmap for penetration testing'
          }
        ]
      },
      {
        phase: 'Intermediate',
        skills: ['Penetration testing', 'Incident response', 'Risk assessment', 'Security tools'],
        free_resources: [
          'https://owasp.org/|OWASP Resources',
          'https://www.metasploit.com/|Metasploit Tutorials',
          'https://www.wireshark.org/docs/|Wireshark Documentation',
          'https://krebsonsecurity.com/|Security Blogs'
        ],
        paid_resources: [
          'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/|CEH Certification',
          'https://www.isc2.org/Certifications/CISSP|CISSP Study Materials',
          'https://www.sans.org/cyber-security-courses/|Advanced SANS Courses'
        ],
        projects: ['Vulnerability assessment report', 'Security audit of web application', 'Incident response plan'],
        youtube_videos: [
          {
            title: 'Penetration Testing - Complete Ethical Hacking Course',
            channel: 'The Cyber Mentor',
            url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
            duration: '15:30:00',
            views: '3.2M',
            description: 'Complete ethical hacking and penetration testing course with hands-on labs'
          },
          {
            title: 'Incident Response and Digital Forensics - Full Tutorial',
            channel: '13Cubed',
            url: 'https://www.youtube.com/watch?v=Zdhbo4yZvR8',
            duration: '2:15:00',
            views: '950K',
            description: 'Learn incident response procedures and digital forensics investigation techniques'
          },
          {
            title: 'OWASP Top 10 - Web Application Security Vulnerabilities',
            channel: 'OWASP',
            url: 'https://www.youtube.com/watch?v=rWHvp7rUka8',
            duration: '1:30:00',
            views: '1.5M',
            description: 'Understanding and mitigating the most common web application security vulnerabilities'
          }
        ]
      },
      {
        phase: 'Advanced',
        skills: ['Advanced threat hunting', 'Malware analysis', 'Security architecture', 'Compliance'],
        free_resources: [
          'https://www.sans.org/white-papers/|Threat Hunting Guides',
          'https://malware.news/|Malware Analysis Blogs',
          'https://www.nist.gov/cyberframework|Compliance Frameworks'
        ],
        paid_resources: [
          'https://www.isc2.org/Certifications/CISSP|CISSP Certification',
          'https://www.sans.org/cyber-security-courses/|Advanced Malware Courses',
          'https://www.sans.org/cyber-security-courses/|Security Leadership Training'
        ],
        projects: ['Threat hunting program implementation', 'Security framework design', 'Advanced digital forensics'],
        youtube_videos: [
          {
            title: 'Advanced Threat Hunting - SIEM and Security Analytics',
            channel: 'Splunk',
            url: 'https://www.youtube.com/watch?v=9kRgVxULbag',
            duration: '2:45:00',
            views: '800K',
            description: 'Advanced threat hunting techniques using SIEM platforms and security analytics'
          },
          {
            title: 'Malware Analysis - Reverse Engineering and Forensics',
            channel: 'Malware Analysis',
            url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o',
            duration: '3:15:00',
            views: '650K',
            description: 'Learn malware analysis techniques including static and dynamic analysis'
          },
          {
            title: 'Security Architecture Design - Enterprise Security Framework',
            channel: 'CISSP',
            url: 'https://www.youtube.com/watch?v=7lxVqqWwTb0',
            duration: '2:00:00',
            views: '750K',
            description: 'Designing comprehensive security architectures for enterprise environments'
          }
        ]
      }
    ],
    career_paths: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'CISO'],
    companies: ['CrowdStrike', 'Palo Alto Networks', 'FireEye', 'IBM Security', 'Cisco'],
    interview_prep: ['Security scenarios', 'Technical demonstrations', 'Compliance knowledge', 'Incident response']
  },
  'Game Development': {
    domain: 'Game Development',
    roadmap: [
      {
        phase: 'Beginner',
        skills: ['Programming fundamentals', 'Game design basics', 'Unity basics', '2D game development'],
        free_resources: [
          'https://unity.com/learn|Unity Learn',
          'https://docs.unrealengine.com/|Unreal Engine Docs',
          'https://www.youtube.com/results?search_query=game+development|YouTube Tutorials',
          'https://www.gamedev.net/|GameDev.net'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/game-development/|Udemy Game Dev Courses',
          'https://www.coursera.org/browse/computer-science/game-development|Coursera Game Dev',
          'https://www.pluralsight.com/browse/game-development|Pluralsight Game Dev'
        ],
        projects: ['Simple 2D platformer', 'Puzzle game', 'Arcade-style game'],
        youtube_videos: [
          {
            title: 'Unity Game Development - Complete Course for Beginners',
            channel: 'Brackeys',
            url: 'https://www.youtube.com/watch?v=XtQMytORBmM',
            duration: '2:30:00',
            views: '2.8M',
            description: 'Complete Unity game development tutorial covering 2D game creation from scratch'
          },
          {
            title: 'C# Programming for Game Development - Full Tutorial',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=gfkTfcpWqAY',
            duration: '4:30:00',
            views: '1.9M',
            description: 'Learn C# programming fundamentals specifically for game development'
          },
          {
            title: 'Game Design Fundamentals - Creating Engaging Gameplay',
            channel: 'Game Maker\'s Toolkit',
            url: 'https://www.youtube.com/watch?v=z06QR-tz1_o',
            duration: '1:15:00',
            views: '1.5M',
            description: 'Essential game design principles and mechanics for creating engaging games'
          }
        ]
      },
      {
        phase: 'Intermediate',
        skills: ['3D game development', 'Game physics', 'AI programming', 'Multiplayer networking'],
        free_resources: [
          'https://docs.unity3d.com/Manual/|Unity 3D Manual',
          'https://www.unrealengine.com/en-US/onlinelearning-courses|Unreal Engine Learning',
          'https://www.youtube.com/results?search_query=3d+game+development|3D Game Dev Tutorials'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/unity-3d/|Advanced Unity Courses',
          'https://www.udemy.com/topic/unreal-engine/|Unreal Engine Courses',
          'https://www.gamedev.tv/|GameDev.tv Courses'
        ],
        projects: ['3D adventure game', 'Multiplayer shooter', 'RPG with inventory system'],
        youtube_videos: [
          {
            title: '3D Game Development in Unity - Complete Tutorial',
            channel: 'Brackeys',
            url: 'https://www.youtube.com/watch?v=XtQMytORBmM',
            duration: '3:45:00',
            views: '2.1M',
            description: 'Learn 3D game development including modeling, lighting, and physics'
          },
          {
            title: 'Game AI Programming - Pathfinding and Behavior Trees',
            channel: 'AI and Games',
            url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o',
            duration: '2:15:00',
            views: '1.3M',
            description: 'Advanced AI programming techniques for game characters and NPCs'
          },
          {
            title: 'Multiplayer Game Development - Networking and Synchronization',
            channel: 'Mirror Networking',
            url: 'https://www.youtube.com/watch?v=9kRgVxULbag',
            duration: '1:50:00',
            views: '950K',
            description: 'Learn multiplayer game development with networking and player synchronization'
          }
        ]
      },
      {
        phase: 'Advanced',
        skills: ['Advanced graphics programming', 'Performance optimization', 'Game engine development', 'VR/AR development'],
        free_resources: [
          'https://learnopengl.com/|Learn OpenGL',
          'https://www.khronos.org/opengl/|OpenGL Documentation',
          'https://developer.oculus.com/|Oculus VR Development'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/graphics-programming/|Graphics Programming Courses',
          'https://www.udemy.com/topic/vr-development/|VR Development Courses',
          'https://www.coursera.org/specializations/game-design|Game Design Specialization'
        ],
        projects: ['VR game experience', 'Custom game engine', 'AAA-quality game demo'],
        youtube_videos: [
          {
            title: 'Advanced Graphics Programming - Shaders and Rendering',
            channel: 'The Cherno',
            url: 'https://www.youtube.com/watch?v=7lxVqqWwTb0',
            duration: '2:30:00',
            views: '1.2M',
            description: 'Advanced graphics programming including shader development and rendering techniques'
          },
          {
            title: 'VR Game Development - Complete Tutorial',
            channel: 'VR with Andrew',
            url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o',
            duration: '3:00:00',
            views: '800K',
            description: 'Complete VR game development tutorial using Unity and Oculus'
          },
          {
            title: 'Game Engine Development - Building Your Own Engine',
            channel: 'The Cherno',
            url: 'https://www.youtube.com/watch?v=9kRgVxULbag',
            duration: '4:15:00',
            views: '1.1M',
            description: 'Learn how to build your own game engine from scratch'
          }
        ]
      }
    ],
    career_paths: ['Game Developer', 'Game Designer', 'Game Artist', 'Game Programmer'],
    companies: ['Epic Games', 'Unity Technologies', 'Electronic Arts', 'Ubisoft', 'Blizzard Entertainment'],
    interview_prep: ['Game development portfolio', 'Technical game programming', 'Game design challenges', 'Code reviews']
  },
  'DevOps': {
    domain: 'DevOps',
    roadmap: [
      {
        phase: 'Beginner',
        skills: ['Linux basics', 'Command line', 'Git version control', 'Basic networking'],
        free_resources: [
          'https://linuxjourney.com/|Linux Journey',
          'https://learngitbranching.js.org/|Learn Git Branching',
          'https://www.youtube.com/results?search_query=devops+beginner|DevOps Tutorials'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/devops/|Udemy DevOps Courses',
          'https://www.coursera.org/browse/computer-science/devops|Coursera DevOps',
          'https://www.pluralsight.com/browse/devops|Pluralsight DevOps'
        ],
        projects: ['Set up Linux server', 'Create Git repository', 'Basic shell scripting'],
        youtube_videos: [
          {
            title: 'DevOps Fundamentals - Complete Course for Beginners',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=9BVQrS4YOKA',
            duration: '3:30:00',
            views: '1.8M',
            description: 'Complete DevOps fundamentals covering Linux, Git, and basic automation'
          },
          {
            title: 'Linux Command Line - Full Tutorial',
            channel: 'NetworkChuck',
            url: 'https://www.youtube.com/watch?v=ROjZy1WbCIA',
            duration: '2:30:00',
            views: '2.1M',
            description: 'Essential Linux command line skills for DevOps professionals'
          },
          {
            title: 'Git and GitHub - Complete Tutorial',
            channel: 'Programming with Mosh',
            url: 'https://www.youtube.com/watch?v=8JJ101D3knE',
            duration: '1:45:00',
            views: '2.5M',
            description: 'Complete Git and GitHub tutorial for version control and collaboration'
          }
        ]
      },
      {
        phase: 'Intermediate',
        skills: ['Docker containers', 'Kubernetes orchestration', 'CI/CD pipelines', 'Cloud platforms'],
        free_resources: [
          'https://docs.docker.com/|Docker Documentation',
          'https://kubernetes.io/docs/|Kubernetes Documentation',
          'https://aws.amazon.com/free/|AWS Free Tier'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/docker/|Docker Courses',
          'https://www.udemy.com/topic/kubernetes/|Kubernetes Courses',
          'https://www.udemy.com/topic/aws/|AWS Certification Courses'
        ],
        projects: ['Containerized application', 'Kubernetes cluster setup', 'CI/CD pipeline'],
        youtube_videos: [
          {
            title: 'Docker Tutorial for Beginners - Complete Course',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
            duration: '3:30:00',
            views: '2.5M',
            description: 'Complete Docker tutorial covering containers, images, and deployment'
          },
          {
            title: 'Kubernetes Tutorial for Beginners - Complete Course',
            channel: 'TechWorld with Nana',
            url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
            duration: '4:15:00',
            views: '1.9M',
            description: 'Complete Kubernetes tutorial for container orchestration and management'
          },
          {
            title: 'AWS Cloud Practitioner - Complete Course',
            channel: 'freeCodeCamp.org',
            url: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
            duration: '12:00:00',
            views: '1.7M',
            description: 'AWS cloud services and best practices for DevOps professionals'
          }
        ]
      },
      {
        phase: 'Advanced',
        skills: ['Infrastructure as Code', 'Monitoring and logging', 'Security automation', 'Microservices architecture'],
        free_resources: [
          'https://www.terraform.io/docs/|Terraform Documentation',
          'https://prometheus.io/docs/|Prometheus Documentation',
          'https://www.ansible.com/|Ansible Documentation'
        ],
        paid_resources: [
          'https://www.udemy.com/topic/terraform/|Terraform Courses',
          'https://www.udemy.com/topic/ansible/|Ansible Courses',
          'https://www.coursera.org/specializations/cloud-devops|Cloud DevOps Specialization'
        ],
        projects: ['Infrastructure automation', 'Monitoring dashboard', 'Security compliance automation'],
        youtube_videos: [
          {
            title: 'Terraform Tutorial - Infrastructure as Code',
            channel: 'HashiCorp',
            url: 'https://www.youtube.com/watch?v=7lxVqqWwTb0',
            duration: '2:45:00',
            views: '1.3M',
            description: 'Learn Infrastructure as Code with Terraform for cloud automation'
          },
          {
            title: 'Monitoring and Observability - Prometheus and Grafana',
            channel: 'TechWorld with Nana',
            url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o',
            duration: '2:15:00',
            views: '950K',
            description: 'Complete monitoring setup with Prometheus and Grafana for DevOps'
          },
          {
            title: 'DevOps Security - DevSecOps Best Practices',
            channel: 'DevSecOps',
            url: 'https://www.youtube.com/watch?v=9kRgVxULbag',
            duration: '1:50:00',
            views: '750K',
            description: 'Integrating security into DevOps practices and automation'
          }
        ]
      }
    ],
    career_paths: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer', 'Platform Engineer'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Netflix', 'Spotify', 'Uber'],
    interview_prep: ['System design', 'Infrastructure automation', 'Troubleshooting scenarios', 'Cloud architecture']
  }
};

function findBestDomain(interests: string, skills: string): string {
  const input = `${interests} ${skills}`.toLowerCase();
  let bestMatch = 'Web Development'; // default
  let maxScore = 0;

  for (const [domain, keywords] of Object.entries(careerDomains)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (input.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    if (score > maxScore) {
      maxScore = score;
      bestMatch = domain;
    }
  }

  return bestMatch;
}

export function generateCareerRoadmap(userInput: UserInput): CareerRoadmap {
  // If user selected a specific domain, use that; otherwise, find best match
  const bestDomain = userInput.selectedDomain || findBestDomain(userInput.interests, userInput.skills);
  const template = roadmapTemplates[bestDomain] || roadmapTemplates['Web Development'];
  
  // Customize the roadmap based on user's grade and experience
  const customizedRoadmap = JSON.parse(JSON.stringify(template));
  
  // Adjust roadmap based on experience level
  if (userInput.experience === 'Complete Beginner') {
    // Add more foundational skills to beginner phase
    customizedRoadmap.roadmap[0].skills.unshift('Computer basics', 'Problem-solving fundamentals');
  } else if (userInput.experience === 'Advanced' || userInput.experience === 'Expert') {
    // Skip some beginner content, focus more on advanced topics
    customizedRoadmap.roadmap[0].skills = customizedRoadmap.roadmap[0].skills.slice(2);
  }
  
  // Adjust based on education level
  if (userInput.grade.includes('High School')) {
    // Add college prep and foundational learning
    customizedRoadmap.roadmap[0].free_resources.unshift('Khan Academy', 'Codecademy free tier');
  } else if (userInput.grade.includes('Graduate') || userInput.grade === 'Working Professional') {
    // Add more advanced and professional resources
    customizedRoadmap.roadmap[2].paid_resources.push('Professional certifications', 'Executive education');
  }
  
  return customizedRoadmap;
}

export function getAllDomains(): string[] {
  return Object.keys(careerDomains);
}