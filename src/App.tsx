import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import BrandDashboardPage from './pages/BrandDashboardPage';
import FitEnginePage from './pages/FitEnginePage';
import DiscoverPage from './pages/DiscoverPage';
import RequestsPage from './pages/RequestsPage';
import ExportsPage from './pages/ExportsPage';
import SettingsPage from './pages/SettingsPage';
import NewAnalysisModal from './components/NewAnalysisModal';

type Page = 'landing' | 'dashboard' | 'brand-dashboard' | 'fit-engine' | 'discover' | 'requests' | 'exports' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const navigate = (page: string) => {
    const validPages: Record<string, Page> = {
      landing: 'landing',
      dashboard: 'dashboard',
      'brand-dashboard': 'brand-dashboard',
      'fit-engine': 'fit-engine',
      discover: 'discover',
      requests: 'requests',
      exports: 'exports',
      settings: 'settings',
    };
    setCurrentPage(validPages[page] || 'landing');
    window.scrollTo(0, 0);
  };

  const openAnalysis = () => setShowAnalysisModal(true);
  const closeAnalysis = () => setShowAnalysisModal(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} onNewAnalysis={openAnalysis} />;
      case 'brand-dashboard':
        return <BrandDashboardPage onNavigate={navigate} />;
      case 'fit-engine':
        return <FitEnginePage onNavigate={navigate} onNewAnalysis={openAnalysis} />;
      case 'discover':
        return <DiscoverPage onNavigate={navigate} onNewAnalysis={openAnalysis} />;
      case 'requests':
        return <RequestsPage onNavigate={navigate} onNewAnalysis={openAnalysis} />;
      case 'exports':
        return <ExportsPage onNavigate={navigate} onNewAnalysis={openAnalysis} />;
      case 'settings':
        return <SettingsPage onNavigate={navigate} onNewAnalysis={openAnalysis} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <>
      {renderPage()}
      {showAnalysisModal && (
        <NewAnalysisModal onClose={closeAnalysis} onNavigate={(page) => { closeAnalysis(); navigate(page); }} />
      )}
    </>
  );
}

export default App;
