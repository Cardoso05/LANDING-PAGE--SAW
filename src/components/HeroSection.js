import React, { useState, useEffect } from 'react';
import teks from '../data';

const HeroSection = () => {
  // Estado do wizard
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState(['Qual tarefa consome mais tempo na sua equipe?']);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('Qual tarefa consome mais tempo na sua equipe?');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Typewriter effect para o headline
  useEffect(() => {
    const headline = 'Descubra Como a Inteligencia Artificial Pode Transformar sua Empresa';
    if (!hasStarted) {
      // Mostra headline inicial
      setDisplayText(headline);
      return;
    }
    
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < currentQuestion.length) {
        setDisplayText(currentQuestion.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [currentQuestion, hasStarted]);

  // Função para buscar próxima pergunta via Gemini
  async function fetchNextQuestion(history) {
    try {
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
      const API_URL = `${process.env.REACT_APP_API_URL}?key=${API_KEY}`;
      
      const prompt = `
Você é um consultor de automação empresarial especializado em WhatsApp e IA. 
Baseado na resposta anterior do cliente: "${history[history.length - 1]}"
Histórico: ${history.join(' -> ')}

Gere a próxima pergunta estratégica para entender melhor como automatizar a empresa dele.
Foque em ${step === 0 ? 'impacto financeiro e volume de atendimento' : 'resultados desejados e metas específicas'}.

Regras:
- Máximo 10 palavras
- Pergunta direta e específica
- Focada em automação de WhatsApp/atendimento
- Tom consultivo e profissional

Responda APENAS a pergunta, sem explicações adicionais.`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      return generatedText || (step === 0 ? 
        'Como isso impacta seu faturamento mensal?' : 
        'Qual seria o resultado ideal para você?');
        
    } catch (error) {
      console.error('Erro ao buscar próxima pergunta:', error);
      // Fallback questions
      const fallbackQuestions = [
        'Como isso impacta seu faturamento mensal?',
        'Qual seria o resultado ideal para você?'
      ];
      return fallbackQuestions[step] || 'Como posso ajudar você melhor?';
    }
  }

  // Função para buscar solução final via Gemini
  async function fetchSolution(questions, answers) {
    try {
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
      const API_URL = `${process.env.REACT_APP_API_URL}?key=${API_KEY}`;
      
      const prompt = `
Você é um especialista em automação empresarial com foco em WhatsApp e IA.

DIAGNÓSTICO DO CLIENTE:
${questions.map((q, i) => `${i + 1}. ${q}\nResposta: ${answers[i]}`).join('\n\n')}

Baseado nessas informações, crie uma proposta de valor específica e personalizada para automação via WhatsApp.

ESTRUTURA DA RESPOSTA:
🎯 Solução Recomendada: [Nome da solução específica]
💡 Como funciona: [Explicação em 2-3 linhas]
📈 Resultados esperados: [Benefícios quantificados baseados nas respostas]
⚡ Implementação: [Timeline e próximos passos]

Regras:
- Máximo 150 palavras
- Use os dados específicos fornecidos
- Seja direto e prático
- Foque nos benefícios tangíveis
- Tom consultivo e confiante`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      return generatedText || `🎯 Solução Recomendada: Automação Inteligente para WhatsApp

💡 Como funciona: IA personalizada que automatiza ${answers[0]}, otimizando seu atendimento e aumentando ${answers[1]}.

📈 Resultados esperados: Redução de 40% nos custos operacionais e aumento de 25% na conversão, atingindo ${answers[2]}.

⚡ Implementação: Setup em 15 dias com suporte completo e treinamento da equipe.`;
      
    } catch (error) {
      console.error('Erro ao buscar solução:', error);
      return `🎯 Solução Recomendada: Automação Inteligente Personalizada

💡 Baseado no seu problema "${answers[0]}" e objetivo "${answers[2]}", nossa IA pode transformar seu atendimento.

📈 Resultados esperados: Redução de custos, aumento de conversões e otimização completa do processo.

⚡ Implementação: Análise gratuita e setup personalizado em até 30 dias.`;
    }
  }

  // Função para enviar ao WhatsApp
  function sendToWhatsApp(message) {
    const whatsappMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '5511999999999';
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  }

  // Handler do submit
  const handleWizardSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Marcar que começou o wizard
    if (!hasStarted) {
      setHasStarted(true);
    }

    const newAnswers = [...answers, inputValue];
    setAnswers(newAnswers);
    setInputValue('');
    setIsLoading(true);

    try {
      if (step < 2) {
        // Buscar próxima pergunta
        const nextQuestion = await fetchNextQuestion(newAnswers);
        setQuestions([...questions, nextQuestion]);
        setCurrentQuestion(nextQuestion);
        setStep(step + 1);
      } else {
        // Gerar solução final e enviar para WhatsApp
        const solution = await fetchSolution(questions, newAnswers);
        const finalMessage = `Olá! Completei o diagnóstico:\n\n` +
          questions.map((q, i) => `${i + 1}. ${q}\nR: ${newAnswers[i]}`).join('\n\n') +
          `\n\nSolução sugerida:\n${solution}`;
        
        sendToWhatsApp(finalMessage);
      }
    } catch (error) {
      console.error('Erro no wizard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero-section section--hero" id="home" lang="pt-BR">
      <div className="container">
        <div className="hero-section__layout">
          <div className="hero-section__content">
            <div className="hero-section__text">
              <h1 className="hero-section__heading">
                {displayText}
                <span className="cursor">|</span>
              </h1>
              
              <p className="hero-section__subtitle">
                Nós iremos entender como sua empresa funciona e criaremos uma solução personalizada para você.
              </p>
              
              {/* Wizard de diagnóstico de 3 etapas */}
              <section role="region" aria-live="polite" className="tek-wizard">
                {isLoading ? (
                  <div className="wizard-loading" aria-live="polite" aria-busy="true">
                    <span className="dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleWizardSubmit} className="wizard-form">
                    <div className="hero-wizard__group">
                      <input
                        type="text"
                        className="wizard-input"
                        placeholder={hasStarted ? "Digite sua resposta..." : "Qual tarefa consome mais tempo na sua equipe?"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        aria-label={currentQuestion}
                        required
                        autoFocus
                      />
                      <button 
                        type="submit" 
                        className="wizard-button btn btn--primary"
                        disabled={!inputValue.trim()}
                        aria-label={step === 2 ? 'Finalizar diagnóstico' : 'Continuar'}
                      >
                        Continuar
                      </button>
                    </div>
                  </form>
                )}

                <div className="wizard-footer">
                  <p className="hero-wizard__help">
                    💡 {step === 2 ? 'Última pergunta! Vamos gerar sua proposta personalizada' : 'Seja específico para uma análise mais precisa'}
                  </p>
                  <p className="wizard-progress" aria-label={`Progresso do diagnóstico: pergunta ${step + 1} de 3`}>
                    Pergunta {step + 1} de 3
                  </p>
                </div>
              </section>
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