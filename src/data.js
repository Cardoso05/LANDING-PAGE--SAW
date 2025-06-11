const teks = {
  nav: {
    logo: "TeknoLab",
    links: ["Recursos", "Preços", "Sobre", "Contato"],
    buttons: ["Começar"]
  },
  hero: {
    heading: "Automação de IA humanizada para suas interações com clientes",
    subheading: "TeknoLab automatiza fluxos no WhatsApp e Direct com mensagens adaptativas e naturais. Reduza custos com vendedores, aumente conversões e tenha controle total pelo nosso painel transparente — sem precisar programar.",
    ctas: ["Começar", "Saiba mais"],
    clientLogos: ["MedicalEquipCo","ServiPlus","TechHub","AgroMax"]
  },
  section1: {
    title: "Automação com empatia",
    features: [
      { title:"Mensagens humanizadas", desc:"Ofereça conversas adaptativas, conduzidas por IA, que soem orgânicas e personalizadas no WhatsApp e Direct." },
      { title:"Fluxos inteligentes", desc:"Estruture suas regras de negócio em fluxos capazes de atender automaticamente 100–500 interações diárias." },
      { title:"Painel de desempenho", desc:"Acompanhe em tempo real custos de API, métricas de resposta e KPIs de conversão — tudo incluso." }
    ]
  },
  section2: {
    label: "Visão completa",
    title: "Controle em tempo real para crescimento acelerado",
    miniFeatures: [
      { title:"Monitoramento ao vivo", desc:"Acompanhe cada interação assim que acontece. Não perca atrasos nem bloqueios." },
      { title:"Visões personalizadas", desc:"Adapte seus dashboards aos indicadores e segmentos que importam para você." },
      { title:"Colaboração em equipe", desc:"Comente, compartilhe relatórios e resolva pendências em conjunto dentro do TeknoLab." }
    ]
  },
  section3: {
    label: "Automação prática",
    title: "Transforme fluxos em receita",
    features: [
      { title:"Relatórios automatizados", desc:"Receba relatórios de desempenho e conformidade agendados direto na sua caixa de entrada." },
      { title:"Análise de tendências", desc:"Identifique padrões de conversão e gargalos com insights orientados por IA." },
      { title:"Fallback inteligente", desc:"Faça a transição perfeita para atendentes humanos quando necessário, garantindo satisfação." }
    ]
  },
  process: {
    title: "Como Atuamos",
    subtitle: "Nosso passo a passo para transformar seu atendimento com IA humanizada:",
    steps: [
      {
        icon: "🔍",
        title: "Diagnóstico Inteligente",
        desc: "Mapeamos dores, pontos de bloqueio e volume de interações para entender seu cenário."
      },
      {
        icon: "📊",
        title: "Análise de Viabilidade",
        desc: "Avaliamos custos, benefícios e regras de negócio para definir o escopo ideal de automação."
      },
      {
        icon: "⚗️",
        title: "Prova de Conceito",
        desc: "Criamos um protótipo de bot/fluxo em ambiente controlado para testar hipóteses e validar resultados."
      },
      {
        icon: "🚀",
        title: "Implementação Ágil",
        desc: "Deploy em produção com integração ao WhatsApp/Direct e monitoramento em tempo real."
      },
      {
        icon: "🔄",
        title: "Otimização Contínua",
        desc: "Revisões quinzenais de performance e ajustes de prompts para maximizar ROI."
      }
    ]
  },
  services: {
    title: "Nossos Serviços",
    subtitle: "Conheça cada um de nossos diferenciais em um clique ou hover.",
    items: [
      {
        icon: "🤖",
        name: "Automação de Atendimento",
        title: "Automação de Atendimento",
        desc: "Bots customizados no WhatsApp e Direct que entendem e respondem seus clientes 24/7.",
        bgImage: "/images/services/automacao.png"
      },
      {
        icon: "📊",
        name: "Dashboards Inteligentes",
        title: "Dashboards Inteligentes",
        desc: "Painéis com KPIs em tempo real para você acompanhar conversões e custos.",
        bgImage: "/images/services/dashboards.png"
      },
      {
        icon: "⚙️",
        name: "Integração de Sistemas",
        title: "Integração de Sistemas",
        desc: "Conectamos seus ERPs, CRMs e APIs para um fluxo de dados totalmente automatizado.",
        bgImage: "/images/services/integracao.png"
      },
      {
        icon: "🛠️",
        name: "Manutenção & Suporte",
        title: "Manutenção & Suporte",
        desc: "Revisões quinzenais e ajustes de prompt para manter tudo otimizado e sem falhas.",
        bgImage: "/images/services/suporte.png"
      },
      {
        icon: "🎓",
        name: "Capacitação Interna",
        title: "Capacitação Interna",
        desc: "Treinamentos para sua equipe operar e tirar máximo proveito dos nossos fluxos de IA.",
        bgImage: "/images/services/capacitacao.png"
      },
      {
        icon: "🔒",
        name: "Segurança & Compliance",
        title: "Segurança & Compliance",
        desc: "Criptografia ponta-a-ponta e políticas de dados para total conformidade regulatória.",
        bgImage: "/images/services/seguranca.png"
      }
    ]
  },
  testimonials: [
    {
      company:"MedicalEquipCo",
      text:"\"Com o TeknoLab, reduzimos nossos custos de orçamentos em 30% e aumentamos conversões em 22%. Os fluxos de IA humanizada parecem totalmente naturais para nossos clientes.\"",
      author:"João Silva",
      role:"CEO, MedicalEquipCo"
    },
    {
      company:"ServiPlus",
      text:"\"A transparência do painel do TeknoLab é imbatível. Monitoramos gastos de API e KPIs em tempo real, tudo em um só lugar.\"",
      author:"Maria Oliveira",
      role:"COO, ServiPlus"
    },
    {
      company:"AgroMax",
      text:"\"As mensagens adaptativas do TeknoLab aumentaram nossa taxa de orçamentos fechados em 25%. O ajuste contínuo de prompts faz toda a diferença.\"",
      author:"Carlos Souza",
      role:"Head de Operações, AgroMax"
    }
  ],
  faq: {
    sectionTitle:"Perguntas frequentes",
    sectionDesc:"Tire suas dúvidas sobre o TeknoLab.",
    items:[
      { question:"O que é o TeknoLab?" },
      { question:"Quem pode se beneficiar do TeknoLab?" }
    ]
  },
  footer: {
    badge:"Desenvolvido por TeknoLab"
  },

  // Cases/Estudos de Caso
  cases: {
    title: "Cases de Sucesso",
    subtitle: "Conheça histórias reais de transformação digital",
    items: [
      {
        title: "E-commerce Aumenta Vendas em 340% com IA",
        text: "Uma loja online do setor de moda implementou nossa solução de automação para WhatsApp e transformou completamente sua estratégia de atendimento. Com chatbots inteligentes e follow-ups personalizados, conseguiu converter mais leads, reduzir abandono de carrinho e aumentar significativamente o ticket médio.",
        imageUrl: "/images/cases/ecommerce-case.png",
        altText: "Dashboard mostrando crescimento de vendas de e-commerce"
      },
      {
        title: "Clínica Médica Otimiza Agendamentos em 85%",
        text: "Uma rede de clínicas especializadas implementou nosso sistema de automação para gerenciar agendamentos, confirmações e lembretes via WhatsApp. O resultado foi uma redução drástica no no-show de pacientes e um aumento significativo na eficiência operacional da equipe administrativa.",
        imageUrl: "/images/cases/clinic-case.png",
        altText: "Interface de agendamento médico automatizado"
      },
      {
        title: "Imobiliária Triplica Leads Qualificados",
        text: "Uma imobiliária de médio porte estava perdendo muitos leads por demora no atendimento. Com nossa automação inteligente, conseguiu responder instantaneamente a todas as consultas, qualificar leads automaticamente e agendar visitas de forma otimizada, resultando em um crescimento exponencial nas conversões.",
        imageUrl: "/images/cases/real-estate-case.png",
        altText: "Sistema de gestão de leads imobiliários"
      },
      {
        title: "Escola Automatiza Comunicação com 2.500 Pais",
        text: "Uma instituição de ensino com mais de 2.500 alunos implementou nossa solução para automatizar toda comunicação com pais e responsáveis. Desde avisos importantes até acompanhamento acadêmico, conseguiu melhorar drasticamente o engajamento familiar e reduzir a carga de trabalho administrativo.",
        imageUrl: "/images/cases/school-case.png",
        altText: "Sistema de comunicação escolar automatizada"
      }
    ]
  }
};

export default teks; 