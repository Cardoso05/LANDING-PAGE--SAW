import React, { Suspense, lazy } from 'react';
import './styles.css';
import './components/RefactoredLanding.css';

// Teste de deploy automático
import teks from './data';

// Lazy loading dos componentes não críticos
const StickyNavigation = lazy(() => import('./components/StickyNavigation'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const BenefitsTabs = lazy(() => import('./components/BenefitsTabs'));
const CaseCarouselFullWidth = lazy(() => import('./components/CaseCarouselFullWidth'));
const ProcessStepper = lazy(() => import('./components/ProcessStepper'));
const ServicesAccordion = lazy(() => import('./components/ServicesAccordion'));
const CTABanner = lazy(() => import('./components/CTABanner'));
const FAQWithSearch = lazy(() => import('./components/FAQWithSearch'));
const FooterNewsletter = lazy(() => import('./components/FooterNewsletter'));

function App() {
  // Console log para testar deploy automático
  console.log('🚀 Deploy automático funcionando! Versão:', new Date().toISOString());
  console.log('✅ GitHub Actions → VPS → Container Docker → Site Live!');
  console.log('🧪 Teste de deploy automático - verificando funcionalidade');
  
  return (
    <div className="App" id="app">
      <Suspense fallback={<div className="loading-fallback">Carregando navegação...</div>}>
        <StickyNavigation />
      </Suspense>
      
      <main role="main">
        <Suspense fallback={<div className="loading-fallback">Carregando...</div>}>
          <HeroSection />
          <BenefitsTabs />
          <CaseCarouselFullWidth cases={teks.cases.items} />
          <ProcessStepper />
          <ServicesAccordion />
          <CTABanner />
          <FAQWithSearch />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="loading-fallback">Carregando rodapé...</div>}>
        <FooterNewsletter />
      </Suspense>
    </div>
  );
}

export default App; 