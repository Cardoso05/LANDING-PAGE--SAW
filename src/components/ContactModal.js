import React, { useState } from 'react';
import { openWhatsApp } from '../utils/openWhatsApp';
import styles from './ContactModal.module.css';

const ContactModal = ({ isOpen, onClose, finalMessage }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    // Adicionar dados de contato à mensagem
    const messageWithContact = `${finalMessage}\n\n📧 Email: ${email}\n📱 Telefone: ${phone}`;
    
    // Simular delay de processamento
    setTimeout(() => {
      openWhatsApp(messageWithContact);
      onClose();
      setIsSubmitting(false);
      setEmail('');
      setPhone('');
    }, 1000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setEmail('');
      setPhone('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Quase lá! 🎯</h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            Para enviarmos sua análise personalizada, precisamos de alguns dados:
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                📧 Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className={styles.input}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                📱 WhatsApp
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                required
                className={styles.input}
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!email.trim() || !phone.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Enviando...
                </>
              ) : (
                'Enviar para WhatsApp'
              )}
            </button>
          </form>

          <p className={styles.privacy}>
            🔒 Seus dados estão seguros e não serão compartilhados
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal; 