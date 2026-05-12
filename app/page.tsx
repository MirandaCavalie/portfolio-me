import Image from 'next/image'
import Link from 'next/link'
import { projects, experiences, education } from '@/lib/projects'
import { CalButton } from './components/CalButton'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
      {children}
    </p>
  )
}

function MetaLine({ meta }: { meta: string }) {
  const parts = meta.split(' · ')
  if (parts.length === 1) {
    return <p className="font-mono text-sm text-gray-500">{meta}</p>
  }
  return (
    <p className="font-mono text-sm">
      {parts.map((part, i) => {
        const isFirst = i === 0
        const isLast = i === parts.length - 1
        const boldMiddle = parts.length >= 3 && !isFirst && !isLast

        let cls = ''
        if (boldMiddle) cls = 'font-bold text-black'
        else if (isFirst) cls = 'text-gray-700'
        else cls = 'text-gray-400'

        return (
          <span key={i}>
            {i > 0 && <span className="text-gray-300"> · </span>}
            <span className={cls}>{part}</span>
          </span>
        )
      })}
    </p>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="border border-[#e5e5e5] flex flex-col h-full">
      {project.coverImage && (
        <div className="w-full aspect-video relative overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-2 flex-1 min-h-[120px]">
        <h3 className="font-mono font-bold text-sm">{project.title}</h3>
        <p className="font-sans text-sm text-gray-600">{project.subtitle}</p>
        <div className="mt-auto pt-3">
          <MetaLine meta={project.meta} />
        </div>
      </div>
    </div>
  )
}

function BeyondCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="border border-[#e5e5e5] flex flex-col h-full">
      {project.coverImage ? (
        <div className="w-full aspect-video relative overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 font-mono text-xs">{project.title}</span>
        </div>
      )}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-mono font-bold text-sm">{project.title}</h3>
        <p className="font-sans text-sm text-gray-600">{project.subtitle}</p>
        <div className="mt-auto pt-3">
          <MetaLine meta={project.meta} />
        </div>
      </div>
    </div>
  )
}

const techProjects = projects.filter((p) => p.category === 'projects')
const uxuiProjects = projects.filter((p) => p.category === 'uxui')
const beyondProjects = projects.filter((p) => p.category === 'beyond')

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      <section className="pt-24 pb-20 border-b border-gray-100">
        <div className="flex items-center gap-8 sm:gap-12">
          <div className="flex-1 min-w-0">
            <h1 className="font-mono font-bold text-3xl sm:text-4xl mb-3">Miranda Cavalie</h1>
            <p className="font-sans text-base text-gray-700 mb-1">
              Engineer. I build things end to end and ship them.
            </p>
            <p className="font-mono text-sm text-gray-400 mb-8">San Francisco, CA</p>
            <div className="flex flex-wrap gap-6 font-mono text-sm">
              <a href="https://github.com/mirandacavalie" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/mirandacavalie" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="mailto:mirandacavalie@gmail.com" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="0"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email
              </a>
              <a
                href="/portfolio-me/Miranda_Cavalie_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Resume
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image src="/portfolio-me/images/photo_me.jpeg" alt="Miranda Cavalie" width={200} height={200} className="rounded-full object-cover w-32 h-32 sm:w-48 sm:h-48" />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-16 border-b border-gray-100">
        <SectionLabel>Projects</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {techProjects.map((project) =>
            project.detailPage ? (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block h-full hover:opacity-75 transition-opacity duration-150">
                <ProjectCard project={project} />
              </Link>
            ) : (
              <div key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </div>
            )
          )}
        </div>
      </section>

      <section className="pt-16 pb-16 border-b border-gray-100">
        <SectionLabel>UX / UI</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {uxuiProjects.map((project) =>
            project.detailPage ? (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block h-full hover:opacity-75 transition-opacity duration-150"
              >
                <ProjectCard project={project} />
              </Link>
            ) : (
              <div key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </div>
            )
          )}
        </div>
      </section>

      <section className="pt-16 pb-16 border-b border-gray-100">
        <SectionLabel>Beyond Tech</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {beyondProjects.map((project) =>
            project.detailPage ? (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block h-full hover:opacity-75 transition-opacity duration-150">
                <BeyondCard project={project} />
              </Link>
            ) : (
              <div key={project.slug} className="h-full">
                <BeyondCard project={project} />
              </div>
            )
          )}
        </div>
      </section>

      <section className="pt-16 pb-16 border-b border-gray-100">
        <SectionLabel>Experience</SectionLabel>
        <div className="divide-y divide-gray-100">
          {experiences.map((exp) => (
            <div key={exp.company} className="py-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_2fr_auto] gap-1 sm:gap-4 items-baseline">
              <span className="font-mono text-sm font-bold">{exp.role}</span>
              <span className="font-mono text-sm text-gray-700">{exp.company}</span>
              <span className="font-sans text-sm text-gray-500">{exp.description}</span>
              <span className="font-mono text-xs text-gray-400 whitespace-nowrap">{exp.period}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16 pb-16 border-b border-gray-100">
        <SectionLabel>Education</SectionLabel>
        <div className="divide-y divide-gray-100">
          {education.map((ed) => (
            <div key={ed.school} className="py-4 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-1 sm:gap-4 items-baseline">
              <div>
                <span className="font-mono text-sm font-bold">{ed.school}</span>
                <span className="font-sans text-sm text-gray-500 ml-3">{ed.program}</span>
              </div>
              {ed.detail && <span className="font-mono text-xs text-gray-400">{ed.detail}</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16 pb-16 border-b border-gray-100">
        <SectionLabel>Let&apos;s talk</SectionLabel>
        <p className="font-sans text-sm text-gray-500 mb-6">
          Book a 15-minute slot if you want to chat about AI, projects, or opportunities.
        </p>
        <CalButton />
      </section>

      <footer className="py-12 flex flex-col items-center gap-4">
        <p className="font-mono text-xs text-gray-400">Miranda Cavalie · 2026</p>
        <div className="flex gap-5 font-mono text-xs text-gray-400">
          <a href="https://github.com/mirandacavalie" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/mirandacavalie" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
          <a href="mailto:mirandacavalie@gmail.com" className="hover:text-black transition-colors">Email</a>
        </div>
      </footer>

    </main>
  )
}
