import React from 'react';
import teks from '../data';

const Testimonials = () => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="teknolab-section" id="sobre">
      <div className="teknolab-container">
        <header className="teknolab-section__header">
          <h2>O que nossos clientes dizem</h2>
          <p>Depoimentos reais de empresas que transformaram seus resultados com o TeknoLab</p>
        </header>
        
        <div className="teknolab-testimonials">
          {teks.testimonials.map((testimonial, index) => (
            <article key={index} className="teknolab-testimonial">
              <blockquote className="teknolab-testimonial__text">
                {testimonial.text}
              </blockquote>
              
              <footer className="teknolab-testimonial__author">
                <div 
                  className="teknolab-testimonial__avatar" 
                  aria-label={`Avatar de ${testimonial.author}`}
                >
                  {getInitials(testimonial.author)}
                </div>
                <div className="teknolab-testimonial__info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 