import React, { useEffect, useRef } from 'react';
import teks from '../data';

const ProcessStepper = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.process-step');
            
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('revealed');
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
    <section className="process-stepper section" id="process" ref={sectionRef}>
      <div className="container container--narrow">
        <header className="section-header">
          <span className="section-label">Metodologia Comprovada</span>
          <h2 className="section-title">{teks.process.title}</h2>
          <p className="section-subtitle">{teks.process.subtitle}</p>
        </header>
        
        <div className="process-stepper__timeline">
          {teks.process.steps.map((step, index) => (
            <article 
              key={index} 
              className="process-step reveal"
              id={`process-step-${index + 1}`}
            >
              <div className="process-step__number" aria-hidden="true">
                {index + 1}
              </div>
              
              <div className="process-step__content">
                <div className="process-step__icon" aria-label={step.title}>
                  {step.icon}
                </div>
                
                <div className="process-step__text">
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__description">{step.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepper; 