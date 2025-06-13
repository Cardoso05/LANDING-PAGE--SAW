import { useState, useCallback } from 'react';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL;

export default function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGemini = useCallback(async (prompt) => {
    if (!API_KEY || !BASE_URL) {
      throw new Error('API Gemini não configurada');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      return generatedText || '';
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchGemini, loading, error };
} 