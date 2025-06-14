const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? window.location.origin 
    : 'http://localhost:3001'
);

export const saveLeadData = async (leadData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao salvar dados');
    }

    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};

export const formatLeadData = (email, phone, selectedArea, questions, answers, aiSolution) => {
  return {
    email: email.trim(),
    phone: phone.trim(),
    selectedArea: selectedArea ? {
      id: selectedArea.id,
      label: selectedArea.label,
      description: selectedArea.description
    } : null,
    questions,
    answers,
    aiSolution
  };
}; 