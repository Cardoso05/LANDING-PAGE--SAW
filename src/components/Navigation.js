import React from 'react';
import teks from '../data';

const Navigation = () => {
  return (
    <nav className="teknolab-nav" role="navigation" aria-label="Navegação principal">
      <div className="teknolab-container teknolab-nav__container">
        <a 
          href="#home" 
          id="nav-logo" 
          aria-label="TeknoLab - Página inicial"
        >
          {teks.nav.logo}
        </a>
        
        <ul className="teknolab-nav__links" role="menubar">
          {teks.nav.links.map((link, index) => (
            <li key={index} role="none">
              <a 
                href={`#${link.toLowerCase()}`}
                className="teknolab-nav__link"
                role="menuitem"
                aria-label={`Navegar para ${link}`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="teknolab-nav__buttons">
          {teks.nav.buttons.map((button, index) => (
            <a
              key={index}
              href="#signup"
              className="teknolab-btn teknolab-btn--primary"
              aria-label={button}
            >
              {button}
            </a>
          ))}
        </div>
        
        <button 
          className="teknolab-nav__toggle"
          aria-label="Abrir menu de navegação"
          aria-expanded="false"
          aria-controls="nav-menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 