import React, { useState } from 'react';
import teks from '../data';

const FooterNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="footer-newsletter" role="contentinfo">
      <div className="container">
        <div className="footer-newsletter__content">
          <div className="footer-newsletter__main">
            <div className="footer-newsletter__brand">
              <h3 className="footer-newsletter__logo">
                {teks.nav.logo}
              </h3>
              <p className="footer-newsletter__tagline">
                Transformando atendimento com IA humanizada
              </p>
            </div>
            
            <div className="footer-newsletter__form-section">
              <h4 className="footer-newsletter__form-title">
                Receba dicas de automação por e-mail
              </h4>
              <p className="footer-newsletter__form-subtitle">
                Insights semanais, cases de sucesso e novidades do mercado
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="footer-newsletter__form">
                  <div className="footer-newsletter__input-group">
                    <input
                      type="email"
                      className="footer-newsletter__input"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Seu endereço de e-mail"
                    />
                    <button 
                      type="submit" 
                      className="btn btn--primary footer-newsletter__btn"
                      disabled={isLoading || !email.trim()}
                    >
                      {isLoading ? '...' : 'Assinar'}
                    </button>
                  </div>
                  <p className="footer-newsletter__privacy">
                    📧 Sem spam. Cancele a qualquer momento.
                  </p>
                </form>
              ) : (
                <div className="footer-newsletter__success">
                  <span className="footer-newsletter__success-icon">✓</span>
                  <p>Obrigado! Você receberá nossas dicas em breve.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="footer-newsletter__links">
            <div className="footer-newsletter__section">
              <h5>Soluções</h5>
              <ul>
                <li><a href="#benefits">Automação de IA</a></li>
                <li><a href="#services">Integração de Sistemas</a></li>
                <li><a href="#process">Consultoria</a></li>
                <li><a href="#cases">Cases de Sucesso</a></li>
              </ul>
            </div>
            
            <div className="footer-newsletter__section">
              <h5>Empresa</h5>
              <ul>
                <li><a href="#process">Como Funcionamos</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#cta">Contato</a></li>
                <li><a href="#privacy">Privacidade</a></li>
              </ul>
            </div>
            
            <div className="footer-newsletter__section">
              <h5>Contato</h5>
              <ul>
                <li>📱 WhatsApp</li>
                <li>📧 contato@teknolab.com</li>
                <li>🌐 www.teknolab.com</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-newsletter__bottom">
          <div className="footer-newsletter__copyright">
            <p>&copy; 2024 TeknoLab. Todos os direitos reservados.</p>
            <p className="footer-newsletter__badge">
              {teks.footer.badge}
            </p>
          </div>
          
          <div className="footer-newsletter__social">
            <a href="#" aria-label="LinkedIn" className="footer-newsletter__social-link">
              💼
            </a>
            <a href="#" aria-label="Instagram" className="footer-newsletter__social-link">
              📷
            </a>
            <a href="#" aria-label="YouTube" className="footer-newsletter__social-link">
              📺
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNewsletter; 