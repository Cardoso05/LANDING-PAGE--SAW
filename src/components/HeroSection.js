import React, { useState, useEffect } from 'react';
import useTypewriter from '../hooks/useTypewriter';
import Wizard from './Wizard';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentHeadline, setCurrentHeadline] = useState('Descubra Como a Inteligência Artificial Pode Transformar sua Empresa');
  
  const typedHeadline = useTypewriter(currentHeadline, 30);

  // Após 5 segundos, muda para pergunta de seleção
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedArea) {
        setCurrentHeadline('Escolha a área que mais te interessa para começarmos');
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [selectedArea]);

  const areas = [
    { id: 'chat', icon: '💬', label: 'Chat IA', description: 'Atendimento automatizado' },
    { id: 'analytics', icon: '📊', label: 'Analytics', description: 'Análise de dados' },
    { id: 'automation', icon: '⚡', label: 'Automação', description: 'Processos automáticos' },
    { id: 'growth', icon: '📈', label: 'Crescimento', description: 'Expansão de vendas' },
    { id: 'integration', icon: '🔗', label: 'Integração', description: 'Conectar sistemas' },
    { id: 'support', icon: '🛠️', label: 'Suporte', description: 'Assistência técnica' }
  ];

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setCurrentHeadline(`Perfeito! Vamos criar uma solução de ${area.label} para você`);
  };

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
              <Wizard selectedArea={selectedArea} />
            </div>
          </div>
          
          <div className="hero-section__visual">
            <div className="hero-visual-grid">
              {areas.map((area) => (
                <button
                  key={area.id}
                  className={`hero-visual-item hero-visual-item--${area.id} ${styles.heroVisualItem} ${
                    selectedArea?.id === area.id ? `hero-visual-item--selected ${styles.selected}` : ''
                  }`}
                  onClick={() => handleAreaSelect(area)}
                  aria-label={`Selecionar ${area.label}: ${area.description}`}
                >
                  <div className={`visual-icon ${styles.visualIcon}`}>{area.icon}</div>
                  <span>{area.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 