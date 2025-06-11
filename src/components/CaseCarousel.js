import React, { useState, useEffect, useRef } from 'react';

const CaseCarousel = ({ cases = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && cases.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cases.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, cases.length]);

  // Handle mouse enter/leave for autoplay pause
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Navigate to specific slide
  const goToSlide = (index) => setCurrentIndex(index);

  // Don't render if no cases
  if (!cases || cases.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#f0f0f0', color: '#333' }}>
        <p>Nenhum case encontrado para exibir</p>
      </div>
    );
  }

  return (
    <section 
      className="case-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Estudos de caso"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="case-carousel__container">
        <div className="case-carousel__viewport">
          <div 
            className="case-carousel__track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cases.map((caseItem, index) => (
              <article
                key={index}
                className={`case-slide ${index === currentIndex ? 'case-slide--active' : ''}`}
                role="group"
                aria-label={`${index + 1} de ${cases.length}`}
                id={`case-slide-${index}`}
              >
                <div className="case-slide__content">
                  <img
                    src={caseItem.imageUrl}
                    alt={caseItem.altText || `Estudo de caso: ${caseItem.title}`}
                    className="case-slide__image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="case-slide__overlay">
                    <div className="case-slide__text">
                      <h3 className="case-slide__title">
                        {caseItem.title}
                      </h3>
                      <p className="case-slide__description">
                        {caseItem.text}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Navigation Bullets */}
        {cases.length > 1 && (
          <nav className="carousel-bullets" aria-label="Navegação do carrossel">
            <ul className="carousel-bullets__list">
              {cases.map((_, index) => (
                <li key={index} className="carousel-bullets__item">
                  <button
                    className={`carousel-bullet ${index === currentIndex ? 'carousel-bullet--active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Vá para slide ${index + 1}`}
                    aria-controls={`case-slide-${index}`}
                    type="button"
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Screen Reader Status */}
      <div 
        className="case-carousel__sr-status"
        aria-live="polite"
        aria-atomic="true"
      >
        Slide {currentIndex + 1} de {cases.length}: {cases[currentIndex]?.title}
      </div>
    </section>
  );
};

export default CaseCarousel; 