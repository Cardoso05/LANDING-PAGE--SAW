const { Pool } = require('pg');

// Configuração do banco Supabase
const pool = new Pool({
  host: '31.97.19.134',
  port: 5432,
  database: 'landing_page',
  user: 'postgres',
  password: process.env.SUPABASE_DB_PASSWORD || 'postgres',
  ssl: false
});

// Função para capturar IP real
function getClientIP(req) {
  return req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         '127.0.0.1';
}

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      phone,
      selectedArea,
      questions,
      answers,
      aiSolution
    } = req.body;

    // Validações básicas
    if (!email || !phone) {
      return res.status(400).json({ 
        error: 'Email e telefone são obrigatórios' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email inválido' 
      });
    }

    // Capturar dados do request
    const ipAddress = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';

    // Inserir no banco
    const query = `
      INSERT INTO leads (
        email, 
        phone, 
        selected_area, 
        area_description, 
        questions, 
        answers, 
        ai_solution, 
        ip_address, 
        user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, created_at
    `;

    const values = [
      email,
      phone,
      selectedArea?.id || null,
      selectedArea?.description || null,
      JSON.stringify(questions || []),
      JSON.stringify(answers || []),
      aiSolution || null,
      ipAddress,
      userAgent
    ];

    const result = await pool.query(query, values);
    const lead = result.rows[0];

    console.log(`✅ Lead salvo: ID ${lead.id} - ${email} - ${selectedArea?.label || 'Sem área'}`);

    res.status(201).json({
      success: true,
      leadId: lead.id,
      message: 'Lead salvo com sucesso',
      timestamp: lead.created_at
    });

  } catch (error) {
    console.error('❌ Erro ao salvar lead:', error);
    
    // Não expor detalhes do erro em produção
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível salvar os dados'
    });
  }
}; 