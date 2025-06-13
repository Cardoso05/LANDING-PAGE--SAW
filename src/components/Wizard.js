import React, { useState } from 'react';
import useGemini from '../hooks/useGemini';
import { openWhatsApp } from '../utils/openWhatsApp';
import styles from './Wizard.module.css';

const Wizard = () => {
  const { fetchGemini, loading } = useGemini();

  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState([
    'Qual tarefa consome mais tempo na sua equipe?'
  ]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [inputValue, setInputValue] = useState('');

  async function fetchNextQuestion(history) {
    const prompt = `Você é um consultor de automação empresarial especializado em WhatsApp e IA. \n\nBaseado na resposta anterior do cliente: "${history[history.length - 1]}"\nHistórico: ${history.join(' -> ')}\n\nGere a próxima pergunta estratégica para entender melhor como automatizar a empresa dele.\nFoque em ${step === 0 ? 'impacto financeiro e volume de atendimento' : 'resultados desejados e metas específicas'}.\n\nRegras:\n- Máximo 10 palavras\n- Pergunta direta e específica\n- Focada em automação de WhatsApp/atendimento\n- Tom consultivo e profissional\n\nResponda APENAS a pergunta, sem explicações adicionais.`;

    try {
      const text = await fetchGemini(prompt);
      return text || (step === 0 ? 'Como isso impacta seu faturamento mensal?' : 'Qual seria o resultado ideal para você?');
    } catch {
      const fallback = [
        'Como isso impacta seu faturamento mensal?',
        'Qual seria o resultado ideal para você?'
      ];
      return fallback[step] || 'Como posso ajudar você melhor?';
    }
  }

  async function fetchSolution() {
    const prompt = `Você é um especialista em automação empresarial com foco em WhatsApp e IA.\n\nDIAGNÓSTICO DO CLIENTE:\n${questions.map((q, i) => `${i + 1}. ${q}\nResposta: ${answers[i]}`).join('\n\n')}\n\nBaseado nessas informações, crie uma proposta de valor específica e personalizada para automação via WhatsApp.\n\nESTRUTURA DA RESPOSTA:\n🎯 Solução Recomendada: [Nome da solução específica]\n💡 Como funciona: [Explicação em 2-3 linhas]\n📈 Resultados esperados: [Benefícios quantificados baseados nas respostas]\n⚡ Implementação: [Timeline e próximos passos]\n\nRegras:\n- Máximo 150 palavras\n- Use os dados específicos fornecidos\n- Seja direto e prático\n- Foque nos benefícios tangíveis\n- Tom consultivo e confiante`;

    try {
      const text = await fetchGemini(prompt);
      return text || 'Solução personalizada enviada!';
    } catch {
      return 'Solução Recomendada: Automação Inteligente para WhatsApp.';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newAnswers = [...answers, inputValue];
    setAnswers(newAnswers);
    setInputValue('');

    if (step < 2) {
      // Próxima pergunta
      const nextQuestion = await fetchNextQuestion(newAnswers);
      setQuestions([...questions, nextQuestion]);
      setCurrentQuestion(nextQuestion);
      setStep(step + 1);
    } else {
      // Gera solução e envia
      const solution = await fetchSolution();
      const finalMessage = `Olá! Completei o diagnóstico:\n\n` +
        questions.map((q, i) => `${i + 1}. ${q}\nR: ${newAnswers[i]}`).join('\n\n') +
        `\n\nSolução sugerida:\n${solution}`;
      openWhatsApp(finalMessage);
    }
  };

  return (
    <section className={`tek-wizard ${styles.wizard}`} aria-live="polite">
      {loading ? (
        <div className={styles.loading} aria-busy="true">Carregando…</div>
      ) : (
        <form onSubmit={handleSubmit} className={`${styles.form} wizard-form`}>
          <label className="sr-only" htmlFor="wizard-input">{currentQuestion}</label>
          <input
            id="wizard-input"
            type="text"
            placeholder={currentQuestion}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            className={`${styles.input} wizard-input`}
          />
          <button type="submit" className={`${styles.button} wizard-button btn btn--primary`} disabled={!inputValue.trim()}>
            {step === 2 ? 'Finalizar' : 'Continuar'}
          </button>
          <p className={`${styles.progress} wizard-progress`}>Pergunta {step + 1} de 3</p>
        </form>
      )}
    </section>
  );
};

export default Wizard; 