import React, { useState } from 'react';
import teks from '../data';

const FAQWithSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Extended FAQ data
  const faqData = [
    {
      question: "O que é o TeknoLab?",
      answer: "O TeknoLab é uma plataforma de automação de IA humanizada que transforma seus processos de atendimento no WhatsApp e Direct. Criamos soluções personalizadas que automatizam conversas mantendo um tom natural e humano."
    },
    {
      question: "Quem pode se beneficiar do TeknoLab?",
      answer: "Empresas de todos os portes que desejam automatizar seu atendimento, desde pequenos negócios até grandes corporações. Especialmente útil para e-commerce, clínicas, imobiliárias, escolas e prestadores de serviços."
    },
    {
      question: "Como funciona a implementação?",
      answer: "Nosso processo é simples: 1) Diagnóstico da sua operação atual, 2) Análise de viabilidade e ROI, 3) Prova de conceito, 4) Implementação ágil em produção, 5) Otimização contínua com revisões quinzenais."
    },
    {
      question: "Quanto tempo leva para implementar?",
      answer: "O processo completo varia de 15 a 30 dias, dependendo da complexidade. A prova de conceito fica pronta em 7 dias e você já pode ver os primeiros resultados."
    },
    {
      question: "Qual o custo da solução?",
      answer: "O investimento varia conforme o volume de mensagens e complexidade dos fluxos. Oferecemos planos flexíveis e você só paga pelo que usar. Entre em contato para um orçamento personalizado."
    },
    {
      question: "É possível integrar com meu CRM/ERP?",
      answer: "Sim! Fazemos integração com os principais sistemas do mercado como Salesforce, HubSpot, Pipedrive, SAP, e muitos outros. Também criamos integrações customizadas via API."
    },
    {
      question: "Como vocês garantem a qualidade das respostas?",
      answer: "Utilizamos IA avançada com treinamento específico para seu negócio, combined com fallback inteligente para atendentes humanos quando necessário. Fazemos revisões quinzenais para otimizar as respostas."
    },
    {
      question: "Há suporte técnico disponível?",
      answer: "Sim, oferecemos suporte técnico completo com monitoramento 24/7, revisões quinzenais de performance e um time dedicado para ajustes e melhorias contínuas."
    }
  ];

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (index) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <section className="faq-search section" id="faq">
      <div className="container container--narrow">
        <header className="section-header">
          <span className="section-label">Dúvidas Frequentes</span>
          <h2 className="section-title">{teks.faq.sectionTitle}</h2>
          <p className="section-subtitle">{teks.faq.sectionDesc}</p>
        </header>
        
        {/* Search Field */}
        <div className="faq-search__field">
          <div className="faq-search__input-group">
            <span className="faq-search__icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="faq-search__input"
              placeholder="Buscar por palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar nas perguntas frequentes"
            />
            {searchTerm && (
              <button
                className="faq-search__clear"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}
          </div>
          
          {searchTerm && (
            <p className="faq-search__results">
              {filteredFAQ.length} resultado{filteredFAQ.length !== 1 ? 's' : ''} encontrado{filteredFAQ.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {/* FAQ Items */}
        <div className="faq-accordion">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((item, index) => (
              <article key={index} className="faq-item">
                <button
                  className={`faq-item__question ${expandedItems.has(index) ? 'faq-item__question--expanded' : ''}`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={expandedItems.has(index)}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="faq-item__question-text">
                    {item.question}
                  </span>
                  <span className="faq-item__icon" aria-hidden="true">
                    {expandedItems.has(index) ? '−' : '+'}
                  </span>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`faq-item__answer ${expandedItems.has(index) ? 'faq-item__answer--expanded' : ''}`}
                  aria-labelledby={`faq-question-${index}`}
                  role="region"
                >
                  <div className="faq-item__answer-content">
                    {item.answer}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="faq-search__no-results">
              <p>Nenhuma pergunta encontrada para "{searchTerm}"</p>
              <p>Tente usar palavras-chave diferentes ou entre em contato conosco.</p>
            </div>
          )}
        </div>
        
        {/* Contact CTA */}
        <div className="faq-contact">
          <p>Não encontrou sua dúvida?</p>
          <a href="#cta" className="btn btn--outline">
            Fale conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQWithSearch; 