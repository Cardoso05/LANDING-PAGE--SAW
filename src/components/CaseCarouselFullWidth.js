import React, { useState, useEffect, useRef } from 'react';

const CaseCarouselFullWidth = ({ cases = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && cases.length > 1) {
      // Reset progress
      setProgress(0);
      
      // Progress animation
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + (100 / 70); // 70 steps for 7 seconds (100ms intervals)
        });
      }, 100);
      
      // Slide change
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cases.length);
        setProgress(0); // Reset progress when changing slide
      }, 7000);
    } else {
      setProgress(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isHovered, cases.length, currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0); // Reset progress when manually changing slide
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (!cases || cases.length === 0) {
    return null;
  }

  return (
    <section className="case-carousel section--compact" id="cases">
      <div className="container container--narrow">
        <header className="section-header">
          <span className="section-label">Cases de Sucesso</span>
          <h2 className="section-title">Histórias Reais de Transformação</h2>
          <p className="section-subtitle">
            Conheça empresas que já transformaram seus resultados com nossa automação inteligente
          </p>
        </header>
      </div>

      <div 
        className="case-carousel__wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-roledescription="carousel"
        aria-label="Cases de sucesso"
      >
        <div className="case-carousel__track">
          {cases.map((caseItem, index) => (
            <article
              key={index}
              className={`case-slide ${index === currentIndex ? 'case-slide--active' : ''}`}
              role="group"
              aria-label={`Case ${index + 1} de ${cases.length}`}
              id={`case-${index}`}
            >
              <div className="container container--wide">
                <div className="case-slide__layout">
                  <div className="case-slide__content">
                    <div className="case-slide__text">
                      <h3 className="case-slide__title">
                        {caseItem.title}
                      </h3>
                      <p className="case-slide__description">
                        {caseItem.text}
                      </p>
                      <div className="case-slide__meta">
                        <span className="case-slide__category">
                          {caseItem.category || 'Automação Empresarial'}
                        </span>
                        <span className="case-slide__separator">•</span>
                        <span className="case-slide__result">
                          Resultado Comprovado
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="case-slide__visual">
                    <div className="case-slide__image-container">
                      <img
                        src={caseItem.imageUrl}
                                        alt={caseItem.altText || `Case de sucesso ${caseItem.title} - ${caseItem.result}`}
                className="case-slide__image"
                loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="case-slide__overlay" aria-hidden="true"></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation Bullets */}
        {cases.length > 1 && (
          <nav className="case-carousel__nav" aria-label="Navegação de cases">
            <div className="container">
              <ul className="case-bullets">
                {cases.map((_, index) => (
                  <li key={index}>
                    <button
                      className={`case-bullet ${index === currentIndex ? 'case-bullet--active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Ir para case ${index + 1}`}
                      aria-controls={`case-${index}`}
                      type="button"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Progress Bar */}
        <div className="case-carousel__progress" aria-hidden="true">
          <div 
            className="case-carousel__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Screen Reader Status */}
      <div 
        className="case-carousel__sr-status"
        aria-live="polite"
        aria-atomic="true"
      >
        Case {currentIndex + 1} de {cases.length}: {cases[currentIndex]?.title}
      </div>
    </section>
  );
};

export default CaseCarouselFullWidth; 