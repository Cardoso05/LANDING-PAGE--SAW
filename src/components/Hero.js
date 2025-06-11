import React from 'react';
import teks from '../data';

const Hero = () => {
  return (
    <section className="teknolab-hero" id="home">
      <div className="teknolab-container">
        <div className="teknolab-hero__layout">
          <div className="teknolab-hero__content">
            <h1>{teks.hero.heading}</h1>
            <p className="teknolab-hero__subtitle">
              {teks.hero.subheading}
            </p>
            
            <div className="teknolab-hero__ctas">
              {teks.hero.ctas.map((cta, index) => (
                <a
                  key={index}
                  href={index === 0 ? "#signup" : "#saiba-mais"}
                  className={`teknolab-btn ${index === 0 ? 'teknolab-btn--primary' : 'teknolab-btn--outline'}`}
                  aria-label={cta}
                >
                  {cta}
                </a>
              ))}
            </div>
          </div>
          
          {/* Gráficos visuais como na referência */}
          <div className="teknolab-hero__charts">
            {/* Gráfico de Barras */}
            <div className="teknolab-chart teknolab-chart--bar">
              <div className="bar-chart">
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar" style={{height: '40%'}}></div>
                <div className="bar" style={{height: '90%'}}></div>
                <div className="bar" style={{height: '70%'}}></div>
                <div className="bar" style={{height: '50%'}}></div>
              </div>
            </div>

            {/* Gráfico de Pizza */}
            <div className="teknolab-chart teknolab-chart--donut">
              <div className="donut-chart">
                <div className="donut-segment donut-segment--primary"></div>
                <div className="donut-segment donut-segment--secondary"></div>
                <div className="donut-segment donut-segment--tertiary"></div>
              </div>
            </div>

            {/* Gráfico de Linha */}
            <div className="teknolab-chart teknolab-chart--line">
              <div className="line-chart">
                <svg viewBox="0 0 200 80" className="line-svg">
                  <polyline 
                    points="10,60 30,40 50,50 70,30 90,45 110,25 130,35 150,20 170,30 190,15"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="line-solid"
                  />
                  <polyline 
                    points="10,65 30,50 50,55 70,45 90,55 110,40 130,50 150,35 170,45 190,25"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                    className="line-dashed"
                  />
                </svg>
              </div>
            </div>

            {/* Gráfico de Barras Verticais */}
            <div className="teknolab-chart teknolab-chart--vertical">
              <div className="vertical-chart">
                <div className="v-bar" style={{height: '70%'}}></div>
                <div className="v-bar" style={{height: '100%'}}></div>
                <div className="v-bar" style={{height: '45%'}}></div>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default Hero; 