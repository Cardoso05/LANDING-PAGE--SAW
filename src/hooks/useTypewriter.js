import { useEffect, useState } from 'react';

/**
 * Retorna um texto sendo "digitado" caractere por caractere.
 * Altera automaticamente quando a string alvo muda.
 */
export default function useTypewriter(targetText, speed = 50) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayText('');

    const timer = setInterval(() => {
      setDisplayText((prev) => {
        if (index >= targetText.length) {
          clearInterval(timer);
          return targetText;
        }
        const next = targetText.slice(0, index + 1);
        index += 1;
        return next;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [targetText, speed]);

  return displayText;
} 