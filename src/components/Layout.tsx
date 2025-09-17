import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VasanthChatbot from './VasanthChatbot';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--mono-white)' }}>
      <header className="glass border-b" style={{ borderColor: 'var(--mono-grey-200)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group">
              <div 
                className="w-8 h-8 flex items-center justify-center shadow-mono group-hover:shadow-mono-lg transition-all duration-200"
                style={{ background: 'var(--mono-black)' }}
              >
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-mono-title">Career Platform</h1>
                <p className="text-mono-caption">Professional development and job opportunities</p>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-2">
              <Link
                to="/"
                className={`px-4 py-2 transition-all duration-200 font-medium text-sm ${
                  location.pathname === '/'
                    ? 'text-white shadow-mono'
                    : 'text-mono-grey-600 hover:text-mono-grey-900 hover:bg-mono-grey-100'
                }`}
                style={location.pathname === '/' ? { background: 'var(--mono-black)' } : {}}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`px-4 py-2 transition-all duration-200 font-medium text-sm ${
                  location.pathname === '/dashboard'
                    ? 'text-white shadow-mono'
                    : 'text-mono-grey-600 hover:text-mono-grey-900 hover:bg-mono-grey-100'
                }`}
                style={location.pathname === '/dashboard' ? { background: 'var(--mono-black)' } : {}}
              >
                Dashboard
              </Link>
              <button
                onClick={() => setIsChatbotOpen(true)}
                className="px-4 py-2 transition-all duration-200 font-medium text-sm text-mono-grey-600 hover:text-mono-grey-900 hover:bg-mono-grey-100 flex items-center space-x-2 group"
              >
                <span className="text-sm group-hover:animate-mono-fade">💬</span>
                <span>Ask Vasanth</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {children}
      </main>
      
      <footer className="mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="text-center">
            <div className="card-mono p-mono-lg max-w-2xl mx-auto">
              <p className="text-mono-caption">
                &copy; 2024 Career Platform. Empowering your professional development.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <VasanthChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
}

export default Layout;