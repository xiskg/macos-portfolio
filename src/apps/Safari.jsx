import { useEffect, useMemo, useState } from 'react'
import { profile, projects, devProjects } from '../content/portfolio.js'
import { isDev } from '../content/fileSystem.js'
import Icon from '../components/Icon.jsx'

const HOST = 'dealmeida.me'

function routeFor(url) {
  if (!url || url === 'start') return { type: 'start' }
  if (url.startsWith('case:')) return { type: 'project', id: url.slice(5) }
  const p = projects.find((pr) => pr.hero === url || pr.thumb === url)
  if (p) return { type: 'project', id: p.id }
  return { type: 'external', url }
}

function addressFor(route) {
  if (route.type === 'start') return HOST
  if (route.type === 'project') return `${HOST}/work/${route.id}`
  try {
    return new URL(route.url).host
  } catch {
    return route.url
  }
}

export default function Safari({ url }) {
  const [route, setRoute] = useState(() => routeFor(url))
  const [hist, setHist] = useState(() => ({ stack: [routeFor(url)], idx: 0 }))

  useEffect(() => {
    const r = routeFor(url)
    setRoute(r)
    setHist((h) => ({ stack: [...h.stack.slice(0, h.idx + 1), r], idx: h.idx + 1 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const nav = (r) => {
    setRoute(r)
    setHist((h) => ({ stack: [...h.stack.slice(0, h.idx + 1), r], idx: h.idx + 1 }))
  }
  const go = (d) => {
    setHist((h) => {
      const idx = Math.min(Math.max(h.idx + d, 0), h.stack.length - 1)
      setRoute(h.stack[idx])
      return { ...h, idx }
    })
  }

  const ext = (u) => window.open(u, '_blank', 'noopener')

  return (
    <div className="safari">
      <div className="safari-toolbar" data-drag-handle>
        <button className="tbtn" disabled={hist.idx === 0} onClick={() => go(-1)} aria-label="Back">
          <Icon name="chevL" size={17} />
        </button>
        <button className="tbtn" disabled={hist.idx >= hist.stack.length - 1} onClick={() => go(1)} aria-label="Forward">
          <Icon name="chevR" size={17} />
        </button>
        <div className="address">
          <Icon name="globeSm" size={13} className="lock" />
          <span>{addressFor(route)}</span>
        </div>
        <button className="tbtn" onClick={() => nav(route)} aria-label="Reload" title="Reload">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 12 a8 8 0 1 1 -2.3 -5.6" />
            <path d="M20 3 v4 h-4" />
          </svg>
        </button>
      </div>
      <div className="favorites">
        <button className="fav" onClick={() => nav({ type: 'start' })}>
          <Icon name="safari" size={16} /> Start Page
        </button>
        <button className="fav" onClick={() => ext(profile.linkedin)}>
          <Icon name="linkedin" size={16} /> LinkedIn
        </button>
        <button className="fav" onClick={() => ext(profile.github)}>
          <Icon name="github" size={16} /> GitHub
        </button>
        <button className="fav" onClick={() => (window.location.href = `mailto:${profile.email}`)}>
          <Icon name="mail" size={16} /> Email Me
        </button>
      </div>
      <div className="safari-page">
        {route.type === 'start' && <StartPage nav={nav} ext={ext} />}
        {route.type === 'project' && <ProjectPage id={route.id} nav={nav} />}
        {route.type === 'external' && <ExternalPage url={route.url} ext={ext} />}
      </div>
    </div>
  )
}

function StartPage({ nav, ext }) {
  const d = isDev()
  return (
    <div className="safari-start">
      {!d && (
        <>
          <h2>Case Studies</h2>
          <div className="start-grid">
            {projects.map((p) => (
              <button key={p.id} className="start-item" onClick={() => nav({ type: 'project', id: p.id })}>
                <div
                  className="start-thumb"
                  style={{ background: `linear-gradient(135deg, ${p.image.from}, ${p.image.to})` }}
                >
                  <img src={p.thumb} alt={p.name} loading="lazy" />
                </div>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {d && (
        <>
          <h2 style={{ marginTop: 0 }}>Engineering Architecture</h2>
          <div className="dev-grid">
            {devProjects.map((p) => (
              <button key={p.id} className="dev-card" onClick={() => nav({ type: 'project', id: p.id })} title={p.tagline}>
                <div className="dev-card-header">
                  <div className="dev-card-header-left">
                    <div className="dev-card-icon" style={{ background: p.accent }}>
                      <Icon name="code" size={16} style={{ color: '#fff' }} />
                    </div>
                    <span className="dev-card-title">{p.name}</span>
                  </div>
                  {p.private && <Icon name="lock" size={14} style={{ color: 'var(--text-3)' }} />}
                </div>
                <p className="dev-card-tagline">{p.tagline}</p>
                <div className="dev-card-stack">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="dev-card-chip">{t}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
      <h2 style={{ marginTop: 40 }}>Around the Web</h2>
      <div className="start-grid">
        <button className="start-item" onClick={() => ext(profile.linkedin)}>
          <div className="start-thumb" style={{ background: '#0a66c2', display: 'grid', placeItems: 'center' }}>
            <Icon name="linkedin" size={52} />
          </div>
          <span>LinkedIn</span>
        </button>
        <button className="start-item" onClick={() => ext(profile.github)}>
          <div className="start-thumb" style={{ background: '#1b1f24', display: 'grid', placeItems: 'center' }}>
            <Icon name="github" size={52} />
          </div>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  )
}

function ProjectPage({ id, nav }) {
  const p = useMemo(() => projects.find((x) => x.id === id) || devProjects.find((x) => x.id === id), [id])
  if (!p) return <div className="safari-start"><h2>404 — Not Found</h2></div>

  const isDevProj = !!p.stack

  const contactMe = () => {
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(`Let's work together — inspired by ${p.name}`)}` +
      `&body=${encodeURIComponent(`Hi ${profile.shortName},\n\nI saw the ${p.name} case study and would love to talk about a project.\n\n`)}`
  }

  // Case-study layout: text sections interleaved with the gallery images,
  // one at a time.
  const interleaved = []
  if (p.sections) {
    p.sections.forEach((s, i) => {
      interleaved.push({ type: 'section', data: s, key: `s-${i}` })
      if (!isDevProj && p.gallery && p.gallery[i]) interleaved.push({ type: 'image', data: p.gallery[i], key: `i-${i}` })
    })
  }
  if (!isDevProj && p.gallery) {
    p.gallery.slice(p.sections?.length || 0).forEach((u, i) => {
      interleaved.push({ type: 'image', data: u, key: `i-x-${i}` })
    })
  }

  return (
    <div>
      <div className="proj-body">
        <div className="proj-hero">
          <span className="proj-rule" style={{ background: isDevProj ? p.accent : p.image.from }} />
          <h1>{p.name}</h1>
          <p className="proj-tag">{p.tagline}</p>
          <span className="proj-kind">{isDevProj ? 'Software Engineering' : p.kind}</span>
        </div>
        {!isDevProj && <p className="proj-meta">{p.client} · {p.year}</p>}

        {interleaved.map((block) =>
          block.type === 'section' ? (
            <section key={block.key} className="case-section">
              <h3>{block.data.title}</h3>
              <p className="desc">{block.data.text}</p>
            </section>
          ) : (
            <img key={block.key} className="case-img" src={block.data} alt={`${p.name} — case artwork`} loading="lazy" />
          )
        )}

        <div className="chips">
          {(isDevProj ? p.stack : p.deliverables).map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        {p.testimonial && (
          <blockquote className="proj-quote">
            {p.testimonial}
            <footer>— {p.testimonialAuthor}</footer>
          </blockquote>
        )}
        <div className="proj-actions">
          {isDevProj && !p.private && (
            <button className="abtn" onClick={() => window.open(p.url, '_blank')}>
              <Icon name="github" size={16} /> View Source Code
            </button>
          )}
          {isDevProj && p.private && (
            <button className="abtn" disabled style={{ cursor: 'not-allowed', opacity: 0.6 }}>
              <Icon name="lock" size={15} /> Private Infrastructure
            </button>
          )}
          {!isDevProj && (
            <button className="abtn" onClick={contactMe}>
              <Icon name="mailGlyph" size={16} /> Let's Work Together
            </button>
          )}
          <button className="abtn secondary" onClick={() => nav({ type: 'start' })}>
            <Icon name="gridView" size={15} /> Back to All Work
          </button>
        </div>
      </div>
    </div>
  )
}

function ExternalPage({ url, ext }) {
  return (
    <div className="safari-start" style={{ textAlign: 'center', paddingTop: 90 }}>
      <h2>This link lives outside this Mac</h2>
      <p style={{ color: 'var(--text-2)', margin: '0 0 22px' }}>{url}</p>
      <button className="abtn" onClick={() => ext(url)}>
        <Icon name="external" size={15} /> Open in Real Browser
      </button>
    </div>
  )
}
