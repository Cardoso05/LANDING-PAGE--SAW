import React, { useState } from 'react';
import teks from '../data';

const HeroSection = () => {
  const [wizardInput, setWizardInput] = useState('');

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    if (wizardInput.trim()) {
      // Integração com analytics (Google Analytics, Facebook Pixel, etc.)
      // gtag('event', 'lead_capture', { problem: wizardInput });
      
      // Redirecionar para WhatsApp
      const message = encodeURIComponent(`Olá! Gostaria de conversar sobre: ${wizardInput}`);
      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
    }
  };

  return (
    <section className="hero-section section--hero" id="home">
      <div className="container">
        <div className="hero-section__layout">
          <div className="hero-section__content">
            <div className="hero-section__text">
              <h1 className="hero-section__title">
                {teks.hero.heading}
              </h1>
              <p className="hero-section__subtitle">
                {teks.hero.subheading}
              </p>
              
              {/* Mini-wizard de diagnóstico */}
              <div className="hero-wizard">
                <form onSubmit={handleWizardSubmit} className="hero-wizard__form">
                  <div className="hero-wizard__group">
                    <input
                      type="text"
                      className="hero-wizard__input"
                      placeholder="Qual o maior problema na sua empresa?"
                      value={wizardInput}
                      onChange={(e) => setWizardInput(e.target.value)}
                      aria-label="Descreva o maior problema da sua empresa"
                      required
                    />
                    <button 
                      type="submit" 
                      className="btn btn--primary hero-wizard__btn"
                      disabled={!wizardInput.trim()}
                    >
                      Continuar →
                    </button>
                  </div>
                </form>
                <p className="hero-wizard__help">
                  💡 Responda em poucas palavras e receba uma análise gratuita
                </p>
              </div>
            </div>
          </div>
          
          <div className="hero-section__visual">
            <div className="hero-visual-grid">
              {/* Grid de ícones visuais */}
              <div className="hero-visual-item hero-visual-item--chat">
                <div className="visual-icon">💬</div>
                <span>Chat IA</span>
              </div>
              <div className="hero-visual-item hero-visual-item--analytics">
                <div className="visual-icon">📊</div>
                <span>Analytics</span>
              </div>
              <div className="hero-visual-item hero-visual-item--automation">
                <div className="visual-icon">⚡</div>
                <span>Automação</span>
              </div>
              <div className="hero-visual-item hero-visual-item--growth">
                <div className="visual-icon">📈</div>
                <span>Crescimento</span>
              </div>
              <div className="hero-visual-item hero-visual-item--integration">
                <div className="visual-icon">🔗</div>
                <span>Integração</span>
              </div>
              <div className="hero-visual-item hero-visual-item--support">
                <div className="visual-icon">🛠️</div>
                <span>Suporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 