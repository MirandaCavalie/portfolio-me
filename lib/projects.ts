export type Project = {
  slug: string
  title: string
  subtitle: string
  meta: string
  coverImage: string | null
  tags?: string[]
  body: string
  gallery?: (string | null)[]
  category: 'projects' | 'uxui' | 'beyond'
  detailPage: boolean
  liveUrl?: string
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
  {
    slug: 'corgi_memory',
    title: 'Corgi Memory',
    subtitle: 'AI agent that remembers your order, mood, and connects you with other builders',
    meta: 'Cafe & Code at Corgi · 1st Place, Best Use of Render · May 2026',
    coverImage: '/images/corgi/interfaz.png',
    tags: ['AI Agents', 'Render', 'HydraDB', 'Full-Stack'],
    body: `An AI agent for Corgi Cafe that remembers your favorite order, your mood, and what you're working on — then connects you with other people at the cafe who are working on similar things or who like the same drinks as you.\n\nPicture this: you walk into the cafe, tell the agent you're stressed, it recommends your comfort drink, and says "hey, there's someone at table 4 who's also building AI agents and loves matcha just like you."\n\nBuilt in 4 hours at the Cafe & Code at Corgi hackathon organized by AI Valley. 100+ builders, powered by HydraDB, Pipeshift, Thine, and Render. Won 1st place for Best Use of Render.`,
    gallery: ['/images/corgi/interfaz.png'],
    category: 'projects',
    detailPage: true,
    liveUrl: 'https://corgi-memory-client.onrender.com/',
  },
  {
    slug: 'ai_focus_group',
    title: 'AI Focus Group',
    subtitle: 'Multi-agent product feedback platform',
    meta: 'Stanford × DeepMind Hackathon · 4th of 100+ teams · Apr 2026',
    coverImage: '/images/stanford/stage.png',
    tags: ['Gemini', 'Fastshot', 'Google AI Studio'],
    body: `A multi-agent debate platform where AI personas with distinct personalities react to any product, then read each other's takes, challenge assumptions, and update their positions through autonomous conversation.\n\nBuilt in 3 hours. Gemini, Fastshot, Google AI Studio. Judged by 50+ VCs and industry leaders.`,
    gallery: [
      '/images/stanford/stage.png',
      '/images/stanford/grupal.png',
    ],
    category: 'projects',
    detailPage: true,
  },
  {
    slug: 'newsloop',
    title: 'Newsloop',
    subtitle: 'Autonomous news research agent',
    meta: 'Autonomous Agents Hackathon · 2nd Place, Reka AI Prize · Feb 2026',
    coverImage: '/images/newsloop/newsloop.png',
    tags: ['LangGraph', 'Reka Vision', 'OpenAI', 'FastAPI', 'SSE'],
    body: `A multi-agent system that researches any topic across text and video, synthesizes findings, and generates structured news digests — fully autonomous.\n\nLangGraph with parallel fan-out/fan-in architecture. Reka Vision for video analysis, Pioneer AI GLiNER for entity extraction, Tavily for search, OpenAI for reasoning. Shipped as a FastAPI web app with real-time SSE streaming.`,
    gallery: ['/images/newsloop/newsloop.png'],
    category: 'projects',
    detailPage: true,
  },
  {
    slug: 'budget_tracker',
    title: 'Budget Tracker',
    subtitle: 'AI-powered personal finance for LATAM',
    meta: 'Full-stack SaaS · Live with beta users · 2026',
    coverImage: '/images/budget/budget.png',
    tags: ['React', 'FastAPI', 'Claude API', 'Supabase', 'PostgreSQL'],
    body: `LATAM has no bank APIs. So I built a full-stack SaaS that auto-syncs bank email notifications through the Gmail API and uses Claude to extract structured transaction data.\n\nReact, FastAPI, Supabase, PostgreSQL. Google OAuth, real-time spending dashboard, REST API. Deployed on Vercel and Railway.`,
    gallery: ['/images/budget/budget.png'],
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
    gallery: [],
    category: 'projects',
    detailPage: true,
  },
  {
    slug: '888_agency',
    title: '888 Design Agency',
    subtitle: 'Website for a Peruvian design & motion agency',
    meta: 'Freelance · In Progress · 2026',
    coverImage: '/images/websites/888_preview.png',
    tags: ['Next.js', 'Figma', 'Tailwind CSS', 'Web Design'],
    body: `Designing and developing the website for 888, a design agency in Peru specializing in branding, motion design, editorial design, and visual strategy.\n\nThe site showcases their portfolio across 6 service categories: brand identity, web & digital design, visual strategy, motion & video, editorial design, and signage & spaces. Built from a custom Figma design with a bold yellow-and-blue color palette.\n\nCurrently in progress — translating the Figma design into a fully responsive Next.js site.`,
    gallery: ['/images/websites/888_preview.png', '/images/websites/888_preview_2.png'],
    category: 'uxui',
    detailPage: true,
    liveUrl: 'https://www.figma.com/design/6SJpFuOYdrxJJ2l1J0lnvd/888',
  },
  {
    slug: 'fernanda_jarameza',
    title: 'fernandajarameza.com',
    subtitle: 'Portfolio for a graphic designer & illustrator',
    meta: 'Freelance · Live · 2026',
    coverImage: '/images/websites/fernanda_preview.png',
    tags: ['Web Design', 'Cloudinary', 'Responsive', 'Portfolio'],
    body: `Designed and built the portfolio website for Fernanda Jara Meza, a Peruvian graphic designer and illustrator based in New York. The site showcases her dual practice: illustration through her personal project Punto y Raya, and graphic design work for clients like Bioderma and Credicorp.\n\nMinimal, elegant design with a focus on letting the visual work speak for itself. Images served via Cloudinary, fully responsive, with smooth navigation between art and design sections.`,
    gallery: ['/images/websites/fernanda_preview.png'],
    category: 'uxui',
    detailPage: true,
    liveUrl: 'https://fernandajarameza.com',
  },
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
    slug: 'quantum_for_climate',
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
    slug: 'smart_mobility_lima',
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
    slug: 'makers_fellowship',
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
    role: 'Data Engineer',
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
