import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId } from './types';

// Components
import Loader from './components/Loader';
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BookVisitModal from './components/BookVisitModal';
import MobileContactBar from './components/MobileContactBar';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import ManagedFarmland from './pages/ManagedFarmland';
import PlainLand from './pages/PlainLand';
import YourJourney from './pages/YourJourney';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import LegalPages from './pages/LegalPages';
import Faqs from './pages/Faqs';
import Testimonials from './pages/Testimonials';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [showTopHeader, setShowTopHeader] = useState(true);

  const handleDismissTopHeader = () => {
    setShowTopHeader(false);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activePage]);

  // Support for /?admin URL
  useEffect(() => {
    if (window.location.search.includes('admin') || window.location.pathname.includes('admin')) {
      const isAuthenticated = sessionStorage.getItem('sk_admin_auth') === 'true';
      if (isAuthenticated) {
        setActivePage('adminDashboard');
      } else {
        setActivePage('adminLogin');
      }
    }
  }, []);

  const handleBookWithProject = (projectName?: string) => {
    if (projectName) {
      setSelectedProject(projectName);
    } else {
      setSelectedProject('');
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-300 antialiased">
      
      {/* 1. Preloader Startup Animation */}
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Website Structure */}
      {!isLoading && (
        <div
          id="root-website-layout"
          className="flex flex-col min-h-screen"
        >
          {/* Hide Navbar and TopHeader on admin routes */}
          {activePage !== 'adminLogin' && activePage !== 'adminDashboard' && (
            <div className="sticky top-0 z-40 w-full flex flex-col shadow-md">
              <Navbar
                activePage={activePage}
                setActivePage={setActivePage}
                onBookClick={() => handleBookWithProject()}
              />
              <AnimatePresence initial={false}>
                {showTopHeader && (
                  <TopHeader
                    onClose={handleDismissTopHeader}
                    onActionClick={() => handleBookWithProject()}
                  />
                )}
              </AnimatePresence>
            </div>
          )}

          <main id="main-content-area" className={`flex-grow pb-12 bg-black ${activePage === 'home' ? 'pt-0' : 'pt-6'}`}>
            <div className="w-full">
              {activePage === 'home' && (
                <Home setActivePage={setActivePage} onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'about' && (
                <AboutUs setActivePage={setActivePage} onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'projects' && (
                <Projects onBookClick={handleBookWithProject} />
              )}
              {activePage === 'managed' && (
                <ManagedFarmland onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'plain' && (
                <PlainLand onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'journey' && (
                <YourJourney onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'gallery' && (
                <Gallery onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'contact' && (
                <Contact onBookClick={() => handleBookWithProject()} />
              )}
              {activePage === 'faqs' && (
                <Faqs setActivePage={setActivePage} />
              )}
              {activePage === 'testimonials' && (
                <Testimonials setActivePage={setActivePage} />
              )}
              {(activePage === 'terms' || activePage === 'privacy' || activePage === 'disclaimer') && (
                <LegalPages viewType={activePage} />
              )}
              {activePage === 'adminLogin' && (
                <AdminLogin setActivePage={setActivePage} />
              )}
              {activePage === 'adminDashboard' && (
                <AdminDashboard setActivePage={setActivePage} />
              )}
            </div>
          </main>

          {/* Contact Section globally rendered above footer (only on home page) */}
          {activePage === 'home' && (
            <div className="border-t border-zinc-900/50 bg-black pt-4">
              <Contact onBookClick={() => handleBookWithProject()} />
            </div>
          )}

          {/* Hide Footer and Widgets on admin routes */}
          {activePage !== 'adminLogin' && activePage !== 'adminDashboard' && (
            <>
              <Footer setActivePage={setActivePage} onBookClick={() => handleBookWithProject()} />
              <WhatsAppButton />
              <MobileContactBar />
            </>
          )}
          
          {/* Site Visit Lead Capture Form Modal */}
          <BookVisitModal
            isOpen={isBookingOpen}
            onClose={() => {
              setIsBookingOpen(false);
              setSelectedProject('');
            }}
            preSelectedProject={selectedProject}
          />
        </div>
      )}

    </div>
  );
}

