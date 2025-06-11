import React, { useState } from 'react';

const TekBenefits = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const benefits = [
    {
      id: 'proativo',
      icon: '🔔',
      title: 'Atendimento Proativo',
      desc: 'IA que notifica e inicia conversas no momento ideal para cada lead.',
      kpi: '+20% de follow-ups'
    },
    {
      id: 'eficiencia',
      icon: '⚙️',
      title: 'Eficiência Operacional',
      desc: 'Automatize tarefas repetitivas e reduza custos de atendimento em até 40%.',
      kpi: '–40% nos custos'
    },
    {
      id: 'dados',
      icon: '📊',
      title: 'Decisões Guiadas por Dados',
      desc: 'Painel customizável com alertas em tempo real que impulsionam seu crescimento.',
      kpi: '+15% no ticket médio'
    }
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section className="tek-benefits" role="region" aria-labelledby="benefits-title">
      <div className="teknolab-container">
        <header className="teknolab-section__header">
          <h2 id="benefits-title">Por que escolher o TeknoLab</h2>
        </header>

        {/* Tabs Navigation */}
        <nav className="benefits-tabs" role="tablist" aria-label="Benefícios do TeknoLab">
          <div className="benefits-tabs__nav">
            {benefits.map((benefit, index) => (
              <button
                key={benefit.id}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`benefit-panel-${index}`}
                id={`benefit-tab-${index}`}
                className={`benefit-tab ${activeTab === index ? 'benefit-tab--active' : ''}`}
                onClick={() => handleTabClick(index)}
                type="button"
              >
                <span className="benefit-tab__icon" aria-hidden="true">
                  {benefit.icon}
                </span>
                <span className="benefit-tab__label">
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
              className={`benefit-item ${activeTab === index ? 'benefit-item--active' : ''}`}
              hidden={activeTab !== index}
            >
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  {benefit.icon}
                </div>
                <h3 className="benefit-title">
                  {benefit.title}
                </h3>
                <p className="benefit-desc">
                  {benefit.desc}
                </p>
                <span className="benefit-kpi">
                  {benefit.kpi}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TekBenefits; 