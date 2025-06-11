import React from 'react';
import teks from '../data';

const FAQ = () => {
  return (
    <section className="teknolab-section" id="contato">
      <div className="teknolab-container">
        <header className="teknolab-section__header">
          <h2>{teks.faq.sectionTitle}</h2>
          <p>{teks.faq.sectionDesc}</p>
        </header>
        
        <div className="teknolab-faq">
          {teks.faq.items.map((item, index) => (
            <div key={index} className="teknolab-faq__item">
              <button 
                className="teknolab-faq__question"
                aria-expanded="false"
                aria-controls={`faq-answer-${index}`}
              >
                {item.question}
                <span aria-hidden="true">+</span>
              </button>
              <div 
                id={`faq-answer-${index}`}
                className="teknolab-faq__answer"
                style={{display: 'none'}}
              >
                {/* Conteúdo das respostas pode ser adicionado aqui */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 