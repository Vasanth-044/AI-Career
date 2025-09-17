import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VasanthChatbot from './VasanthChatbot';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const headerRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50">
      <header 
        ref={headerRef}
        className="glass-primary border-b border-primary-200 sticky top-0 z-50 scroll-reveal"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-6">
            <Link 
              to="/" 
              className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-primary rounded-xl shadow-modern-lg group-hover:shadow-glow-lg transition-all duration-300 group-hover:rotate-3">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-title text-gradient">Career Platform</h1>
                <p className="text-caption text-neutral-600">Professional development and job opportunities</p>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-3">
              <Link
                to="/"
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50 hover:scale-105'
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  location.pathname === '/dashboard'
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50 hover:scale-105'
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => setIsChatbotOpen(true)}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
              >
                <span className="text-lg group-hover:animate-bounce">💬</span>
                <span>Ask Vasanth</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {children}
      </main>
      
      <footer className="mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="text-center">
            <div className="card-glass p-xl max-w-2xl mx-auto">
              <p className="text-caption text-neutral-600">
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