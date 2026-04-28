export type Project = {
  slug: string
  title: string
  subtitle: string
  meta: string
  coverImage: string | null
  tags?: string[]
  body: string
  gallery?: (string | null)[]
  category: 'projects' | 'beyond'
  detailPage: boolean
}

export type Experience = {
  role: string
  company: string
  description: string
  period: string
}

export type Education = {
  school: string
  program: string
  detail?: string
}

export const projects: Project[] = [
  // ── Tech Projects ────────────────────────────────────────────────────────
  {
    slug: 'ai-focus-group',
    title: 'AI Focus Group',
    subtitle: 'Multi-agent product feedback platform',
    meta: 'Stanford × DeepMind Hackathon · 4th of 100+ teams · Apr 2026',
    coverImage: '/images/stanford/stanford-hackathon.png',
    tags: ['Gemini', 'Fastshot', 'Google AI Studio'],
    body: `A multi-agent debate platform where AI personas with distinct personalities react to any product, then read each other's takes, challenge assumptions, and update their positions through autonomous conversation.\n\nBuilt in 3 hours. Gemini, Fastshot, Google AI Studio. Judged by 50+ VCs and industry leaders.`,
    gallery: [
      '/images/stanford/stanford-hackathon.png',
      '/images/stanford/stanford-team-1.jpg',
      '/images/stanford/stanford-team-2.jpg',
    ],
    category: 'projects',
    detailPage: true,
  },
  {
    slug: 'newsloop',
    title: 'Newsloop',
    subtitle: 'Autonomous news research agent',
    meta: 'Autonomous Agents Hackathon · 2nd Place, Reka AI Prize · Feb 2026',
    coverImage: '/images/newsloop/newsloop-team.jpg',
    tags: ['LangGraph', 'Reka Vision', 'OpenAI', 'FastAPI', 'SSE'],
    body: `A multi-agent system that researches any topic across text and video, synthesizes findings, and generates structured news digests — fully autonomous.\n\nLangGraph with parallel fan-out/fan-in architecture. Reka Vision for video analysis, Pioneer AI GLiNER for entity extraction, Tavily for search, OpenAI for reasoning. Shipped as a FastAPI web app with real-time SSE streaming.`,
    gallery: ['/images/newsloop/newsloop-team.jpg'],
    category: 'projects',
    detailPage: true,
  },
  {
    slug: 'budget-tracker',
    title: 'Budget Tracker',
    subtitle: 'AI-powered personal finance for LATAM',
    meta: 'Full-stack SaaS · Live with beta users · 2026',
    coverImage: null,
    tags: ['React', 'FastAPI', 'Claude API', 'Supabase', 'PostgreSQL'],
    body: `LATAM has no bank APIs. So I built a full-stack SaaS that auto-syncs bank email notifications through the Gmail API and uses Claude to extract structured transaction data.\n\nReact, FastAPI, Supabase, PostgreSQL. Google OAuth, real-time spending dashboard, REST API. Deployed on Vercel and Railway.`,
    gallery: [null],
    category: 'projects',
    detailPage: true,
  },
  {
    slug: 'startupeable',
    title: 'Startupeable Fan Intelligence',
    subtitle: 'Multi-agent audience analytics pipeline',
    meta: 'In progress · 2026',
    coverImage: null,
    tags: ['LangGraph', 'Claude API', 'Apify', 'Pydantic', 'FastAPI'],
    body: `Building a multi-agent orchestrator that scrapes audience data across YouTube, Spotify, LinkedIn, and X for Latin America's largest startup podcast. Each agent handles one platform — scraping, normalizing, classifying fan segments (superfan, engaged, casual, silent), and cross-platform identity linking.\n\nLangGraph state graph with fan-out/fan-in architecture. Apify for scraping, Claude for fan classification, Pydantic for schema validation.`,
    gallery: [null],
    category: 'projects',
    detailPage: true,
  },

  // ── Beyond Tech ───────────────────────────────────────────────────────────
  {
    slug: 'hilando',
    title: 'Hilando',
    subtitle: 'Dignifying secondhand fashion in Latin America',
    meta: 'HEC Montréal × Scotiabank · Top 9 of 156 teams · 2024',
    coverImage: '/images/canada/hilando-stage.jpg',
    body: `Co-founded a social startup to dignify the secondhand clothing market in Latin America. Seven months from idea to MVP, with mentorship from fashion and startup ecosystem experts.`,
    gallery: [
      '/images/canada/hilando-stage.jpg',
      '/images/canada/hilando-team.png',
    ],
    category: 'beyond',
    detailPage: true,
  },
  {
    slug: 'quantum-for-climate',
    title: 'Quantum for Climate',
    subtitle: 'Quantum-hybrid ML for drought prediction',
    meta: 'Quantum Hackathon LATAM · 2nd Place · 380 students · Oct 2025',
    coverImage: '/images/quantum/quantum-stage.jpg',
    tags: ['PennyLane', 'Quantum ML'],
    body: `Variational quantum neural networks applied to climate forecasting. Built with PennyLane.`,
    gallery: [
      '/images/quantum/quantum-stage.jpg',
      '/images/quantum/quantum-team.jpg',
    ],
    category: 'beyond',
    detailPage: true,
  },
  {
    slug: 'smart-mobility-lima',
    title: 'Smart Mobility for Lima',
    subtitle: 'Urban planning with decision science',
    meta: 'T.L. Saaty Hackathon · 2nd Place · May 2024',
    coverImage: '/images/saaty/saaty-presenting.jpg',
    body: `Proposed three urban planning strategies to address Lima's traffic crisis, selecting the best through AHP (Analytic Hierarchy Process). Invited to present at ICEFM2024.`,
    gallery: ['/images/saaty/saaty-presenting.jpg'],
    category: 'beyond',
    detailPage: true,
  },
  {
    slug: 'makers-fellowship',
    title: 'Makers Fellowship',
    subtitle: 'Building the LATAM startup community',
    meta: 'Business Cohort 23-2',
    coverImage: '/images/certifications/makers-letter.jpg',
    body: '',
    gallery: ['/images/certifications/makers-letter.jpg'],
    category: 'beyond',
    detailPage: false,
  },
]

export const experiences: Experience[] = [
  {
    role: 'Data Analyst',
    company: 'Kriptos',
    description: 'AI data classification for enterprise security. $4.9M raised.',
    period: 'May 2025 – Present',
  },
  {
    role: 'Product Analytics Intern',
    company: 'Culqi',
    description: "Peru's Stripe. 100K+ merchants. Acquired by Credicorp (NYSE: BAP).",
    period: 'Jul – Dec 2024',
  },
  {
    role: 'Risk Models Intern',
    company: 'BCP',
    description: 'Largest bank in the Andean region. 15M customers.',
    period: 'Jan – Mar 2024',
  },
  {
    role: 'Employee #1',
    company: 'Talently',
    description: 'AI-powered tech talent marketplace. $3M raised. Joined at 16.',
    period: 'Nov 2019 – Dec 2020',
  },
]

export const education: Education[] = [
  {
    school: 'University of San Francisco',
    program: 'Exchange Program',
    detail: '2026',
  },
  {
    school: 'Universidad del Pacífico',
    program: 'Information Engineering',
    detail: 'Graduating Aug 2025 · Honors 2024',
  },
]
