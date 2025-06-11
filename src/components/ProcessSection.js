import React, { useEffect, useRef } from 'react';
import teks from '../data';

const ProcessSection = () => {
  const stepperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.teknolab-process-step');
            
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('animate-in');
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = stepperRef.current;
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
    <section className="teknolab-section teknolab-process" id="process" lang="pt-BR">
      <div className="teknolab-container">
        <header className="teknolab-section__header">
          <h2>{teks.process.title}</h2>
          <p>{teks.process.subtitle}</p>
        </header>
        
        <div className="teknolab-process__zigzag" ref={stepperRef}>
          <div className="teknolab-process__timeline-line" aria-hidden="true"></div>
          {teks.process.steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const stepNumber = index + 1;
            
            return (
              <article 
                key={index} 
                className={`teknolab-process-step ${isEven ? 'teknolab-process-step--left' : 'teknolab-process-step--right'}`}
                id={`process-step-${stepNumber}`}
              >
                <div className="teknolab-process-step__content">
                  <div className="teknolab-process-step__icon" aria-label={step.title}>
                    {step.icon}
                  </div>
                  <div className="teknolab-process-step__text">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
                <div className="teknolab-process-step__number" aria-hidden="true">
                  {stepNumber}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 