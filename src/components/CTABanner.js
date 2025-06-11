import React, { useState, useEffect } from 'react';

const CTABanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show CTA when user scrolled 60% of the page
      const scrollPercentage = scrollTop / (documentHeight - windowHeight);
      setIsVisible(scrollPercentage > 0.6);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de conversar sobre automação para minha empresa.');
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className={`cta-banner ${isVisible ? 'cta-banner--visible' : ''}`} id="cta">
      <div className="container">
        <div className="cta-banner__content">
          <div className="cta-banner__text">
            <h3 className="cta-banner__title">
              Pronto para transformar seu atendimento?
            </h3>
            <p className="cta-banner__subtitle">
              Converse conosco e descubra como automatizar sua empresa em 30 dias
            </p>
          </div>
          
          <div className="cta-banner__actions">
            <button 
              className="btn btn--primary btn--large cta-banner__btn"
              onClick={handleWhatsAppClick}
              aria-label="Falar no WhatsApp"
            >
              <span className="cta-banner__btn-icon">📱</span>
              Falar no WhatsApp
            </button>
            
            <div className="cta-banner__guarantee">
              <span className="cta-banner__guarantee-icon">✓</span>
              <span>Análise gratuita • Sem compromisso</span>
            </div>
          </div>
        </div>
        
        <button 
          className="cta-banner__close"
          onClick={() => setIsVisible(false)}
          aria-label="Fechar banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CTABanner; 