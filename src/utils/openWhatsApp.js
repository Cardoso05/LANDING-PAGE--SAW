export function openWhatsApp(message, number = process.env.REACT_APP_WHATSAPP_NUMBER || '5511999999999') {
  if (typeof window === 'undefined') return; // segurança em SSR
  const encodedMsg = encodeURIComponent(message);
  window.open(`https://wa.me/${number}?text=${encodedMsg}`, '_blank');
} 