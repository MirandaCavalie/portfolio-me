import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects
    .filter((p) => p.detailPage)
    .map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Miranda Cavalie`,
    description: project.subtitle,
  }
}

function ImageOrPlaceholder({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 font-mono text-sm">{alt}</span>
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="(max-width: 768px) 100vw, 800px"
      className="w-full h-auto"
    />
  )
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug && p.detailPage)
  if (!project) notFound()

  const paragraphs = project.body.split('\n\n').filter(Boolean)

  return (
    <main className="max-w-3xl mx-auto px-6">
      <div className="pt-10 pb-8">
        <Link href="/" className="font-mono text-sm text-gray-400 hover:text-black transition-colors">
          ← Back
        </Link>
      </div>

      <div className="mb-10 border-b border-gray-100 pb-10">
        <h1 className="font-mono font-bold text-2xl sm:text-3xl mb-2">{project.title}</h1>
        <p className="font-sans text-base text-gray-600 mb-2">{project.subtitle}</p>
        <p className="font-mono text-xs text-gray-400 mb-4">{project.meta}</p>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
          >
            View Live →
          </a>
        )}
      </div>

      {paragraphs.length > 0 && (
        <div className="mb-10 space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-sans text-base text-gray-700 leading-relaxed">{para}</p>
          ))}
        </div>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-gray-300 font-mono text-xs px-2 py-1 text-gray-600">{tag}</span>
          ))}
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className={`grid gap-px bg-gray-200 mb-16 ${project.gallery.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
          {project.gallery.map((img, i) => (
            <div key={i} className="bg-white">
              <ImageOrPlaceholder src={img ?? null} alt={`${project.title} ${i + 1}`} />
            </div>
          ))}
        </div>
      )}

      <div className="pb-16" />
    </main>
  )
}
