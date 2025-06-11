import React, { useEffect, useRef } from 'react';
import teks from '../data';

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.accordion-item');
            
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="teknolab-section teknolab-services-accordion" id="services" lang="pt-BR">
      <div className="teknolab-container">
        <header className="teknolab-section__header">
          <h2>{teks.services.title}</h2>
          <p>{teks.services.subtitle}</p>
        </header>
        
        <div className="accordion-wrapper" ref={sectionRef}>
          {teks.services.items.map((service, index) => (
            <div
              key={index}
              className="accordion-item"
              style={{
                backgroundImage: `url(${service.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="accordion-toggle">
                <span 
                  className="accordion-icon" 
                  role="img" 
                  aria-label={`Ícone de ${service.name}`}
                >
                  {service.icon}
                </span>
                <span className="vertical-text">
                  {service.name}
                </span>
              </div>

              <div
                className="accordion-panel"
                id={`panel-${index}`}
                role="region"
              >
                <div className="accordion-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>

              <div className="accordion-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 