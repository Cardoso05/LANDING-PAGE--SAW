import React from 'react';
import useTypewriter from '../hooks/useTypewriter';
import Wizard from './Wizard';

const HeroSection = () => {
  const headline = 'Descubra Como a Inteligência Artificial Pode Transformar sua Empresa';
  const typedHeadline = useTypewriter(headline, 30);

  return (
    <section className="hero-section section--hero" id="home" lang="pt-BR">
      <div className="container">
        <div className="hero-section__layout">
          <div className="hero-section__content">
            <div className="hero-section__text">
              <h1 className="hero-section__heading">
                {typedHeadline}
                <span className="cursor">|</span>
              </h1>

              <p className="hero-section__subtitle">
                Nós iremos entender como sua empresa funciona e criaremos uma solução personalizada para você.
              </p>

              {/* Wizard de diagnóstico */}
              <Wizard />
            </div>
          </div>
          
          <div className="hero-section__visual">
            <div className="hero-visual-grid">
              {/* Grid de ícones visuais */}
              <div className="hero-visual-item hero-visual-item--chat">
                <div className="visual-icon">💬</div>
                <span>Chat IA</span>
              </div>
              <div className="hero-visual-item hero-visual-item--analytics">
                <div className="visual-icon">📊</div>
                <span>Analytics</span>
              </div>
              <div className="hero-visual-item hero-visual-item--automation">
                <div className="visual-icon">⚡</div>
                <span>Automação</span>
              </div>
              <div className="hero-visual-item hero-visual-item--growth">
                <div className="visual-icon">📈</div>
                <span>Crescimento</span>
              </div>
              <div className="hero-visual-item hero-visual-item--integration">
                <div className="visual-icon">🔗</div>
                <span>Integração</span>
              </div>
              <div className="hero-visual-item hero-visual-item--support">
                <div className="visual-icon">🛠️</div>
                <span>Suporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 