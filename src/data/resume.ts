import type { Lang } from '../i18n/translations'

export type Job = {
  company: string
  location: string
  title: string
  dates: string
  bullets: string[]
}

export type Project = {
  name: string
  url: string
  description: string
}

export type Education = {
  school: string
  location: string
  degree: string
  dates: string
  honor?: string
}

export type Localized = { en: string; pt: string }

export type SkillItem = {
  name: string
  level: 1 | 2 | 3 | 4 | 5
  note: Localized
}

export type SkillCategory = {
  id: string
  label: Localized
  items: SkillItem[]
}

export type SkillsData = {
  categories: SkillCategory[]
}

export type Resume = {
  name: string
  title: string
  location: string
  contact: {
    phone: string
    email: string
    github: string
    linkedin: string
  }
  summary: string[]
  jobs: Job[]
  skills: SkillsData
  projects: Project[]
  education: Education[]
  languages: string
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: { en: 'Frontend', pt: 'Frontend' },
    items: [
      {
        name: 'TypeScript',
        level: 5,
        note: {
          en: 'Primary language for production web and API work.',
          pt: 'Linguagem principal em web e APIs em produção.',
        },
      },
      {
        name: 'React',
        level: 5,
        note: {
          en: 'Component architecture, hooks, and scalable SPA patterns.',
          pt: 'Arquitetura de componentes, hooks e SPAs escaláveis.',
        },
      },
      {
        name: 'JavaScript (ES6+)',
        level: 5,
        note: {
          en: 'Deep fluency across modern JS for product delivery.',
          pt: 'Fluência em JS moderno para entrega de produto.',
        },
      },
      {
        name: 'Vue.js',
        level: 5,
        note: {
          en: 'Years shipping production Vue apps at scale.',
          pt: 'Anos entregando apps Vue em produção em escala.',
        },
      },
      {
        name: 'Flutter',
        level: 4,
        note: {
          en: 'Cross-platform mobile features for product companies.',
          pt: 'Features mobile multiplataforma em empresas de produto.',
        },
      },
    ],
  },
  {
    id: 'backend',
    label: { en: 'Backend', pt: 'Backend' },
    items: [
      {
        name: 'Node.js',
        level: 5,
        note: {
          en: 'Services, APIs, and event-driven backends in production.',
          pt: 'Serviços, APIs e backends event-driven em produção.',
        },
      },
      {
        name: 'Python',
        level: 5,
        note: {
          en: 'Backend services, data workflows, and tooling.',
          pt: 'Serviços backend, fluxos de dados e tooling.',
        },
      },
      {
        name: 'NestJS',
        level: 4,
        note: {
          en: 'Structured TypeScript services with clear module boundaries.',
          pt: 'Serviços TypeScript estruturados com limites claros de módulo.',
        },
      },
      {
        name: 'Express.js',
        level: 5,
        note: {
          en: 'REST APIs and middleware-heavy Node services.',
          pt: 'APIs REST e serviços Node com middleware.',
        },
      },
      {
        name: 'RESTful APIs',
        level: 5,
        note: {
          en: 'Design, performance tuning, and contract-first delivery.',
          pt: 'Design, performance e entrega contract-first.',
        },
      },
    ],
  },
  {
    id: 'cloud',
    label: { en: 'Cloud & DevOps', pt: 'Cloud e DevOps' },
    items: [
      {
        name: 'AWS',
        level: 5,
        note: {
          en: 'Lambda, ECS, RDS, DynamoDB, SQS, S3, API Gateway, and more.',
          pt: 'Lambda, ECS, RDS, DynamoDB, SQS, S3, API Gateway e mais.',
        },
      },
      {
        name: 'Terraform',
        level: 5,
        note: {
          en: 'IaC that cut deploy time ~60% and improved reliability.',
          pt: 'IaC que reduziu ~60% o tempo de deploy e melhorou confiabilidade.',
        },
      },
      {
        name: 'Docker',
        level: 5,
        note: {
          en: 'Containerized services and reproducible environments.',
          pt: 'Serviços containerizados e ambientes reproduzíveis.',
        },
      },
      {
        name: 'Kubernetes',
        level: 3,
        note: {
          en: 'Operational familiarity with clustered workloads.',
          pt: 'Familiaridade operacional com workloads em cluster.',
        },
      },
      {
        name: 'CI/CD · GitHub Actions',
        level: 5,
        note: {
          en: 'Pipelines with unit, integration, load, and E2E gates.',
          pt: 'Pipelines com portões unitários, integração, carga e E2E.',
        },
      },
    ],
  },
  {
    id: 'data',
    label: { en: 'Data', pt: 'Dados' },
    items: [
      {
        name: 'MySQL',
        level: 5,
        note: {
          en: 'Query tuning and access-pattern optimization at scale.',
          pt: 'Otimização de queries e padrões de acesso em escala.',
        },
      },
      {
        name: 'MongoDB',
        level: 4,
        note: {
          en: 'Document models for product and service data.',
          pt: 'Modelos documentais para dados de produto e serviços.',
        },
      },
      {
        name: 'Redis',
        level: 4,
        note: {
          en: 'Caching and low-latency supporting services.',
          pt: 'Cache e serviços de suporte de baixa latência.',
        },
      },
      {
        name: 'DynamoDB',
        level: 4,
        note: {
          en: 'Serverless data access patterns on AWS.',
          pt: 'Padrões de acesso serverless a dados na AWS.',
        },
      },
      {
        name: 'Event-Driven Architecture',
        level: 5,
        note: {
          en: 'SQS-backed async flows cutting critical latency to ~150ms.',
          pt: 'Fluxos assíncronos com SQS reduzindo latência crítica a ~150ms.',
        },
      },
    ],
  },
  {
    id: 'quality',
    label: { en: 'Quality & Architecture', pt: 'Qualidade e Arquitetura' },
    items: [
      {
        name: 'Jest',
        level: 5,
        note: {
          en: 'Unit and integration suites with high production coverage.',
          pt: 'Suítes unitárias e de integração com alta cobertura.',
        },
      },
      {
        name: 'Cypress',
        level: 5,
        note: {
          en: 'E2E journeys protecting critical user paths.',
          pt: 'Jornadas E2E protegendo caminhos críticos do usuário.',
        },
      },
      {
        name: 'Clean Architecture',
        level: 5,
        note: {
          en: 'Domain boundaries that cut tech debt ~40% in practice.',
          pt: 'Limites de domínio que reduziram ~40% a dívida técnica.',
        },
      },
      {
        name: 'Microservices',
        level: 5,
        note: {
          en: 'Service boundaries for scalable product platforms.',
          pt: 'Limites de serviço para plataformas de produto escaláveis.',
        },
      },
      {
        name: 'Serverless',
        level: 4,
        note: {
          en: 'Lambda-centric designs with cost and reliability tradeoffs.',
          pt: 'Designs centrados em Lambda com tradeoffs de custo e confiabilidade.',
        },
      },
    ],
  },
  {
    id: 'also',
    label: { en: 'Also used', pt: 'Também usado' },
    items: [
      {
        name: 'Go',
        level: 3,
        note: {
          en: 'Desktop/tooling work alongside Tauri stacks.',
          pt: 'Desktop/tooling junto a stacks Tauri.',
        },
      },
      {
        name: 'Rust · Tauri',
        level: 3,
        note: {
          en: 'Cross-platform desktop shells for product features.',
          pt: 'Shells desktop multiplataforma para features de produto.',
        },
      },
      {
        name: 'Dart · Ionic',
        level: 3,
        note: {
          en: 'Mobile/web hybrid delivery when the stack calls for it.',
          pt: 'Entrega mobile/web híbrida quando a stack pede.',
        },
      },
      {
        name: 'Java · PHP · C',
        level: 3,
        note: {
          en: 'Earlier career and maintenance contexts.',
          pt: 'Contextos de início de carreira e manutenção.',
        },
      },
      {
        name: 'GCP · Elasticsearch',
        level: 3,
        note: {
          en: 'Supporting cloud and search tooling experience.',
          pt: 'Experiência complementar em cloud e search.',
        },
      },
      {
        name: 'ML fundamentals · Agile/Scrum',
        level: 3,
        note: {
          en: 'Algorithm basics plus collaborative delivery practices.',
          pt: 'Fundamentos de algoritmos e práticas ágeis de entrega.',
        },
      },
    ],
  },
]

const contact = {
  phone: '+55 (88) 99420-7775',
  email: 'publio.blenilio@gmail.com',
  github: 'https://github.com/publiosilva',
  linkedin: 'https://linkedin.com/in/publio-blenilio',
}

const en: Resume = {
  name: 'Publio Blenilio Tavares Silva',
  title: 'Senior Full-Stack Engineer',
  location: 'Brazil · Open to remote (UTC-3)',
  contact,
  summary: [
    'Senior Full-Stack Engineer with 8+ years of experience designing and shipping cloud-native platforms end-to-end (frontend, backend, databases, and infrastructure), with 4+ years at scale in product companies (100K+ DAU). Core stack: TypeScript, React, Node.js, Python, MySQL, AWS, Terraform, Docker, and CI/CD.',
    'Consistently delivered high-impact solutions including 99.9% uptime, ~150ms critical API latency (from multi-second), 95% test coverage, 70% fewer bug reports, 60% faster deployments, and 37.5% AWS cost reduction while serving 100K+ daily active users.',
    "Master's in Computer Science (Software Engineering focus: test and code quality) and Bachelor's in Software Engineering (Summa Cum Laude) from the Federal University of Ceará (UFC). Experienced mentoring developers, leading code reviews, and building production systems with Clean Architecture and rigorous automated testing.",
  ],
  jobs: [
    {
      company: 'Cupom Verde',
      location: 'Belo Horizonte, Brazil (Remote)',
      title: 'Senior Full-Stack Engineer',
      dates: 'Apr 2021 – Present',
      bullets: [
        'Engineered end-to-end product features across web, mobile, desktop, APIs, and data services for 100K+ daily active users using AWS (Lambda, ECS, RDS, DynamoDB, SQS, S3, API Gateway, CloudFormation, CloudWatch, CodePipeline, Glue), Node.js, TypeScript, Vue.js, Flutter, and cross-platform desktop apps with Go and Tauri + Rust.',
        'Achieved a 60% reduction in deployment time and improved deployment reliability by automating infrastructure provisioning with Terraform and infrastructure-as-code workflows.',
        'Reduced technical debt by 40% and improved long-term maintainability by refactoring cross-stack modules using Clean Architecture, domain boundaries, and consistent engineering standards.',
        'Achieved 99.9% uptime and a 50% reduction in API response time by profiling bottlenecks, optimizing backend request paths, and tuning MySQL and DynamoDB access patterns.',
        'Onboarded and mentored 3+ junior developers by leading code reviews, enforcing architecture guidelines, and coaching delivery practices from design through production.',
        'Established 95% test coverage and a 70% reduction in bug reports by implementing CI/CD pipelines with automated unit, integration, load, and E2E tests (Jest, Cypress).',
        'Reduced critical API response times to ~150ms from multi-second latency and eliminated sustained 100% CPU spikes by redesigning service logic and introducing asynchronous queue-based processing (SQS); cut AWS spend by 37.5% without sacrificing reliability.',
      ],
    },
    {
      company: 'Nubo',
      location: 'Remote',
      title: 'Full-Stack Engineer (Contract, part-time)',
      dates: 'Sep 2024 – Nov 2025',
      bullets: [
        'Built Python backend services and product-facing integrations for data-intensive workflows, hardening pipeline execution across ingestion, validation, and serving.',
        'Scaled distributed processing for high-volume pipelines with resilient orchestration and cloud-native service boundaries on AWS.',
        'Delivered REST APIs, data models, and deployable cloud services from product and operations requirements, improving cross-functional release predictability.',
        'Designed a medallion data lake (bronze/silver/gold) with layered transformations for dependable monthly partner deliveries.',
      ],
    },
    {
      company: 'Grupo Casa Magalhães (Innovation Lab)',
      location: 'Quixadá, Brazil',
      title: 'Full-Stack Developer',
      dates: 'Oct 2020 – Mar 2021',
      bullets: [
        "Built production-ready solutions in the company's innovation hub by owning delivery from prototyping through full-stack implementation and transitioning internal initiatives into deployable products.",
        'Delivered cloud-backed applications for major national retail clients using AWS (Lambda, API Gateway, DynamoDB, RDS, SQS, S3, CloudFormation, ELB), Node.js, and Vue.js.',
        'Institutionalized code reviews and automated unit, integration, and E2E testing to strengthen regression prevention before release.',
      ],
    },
    {
      company: 'Grupo Casa Magalhães',
      location: 'Quixadá, Brazil',
      title: 'Full-Stack Developer (Internship)',
      dates: 'Mar 2020 – Oct 2020',
      bullets: [
        'Developed internal full-stack applications that improved operational workflows using Node.js and Vue.js.',
        'Raised release confidence for internal web systems by combining manual validation with automated Cypress E2E tests across backend and frontend user journeys.',
      ],
    },
    {
      company: 'Sistema Maior de Comunicação',
      location: 'Quixeramobim, Brazil',
      title: 'Web Developer (Service Contracts)',
      dates: 'Jan 2017 – Feb 2020',
      bullets: [
        "Launched the company's web and mobile presence with Vue.js and Ionic, improving digital reach and user engagement across publishing channels.",
        'Expanded CMS capabilities and accelerated publishing workflows by creating custom WordPress plugins/themes and maintaining production websites.',
      ],
    },
    {
      company: 'RALC TI',
      location: 'Quixeramobim, Brazil',
      title: 'Web Developer (Internship)',
      dates: 'Aug 2016 – Dec 2016',
      bullets: [
        'Delivered foundational web application features by implementing backend and server-rendered modules with PHP.',
        'Improved application availability in development and hosting environments by installing and configuring Linux servers for web workloads.',
      ],
    },
  ],
  skills: { categories: skillCategories },
  projects: [
    {
      name: 'uptime-monitor',
      url: 'https://github.com/publiosilva/uptime-monitor',
      description:
        'Self-hosted uptime monitoring platform with a Go API/worker (REST, GraphQL, WebSockets) and React dashboard for HTTP availability, latency, and live status.',
    },
    {
      name: 'aromadr',
      url: 'https://github.com/publiosilva/aromadr',
      description:
        'Dockerized, language-independent test-smell analyzer with a Rust AST service for inspecting test quality across repositories.',
    },
    {
      name: 'Hands-on Series',
      url: 'https://github.com/publiosilva?tab=repositories&q=hands-on',
      description:
        'Practical repositories focused on full-stack engineering patterns, cloud services, and test automation across multiple technologies.',
    },
    {
      name: 'serverless-websocket',
      url: 'https://github.com/publiosilva/serverless-websocket',
      description:
        'Serverless real-time messaging on AWS with the Serverless Framework, Lambda, API Gateway WebSockets, and DynamoDB.',
    },
    {
      name: 'serverless-image-optimizer',
      url: 'https://github.com/publiosilva/serverless-image-optimizer',
      description:
        'AWS Lambda image optimization pipeline built with the Serverless Framework for on-demand resize and compression.',
    },
    {
      name: 'google-drive-clone',
      url: 'https://github.com/publiosilva/google-drive-clone',
      description:
        'Full-stack Google Drive–style app with streaming uploads, progress feedback, drag-and-drop, and a Node.js API with high test coverage.',
    },
  ],
  education: [
    {
      school: 'Universidade Federal do Ceará (UFC)',
      location: 'Fortaleza / Quixadá, Brazil',
      degree: 'M.S., Computer Science (Software Engineering — test and code quality)',
      dates: 'Jan 2024 – Dec 2025',
    },
    {
      school: 'Universidade Federal do Ceará (UFC) — Quixadá campus',
      location: 'Quixadá, Brazil',
      degree: "B.S., Software Engineering",
      dates: '2017 – 2020',
      honor: 'Summa Cum Laude — graduated with highest honors',
    },
    {
      school: 'EEEP Dr. José Alves da Silveira',
      location: 'Quixeramobim, Brazil',
      degree: 'Technical Program, Information Technology',
      dates: '2014 – 2016',
    },
  ],
  languages: 'Portuguese — Native · English — Professional working proficiency (upper intermediate / B2)',
}

const pt: Resume = {
  name: 'Publio Blenilio Tavares Silva',
  title: 'Engenheiro Full-Stack Sênior',
  location: 'Brasil · Aberto a remoto (UTC-3)',
  contact,
  summary: [
    'Engenheiro Full-Stack Sênior com 8+ anos de experiência projetando e entregando plataformas cloud-native de ponta a ponta (frontend, backend, bancos de dados e infraestrutura), com 4+ anos em escala em empresas de produto (100K+ DAU). Stack principal: TypeScript, React, Node.js, Python, MySQL, AWS, Terraform, Docker e CI/CD.',
    'Entregas de alto impacto incluindo 99,9% de uptime, latência crítica de API ~150ms (antes multi-segundo), 95% de cobertura de testes, 70% menos bugs reportados, deploys 60% mais rápidos e redução de 37,5% no custo AWS atendendo 100K+ usuários ativos diários.',
    'Mestrado em Ciência da Computação (Engenharia de Software: testes e qualidade de código) e Bacharelado em Engenharia de Software (Summa Cum Laude) pela Universidade Federal do Ceará (UFC). Experiência mentorando desenvolvedores, liderando code reviews e construindo sistemas em produção com Clean Architecture e testes automatizados rigorosos.',
  ],
  jobs: [
    {
      company: 'Cupom Verde',
      location: 'Belo Horizonte, Brasil (Remoto)',
      title: 'Engenheiro Full-Stack Sênior',
      dates: 'Abr 2021 – Atual',
      bullets: [
        'Desenvolveu features end-to-end em web, mobile, desktop, APIs e serviços de dados para 100K+ usuários ativos diários com AWS (Lambda, ECS, RDS, DynamoDB, SQS, S3, API Gateway, CloudFormation, CloudWatch, CodePipeline, Glue), Node.js, TypeScript, Vue.js, Flutter e apps desktop multiplataforma com Go e Tauri + Rust.',
        'Reduziu o tempo de deploy em 60% e melhorou a confiabilidade automatizando provisionamento de infraestrutura com Terraform e workflows de infrastructure-as-code.',
        'Reduziu dívida técnica em 40% e melhorou a manutenibilidade refatorando módulos cross-stack com Clean Architecture, limites de domínio e padrões de engenharia consistentes.',
        'Atingiu 99,9% de uptime e redução de 50% no tempo de resposta de APIs ao perfilar gargalos, otimizar caminhos de request e afinar padrões de acesso MySQL e DynamoDB.',
        'Onboardou e mentoreou 3+ desenvolvedores júnior liderando code reviews, reforçando guidelines de arquitetura e coachando práticas de entrega do design à produção.',
        'Estabeleceu 95% de cobertura de testes e redução de 70% em bugs reportados com pipelines CI/CD e testes automatizados unitários, de integração, carga e E2E (Jest, Cypress).',
        'Reduziu latência crítica de APIs para ~150ms (antes multi-segundo) e eliminou picos sustentados de 100% de CPU redesenhando a lógica de serviços e introduzindo processamento assíncrono com filas (SQS); cortou 37,5% do gasto AWS sem sacrificar confiabilidade.',
      ],
    },
    {
      company: 'Nubo',
      location: 'Remoto',
      title: 'Engenheiro Full-Stack (Contrato, meio período)',
      dates: 'Set 2024 – Nov 2025',
      bullets: [
        'Construiu serviços backend em Python e integrações orientadas a produto para fluxos data-intensive, endurecendo a execução de pipelines de ingestão, validação e serving.',
        'Escalou processamento distribuído para pipelines de alto volume com orquestração resiliente e limites de serviço cloud-native na AWS.',
        'Entregou APIs REST, modelos de dados e serviços cloud deployáveis a partir de requisitos de produto e operações, melhorando a previsibilidade de releases.',
        'Projetou um data lake medallion (bronze/silver/gold) com transformações em camadas para entregas mensais confiáveis a parceiros.',
      ],
    },
    {
      company: 'Grupo Casa Magalhães (Lab de Inovação)',
      location: 'Quixadá, Brasil',
      title: 'Desenvolvedor Full-Stack',
      dates: 'Out 2020 – Mar 2021',
      bullets: [
        'Construiu soluções prontas para produção no hub de inovação da empresa, do protótipo à implementação full-stack, transformando iniciativas internas em produtos deployáveis.',
        'Entregou aplicações cloud para grandes clientes do varejo nacional com AWS (Lambda, API Gateway, DynamoDB, RDS, SQS, S3, CloudFormation, ELB), Node.js e Vue.js.',
        'Institucionalizou code reviews e testes automatizados unitários, de integração e E2E para fortalecer a prevenção de regressões antes do release.',
      ],
    },
    {
      company: 'Grupo Casa Magalhães',
      location: 'Quixadá, Brasil',
      title: 'Desenvolvedor Full-Stack (Estágio)',
      dates: 'Mar 2020 – Out 2020',
      bullets: [
        'Desenvolveu aplicações full-stack internas que melhoraram fluxos operacionais com Node.js e Vue.js.',
        'Aumentou a confiança de releases com validação manual combinada a testes E2E Cypress em jornadas de backend e frontend.',
      ],
    },
    {
      company: 'Sistema Maior de Comunicação',
      location: 'Quixeramobim, Brasil',
      title: 'Desenvolvedor Web (Contratos de serviço)',
      dates: 'Jan 2017 – Fev 2020',
      bullets: [
        'Lançou a presença web e mobile da empresa com Vue.js e Ionic, ampliando alcance digital e engajamento.',
        'Expandiu capacidades de CMS e acelerou fluxos editoriais criando plugins/temas WordPress e mantendo sites em produção.',
      ],
    },
    {
      company: 'RALC TI',
      location: 'Quixeramobim, Brasil',
      title: 'Desenvolvedor Web (Estágio)',
      dates: 'Ago 2016 – Dez 2016',
      bullets: [
        'Entregou features fundamentais de aplicações web implementando módulos backend e server-rendered com PHP.',
        'Melhorou a disponibilidade de aplicações em ambientes de desenvolvimento e hospedagem instalando e configurando servidores Linux.',
      ],
    },
  ],
  skills: { categories: skillCategories },
  projects: [
    {
      name: 'uptime-monitor',
      url: 'https://github.com/publiosilva/uptime-monitor',
      description:
        'Plataforma self-hosted de monitoramento de uptime com API/worker em Go (REST, GraphQL, WebSockets) e dashboard React para disponibilidade HTTP, latência e status ao vivo.',
    },
    {
      name: 'aromadr',
      url: 'https://github.com/publiosilva/aromadr',
      description:
        'Analisador Dockerizado e language-independent de test smells, com serviço AST em Rust para avaliar a qualidade de testes em repositórios.',
    },
    {
      name: 'Série Hands-on',
      url: 'https://github.com/publiosilva?tab=repositories&q=hands-on',
      description:
        'Repositórios práticos focados em padrões de engenharia full-stack, serviços cloud e automação de testes em múltiplas tecnologias.',
    },
    {
      name: 'serverless-websocket',
      url: 'https://github.com/publiosilva/serverless-websocket',
      description:
        'Mensageria em tempo real serverless na AWS com Serverless Framework, Lambda, API Gateway WebSockets e DynamoDB.',
    },
    {
      name: 'serverless-image-optimizer',
      url: 'https://github.com/publiosilva/serverless-image-optimizer',
      description:
        'Pipeline de otimização de imagens em AWS Lambda com Serverless Framework para resize e compressão sob demanda.',
    },
    {
      name: 'google-drive-clone',
      url: 'https://github.com/publiosilva/google-drive-clone',
      description:
        'App full-stack no estilo Google Drive com upload via streams, progresso, drag-and-drop e API Node.js com alta cobertura de testes.',
    },
  ],
  education: [
    {
      school: 'Universidade Federal do Ceará (UFC)',
      location: 'Fortaleza / Quixadá, Brasil',
      degree: 'Mestrado em Ciência da Computação (Engenharia de Software — testes e qualidade de código)',
      dates: 'Jan 2024 – Dez 2025',
    },
    {
      school: 'Universidade Federal do Ceará (UFC) — campus Quixadá',
      location: 'Quixadá, Brasil',
      degree: 'Bacharelado em Engenharia de Software',
      dates: '2017 – 2020',
      honor: 'Summa Cum Laude — graduado com as mais altas honras',
    },
    {
      school: 'EEEP Dr. José Alves da Silveira',
      location: 'Quixeramobim, Brasil',
      degree: 'Curso Técnico em Informática',
      dates: '2014 – 2016',
    },
  ],
  languages: 'Português — Nativo · Inglês — Proficiência profissional de trabalho (intermediário avançado / B2)',
}

export const resumes: Record<Lang, Resume> = { en, pt }

export function getResume(lang: Lang): Resume {
  return resumes[lang]
}
