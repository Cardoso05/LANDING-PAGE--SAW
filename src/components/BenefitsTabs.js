import React, { useState, useEffect } from 'react';

const BenefitsTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const benefits = [
    {
      id: 'proativo',
      icon: '🔔',
      title: 'Atendimento Proativo',
      description: 'IA que notifica e inicia conversas no momento ideal para cada lead, maximizando oportunidades.',
      kpi: '+20% de follow-ups',
      details: [
        'Detecção automática de momentos ideais',
        'Mensagens personalizadas por perfil',
        'Integração com CRM e dados comportamentais'
      ]
    },
    {
      id: 'eficiencia',
      icon: '⚙️',
      title: 'Eficiência Operacional',
      description: 'Automatize tarefas repetitivas e reduza custos de atendimento em até 40% mantendo qualidade.',
      kpi: '–40% nos custos',
      details: [
        'Automação de respostas frequentes',
        'Fluxos inteligentes de qualificação',
        'Redução de tempo de resposta'
      ]
    },
    {
      id: 'dados',
      icon: '📊',
      title: 'Decisões Guiadas por Dados',
      description: 'Painel customizável com alertas em tempo real que impulsionam seu crescimento estratégico.',
      kpi: '+15% no ticket médio',
      details: [
        'Analytics em tempo real',
        'Insights de comportamento do cliente',
        'Relatórios automatizados personalizados'
      ]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, benefits.length]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="benefits-tabs section" id="benefits">
      <div className="container container--narrow">
        <header className="section-header">
          <span className="section-label">Vantagens Competitivas</span>
          <h2 className="section-title">Por que escolher o TeknoLab</h2>
          <p className="section-subtitle">
            Conheça os 3 pilares que fazem nossa solução transformar completamente seus resultados
          </p>
        </header>

        {/* Tabs Navigation */}
        <nav className="benefits-nav" role="tablist" aria-label="Benefícios do TeknoLab">
          <div className="benefits-nav__wrapper">
            {benefits.map((benefit, index) => (
              <button
                key={benefit.id}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`benefit-panel-${index}`}
                id={`benefit-tab-${index}`}
                className={`benefit-nav-tab ${activeTab === index ? 'benefit-nav-tab--active' : ''}`}
                onClick={() => handleTabClick(index)}
                type="button"
              >
                <span className="benefit-nav-tab__icon" aria-hidden="true">
                  {benefit.icon}
                </span>
                <span className="benefit-nav-tab__label">
                  {benefit.title}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tabs Content */}
        <div className="benefits-content">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              role="tabpanel"
              id={`benefit-panel-${index}`}
              aria-labelledby={`benefit-tab-${index}`}
              className={`benefit-panel ${activeTab === index ? 'benefit-panel--active' : ''}`}
              hidden={activeTab !== index}
            >
              <article className="benefit-card">
                <div className="benefit-card__icon" aria-hidden="true">
                  {benefit.icon}
                </div>
                
                <div className="benefit-card__content">
                  <h3 className="benefit-card__title">
                    {benefit.title}
                  </h3>
                  
                  <p className="benefit-card__description">
                    {benefit.description}
                  </p>
                  
                  <ul className="benefit-card__details">
                    {benefit.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="benefit-detail">
                        <span className="benefit-detail__check" aria-hidden="true">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="benefit-card__kpi">
                    <span className="benefit-kpi-badge">
                      {benefit.kpi}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="benefits-progress" aria-hidden="true">
          {benefits.map((_, index) => (
            <div
              key={index}
              className={`benefits-progress__dot ${activeTab === index ? 'benefits-progress__dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsTabs; 