import React, { useState, useEffect, useMemo } from 'react';
import teks from '../data';

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = useMemo(() => [
    { id: 'home', label: 'Início' },
    { id: 'benefits', label: 'Benefícios' },
    { id: 'cases', label: 'Cases' },
    { id: 'process', label: 'Processo' },
    { id: 'services', label: 'Serviços' },
    { id: 'faq', label: 'FAQ' }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Scrollspy logic
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`sticky-nav ${isScrolled ? 'sticky-nav--scrolled' : ''}`}
      role="navigation" 
      aria-label="Navegação principal"
    >
      <div className="container">
        <div className="sticky-nav__content">
          <a 
            href="#home" 
            className="sticky-nav__logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            aria-label="TeknoLab - Página inicial"
          >
            {teks.nav.logo}
          </a>
          
          <ul className="sticky-nav__links" role="menubar">
            {navItems.map((item) => (
              <li key={item.id} role="none">
                <button
                  className={`sticky-nav__link ${activeSection === item.id ? 'sticky-nav__link--active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  role="menuitem"
                  aria-label={`Navegar para ${item.label}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="sticky-nav__cta">
            <a
              href="#cta"
              className="btn btn--primary btn--small"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('cta');
              }}
              aria-label="Começar agora"
            >
              Começar
            </a>
          </div>
          
          <button 
            className="sticky-nav__toggle"
            aria-label="Abrir menu de navegação"
            aria-expanded="false"
            aria-controls="nav-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavigation; 