import React, { useState } from 'react';
import { openWhatsApp } from '../utils/openWhatsApp';
import { saveLeadData, formatLeadData } from '../services/api';
import styles from './ContactModal.module.css';

const ContactModal = ({ isOpen, onClose, finalMessage, selectedArea, questions, answers, aiSolution }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Salvar no banco de dados
      const leadData = formatLeadData(email, phone, selectedArea, questions, answers, aiSolution);
      const result = await saveLeadData(leadData);
      
      console.log('✅ Lead salvo:', result);
      
      // Adicionar dados de contato à mensagem
      const messageWithContact = `${finalMessage}\n\n📧 Email: ${email}\n📱 Telefone: ${phone}`;
      
      // Abrir WhatsApp
      openWhatsApp(messageWithContact);
      
      // Fechar modal
      onClose();
      setEmail('');
      setPhone('');
      
    } catch (error) {
      console.error('❌ Erro ao salvar lead:', error);
      setError('Erro ao salvar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setEmail('');
      setPhone('');
      setError('');
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

          {error && (
            <div className={styles.error}>
              ⚠️ {error}
            </div>
          )}

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