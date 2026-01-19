/**
 * Dados Mockados - IPMAIA Student App
 * Todos os dados são simulados para fins de prototipagem
 */

// Credenciais válidas para demo
const VALID_CREDENTIALS = {
    '21903456': '1234',
    '21903457': '1234',
    '21903458': '1234'
};

// Dados do estudante
const STUDENT_DATA = {
    id: '21903456',
    name: 'João Silva',
    course: 'Tecnologias Digitais',
    year: '1º',
    class: 'T1-A',
    email: 'joao@mail.com',
    institution: 'IPMAIA',
    semester: '1º Semestre',
    academicYear: '2025/2026'
};

// Disciplinas - Expandido com conteúdos, comunicados e feedbacks
const COURSES = {
    'prog-web': {
        id: 'prog-web',
        name: 'Programação Web (Front-End)',
        professor: 'Prof. Artur Jorge',
        email: 'artur.jorge@ipmaia.pt',
        location: 'Laboratório 1',
        schedule: '08:00',
        description: 'Disciplina prática focada no desenvolvimento de interfaces web responsivas e acessíveis com HTML5, CSS3 e JavaScript moderno.',
        credits: 5,
        note: 16.5,
        status: 'Aprovado',
        contents: [
            { type: 'pdf', name: 'HTML5 - Semântica e Acessibilidade.pdf', size: '2.4 MB' },
            { type: 'pdf', name: 'CSS3 - Layouts e Responsividade.pdf', size: '3.1 MB' },
            { type: 'slides', name: 'JavaScript - Fundamentos e DOM.pptx', size: '4.5 MB' },
            { type: 'slides', name: 'React - Componentes e Hooks.pptx', size: '5.2 MB' },
            { type: 'link', name: 'MDN Web Docs - Web APIs', url: 'https://developer.mozilla.org' },
            { type: 'link', name: 'CSS-Tricks - Flexbox Guide', url: 'https://css-tricks.com' }
        ],
        announcements: [
            { id: 1, title: 'Projeto final adiado para 20 de janeiro', date: 'Há 2 dias', author: 'Prof. Artur Jorge' },
            { id: 2, title: 'Novo material de JavaScript publicado', date: 'Há 1 semana', author: 'Prof. Artur Jorge' },
            { id: 3, title: 'Aula prática de React - 12 de janeiro', date: 'Há 1 semana', author: 'Prof. Artur Jorge' }
        ],
        feedback: {
            approval: 92,
            studentCount: 28,
            comments: 'Excelente desempenho! Continue assim. Considere aprofundar conhecimentos em React e TypeScript.',
            strengths: ['Participação ativa', 'Projetos de qualidade', 'Código bem estruturado'],
            improvements: ['Documentação', 'Testes unitários']
        }
    },
    'bases-dados': {
        id: 'bases-dados',
        name: 'Bases de Dados',
        professor: 'Prof. Mário Henriques',
        email: 'mario.henriques@ipmaia.pt',
        location: 'Sala 301',
        schedule: '10:00',
        description: 'Fundamentos de bases de dados relacionais, modelagem de dados, SQL avançado e otimização de queries.',
        credits: 6,
        note: 15.0,
        status: 'Aprovado',
        contents: [
            { type: 'pdf', name: 'SQL - Queries e Normalização.pdf', size: '2.8 MB' },
            { type: 'slides', name: 'Modelos Relacionais e ER.pptx', size: '3.9 MB' },
            { type: 'pdf', name: 'Índices e Otimização de Queries.pdf', size: '2.2 MB' },
            { type: 'slides', name: 'Transações e Concorrência.pptx', size: '4.1 MB' },
            { type: 'link', name: 'PostgreSQL Documentation', url: 'https://postgresql.org' },
            { type: 'link', name: 'SQL Tutorial - W3Schools', url: 'https://w3schools.com/sql' }
        ],
        announcements: [
            { id: 1, title: 'Exame teórico-prático no dia 18', date: 'Há 3 dias', author: 'Prof. Mário Henriques' },
            { id: 2, title: 'Correções entregues - Consulte no portal', date: 'Há 5 dias', author: 'Prof. Mário Henriques' },
            { id: 3, title: 'Turorial SQL gratuito disponível', date: 'Há 1 semana', author: 'Prof. Mário Henriques' }
        ],
        feedback: {
            approval: 88,
            studentCount: 28,
            comments: 'Bom desempenho geral. Melhorar na otimização de queries complexas. Prepare-se bem para o exame.',
            strengths: ['Compreensão de conceitos', 'Normalização correta', 'Participação nas aulas'],
            improvements: ['Performance de queries', 'Documentação de modelos']
        }
    },
    'computacao-nuvem': {
        id: 'computacao-nuvem',
        name: 'Computação na Nuvem',
        professor: 'Prof. Pedro Proença',
        email: 'pedro.proenca@ipmaia.pt',
        location: 'Laboratório 2',
        schedule: '13:00',
        description: 'Introdução aos serviços cloud (AWS), containerização com Docker e orquestração com Kubernetes.',
        credits: 5,
        note: 17.5,
        status: 'Aprovado',
        contents: [
            { type: 'slides', name: 'AWS Lambda e Serverless.pptx', size: '4.3 MB' },
            { type: 'pdf', name: 'Docker - Containerização.pdf', size: '3.2 MB' },
            { type: 'pdf', name: 'Kubernetes Basics.pdf', size: '2.9 MB' },
            { type: 'slides', name: 'Segurança na Nuvem.pptx', size: '3.8 MB' },
            { type: 'link', name: 'AWS Free Tier', url: 'https://aws.amazon.com/free' },
            { type: 'link', name: 'Docker Documentation', url: 'https://docs.docker.com' }
        ],
        announcements: [
            { id: 1, title: 'Laboratorio AWS na próxima aula', date: 'Há 1 dia', author: 'Prof. Pedro Proença' },
            { id: 2, title: 'Código de exemplo - Dockerfiles', date: 'Há 4 dias', author: 'Prof. Pedro Proença' },
            { id: 3, title: 'Webinar sobre Kubernetes em 15 de janeiro', date: 'Há 1 semana', author: 'Prof. Pedro Proença' }
        ],
        feedback: {
            approval: 95,
            studentCount: 28,
            comments: 'Excelente! Demonstra grande capacidade de aprendizagem. Prepare o projeto final com rigor.',
            strengths: ['Rapidez de aprendizagem', 'Práticas bem executadas', 'Inovação nos projetos'],
            improvements: ['Documentação técnica']
        }
    },
    'marketing-digital': {
        id: 'marketing-digital',
        name: 'Marketing e Comunicação Digital',
        professor: 'Prof. Carla Amorim',
        email: 'carla.amorim@ipmaia.pt',
        location: 'Sala 205',
        schedule: '15:00',
        description: 'Estratégias de marketing digital, SEO/SEM, analytics e comunicação em redes sociais.',
        credits: 4,
        note: 14.0,
        status: 'Aprovado',
        contents: [
            { type: 'slides', name: 'SEO e SEM - Estratégias Digitais.pptx', size: '3.6 MB' },
            { type: 'pdf', name: 'Google Analytics 4 Fundamentals.pdf', size: '2.5 MB' },
            { type: 'pdf', name: 'Email Marketing e CRM.pdf', size: '2.1 MB' },
            { type: 'slides', name: 'Social Media Strategy.pptx', size: '4.2 MB' },
            { type: 'link', name: 'Google Ads Academy', url: 'https://ads.google.com/academy' },
            { type: 'link', name: 'HubSpot Academy', url: 'https://academy.hubspot.com' }
        ],
        announcements: [
            { id: 1, title: 'Casos de estudo: Campanhas de sucesso', date: 'Há 2 dias', author: 'Prof. Carla Amorim' },
            { id: 2, title: 'Recursos Google Analytics atualizado', date: 'Há 1 semana', author: 'Prof. Carla Amorim' },
            { id: 3, title: 'Trabalho em grupo - Análise de marca', date: 'Há 2 semanas', author: 'Prof. Carla Amorim' }
        ],
        feedback: {
            approval: 85,
            studentCount: 28,
            comments: 'Bom trabalho nas campanhas. Melhorar a análise de dados e ROI. Estratégia interessante.',
            strengths: ['Criatividade nas campanhas', 'Trabalho em equipa', 'Apresentações claras'],
            improvements: ['Análise de métricas', 'ROI e conversion tracking']
        }
    }
};

// Horário de hoje
const SCHEDULE_TODAY = [
    {
        time: '08:00',
        courseId: 'prog-web',
        state: 'past' // finished
    },
    {
        time: '10:00',
        courseId: 'bases-dados',
        state: 'current' // happening now
    },
    {
        time: '12:00',
        type: 'break',
        name: 'Pausa para almoço',
        state: 'break'
    },
    {
        time: '13:00',
        courseId: 'computacao-nuvem',
        state: 'next' // upcoming
    },
    {
        time: '15:00',
        courseId: 'marketing-digital',
        state: 'future' // later
    }
];

// Exames
const EXAMS = [
    {
        courseId: 'prog-web',
        date: '15 de Janeiro',
        time: '10:00',
        location: 'Sala 201',
        state: 'scheduled'
    },
    {
        courseId: 'bases-dados',
        date: '18 de Janeiro',
        time: '14:00',
        location: 'Sala 301',
        state: 'scheduled'
    },
    {
        courseId: 'computacao-nuvem',
        date: '8 de Janeiro',
        time: '09:00',
        state: 'completed',
        grade: 17.5
    },
    {
        courseId: 'marketing-digital',
        date: '22 de Janeiro',
        time: '15:00',
        location: 'Sala 205',
        state: 'scheduled'
    }
];

// Comunicados expandido
const ANNOUNCEMENTS = [
    {
        id: 1,
        title: 'Aulas suspensas amanhã',
        date: 'Hoje às 14:00',
        type: 'academic',
        read: false
    },
    {
        id: 2,
        title: 'Datas de Exames Confirmadas',
        date: 'Ontem',
        type: 'academic',
        read: false
    },
    {
        id: 3,
        title: 'Período de Notas Aberto',
        date: 'Há 3 dias',
        type: 'administrative',
        read: true
    },
    {
        id: 4,
        title: 'Manutenção do Sistema',
        date: 'Há 5 dias',
        type: 'administrative',
        read: true
    },
    {
        id: 5,
        title: 'Novo material de aprendizagem disponível',
        date: 'Há 1 semana',
        type: 'academic',
        read: true
    },
    {
        id: 6,
        title: 'Inscrições para seminário - Últimas vagas',
        date: 'Há 1 semana',
        type: 'academic',
        read: false
    },
    {
        id: 7,
        title: 'Atualização de politicas académicas',
        date: 'Há 2 semanas',
        type: 'administrative',
        read: true
    },
    {
        id: 8,
        title: 'Horário de atendimento - Gabinete Docente',
        date: 'Há 2 semanas',
        type: 'administrative',
        read: false
    }
];

// Calendário académico - Eventos mapeados por data
const ACADEMIC_CALENDAR = {
    events: [
        { date: '2026-01-10', type: 'aula', courseId: 'prog-web' },
        { date: '2026-01-10', type: 'aula', courseId: 'bases-dados' },
        { date: '2026-01-10', type: 'aula', courseId: 'computacao-nuvem' },
        { date: '2026-01-15', type: 'exame', courseId: 'prog-web' },
        { date: '2026-01-18', type: 'exame', courseId: 'bases-dados' },
        { date: '2026-01-22', type: 'feriado', title: 'Feriado' },
        { date: '2026-02-10', type: 'feriado', title: 'Carnaval' },
        { date: '2026-01-12', type: 'aula', courseId: 'prog-web' },
        { date: '2026-01-12', type: 'aula', courseId: 'marketing-digital' },
        { date: '2026-01-14', type: 'aula', courseId: 'computacao-nuvem' },
        { date: '2026-01-28', type: 'exame', courseId: 'computacao-nuvem' }
    ]
};

// Função: Gerar dias do calendário para um mês específico
function generateCalendarDays(year, month) {
    // month é 0-indexed (0 = janeiro)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const days = [];
    
    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }
    
    // Adicionar dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const isToday = date.getTime() === today.getTime();
        
        // Filtrar eventos para esta data
        const dayEvents = ACADEMIC_CALENDAR.events.filter(e => e.date === dateStr);
        
        const hasExams = dayEvents.some(e => e.type === 'exame');
        const hasClasses = dayEvents.some(e => e.type === 'aula');
        const isHoliday = dayEvents.some(e => e.type === 'feriado');
        
        days.push({
            day,
            date: dateStr,
            dayOfWeek: date.getDay(),
            isToday,
            events: dayEvents,
            hasExams,
            hasClasses,
            isHoliday
        });
    }
    
    return days;
}

// Função: Obter eventos de um dia específico
function getDayEvents(dateStr) {
    return ACADEMIC_CALENDAR.events.filter(e => e.date === dateStr);
}

// Função: Formatar data para display
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-PT', options);
}

// Função helper: obter nota média
function getAverageGrade() {
    const grades = Object.values(COURSES).map(c => c.note);
    return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
}

// Função helper: obter presença (mockada)
function getAttendancePercentage() {
    return 95; // mockado
}
