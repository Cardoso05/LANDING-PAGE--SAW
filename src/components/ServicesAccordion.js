import React, { useState } from 'react';
import teks from '../data';

const ServicesAccordion = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <section className="services-accordion section" id="services">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Soluções Completas</span>
          <h2 className="section-title">{teks.services.title}</h2>
          <p className="section-subtitle">{teks.services.subtitle}</p>
        </header>
        
        <div className="services-accordion__wrapper">
          {teks.services.items.map((service, index) => (
            <article
              key={index}
              className={`service-accordion-item ${expandedItem === index ? 'service-accordion-item--expanded' : ''}`}
            >
              <button
                className="service-accordion__trigger"
                onClick={() => toggleItem(index)}
                aria-expanded={expandedItem === index}
                aria-controls={`service-panel-${index}`}
                id={`service-trigger-${index}`}
              >
                <div className="service-accordion__header">
                  <span className="service-accordion__icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3 className="service-accordion__title">
                    {service.title}
                  </h3>
                  <span className="service-accordion__arrow" aria-hidden="true">
                    ↓
                  </span>
                </div>
              </button>

              <div
                className="service-accordion__panel"
                id={`service-panel-${index}`}
                aria-labelledby={`service-trigger-${index}`}
                role="region"
              >
                <div className="service-accordion__content">
                  <p className="service-accordion__description">
                    {service.desc}
                  </p>
                  
                  <div className="service-accordion__features">
                    <h4>Principais recursos:</h4>
                    <ul>
                      <li>Implementação personalizada</li>
                      <li>Suporte técnico especializado</li>
                      <li>Treinamento da equipe</li>
                      <li>Monitoramento 24/7</li>
                    </ul>
                  </div>
                  
                  <div className="service-accordion__cta">
                    <a href="#cta" className="btn btn--outline">
                      Saiba mais
                    </a>
                  </div>
                </div>
                
                {service.bgImage && (
                  <div 
                    className="service-accordion__bg"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion; 