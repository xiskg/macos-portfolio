import { useEffect, useMemo, useState } from 'react'
import { profile, projects, devProjects } from '../../content/portfolio.js'
import Icon from '../../components/Icon.jsx'

// ============================================================================
//  Safari for iOS — same routes as the desktop app, but with the address bar
//  at the bottom (iOS 15+ style) and touch-sized everything.
// ============================================================================

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

export default function IOSSafari({ url }) {
  const [route, setRoute] = useState(() => routeFor(url))
  const [hist, setHist] = useState(() => ({ stack: [routeFor(url)], idx: 0 }))

  useEffect(() => {
    if (!url) return
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
    <div className="ios-safari">
      <div className="ios-scroll">
        {route.type === 'start' && <StartPage nav={nav} ext={ext} />}
        {route.type === 'project' && <ProjectPage id={route.id} nav={nav} />}
        {route.type === 'external' && <ExternalPage url={route.url} ext={ext} />}
      </div>
      <div className="ios-safari-bar">
        <button className="ios-sbtn" disabled={hist.idx === 0} onClick={() => go(-1)} aria-label="Back">
          <Icon name="chevL" size={20} />
        </button>
        <button
          className="ios-sbtn"
          disabled={hist.idx >= hist.stack.length - 1}
          onClick={() => go(1)}
          aria-label="Forward"
        >
          <Icon name="chevR" size={20} />
        </button>
        <button className="ios-address" onClick={() => nav({ type: 'start' })}>
          <Icon name="globeSm" size={13} />
          <span>{addressFor(route)}</span>
        </button>
        <button className="ios-sbtn" onClick={() => nav(route)} aria-label="Reload">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 12 a8 8 0 1 1 -2.3 -5.6" />
            <path d="M20 3 v4 h-4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function StartPage({ nav, ext }) {
  return (
    <div className="ios-spage">
      <h1>Favorites</h1>
      <div className="ios-sgrid">
        {projects.map((p) => (
          <button key={p.id} className="ios-sitem" onClick={() => nav({ type: 'project', id: p.id })}>
            <div
              className="ios-sthumb"
              style={{ background: `linear-gradient(135deg, ${p.image.from}, ${p.image.to})` }}
            >
              <img src={p.thumb} alt={p.name} loading="lazy" />
            </div>
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      <h1>Tech Projects</h1>
      <div className="ios-sgrid">
        {devProjects.map((p) => (
          <button key={p.id} className="ios-sitem" onClick={() => ext(p.url)} title={p.tagline}>
            <div className="ios-sthumb" style={{ background: p.accent, display: 'grid', placeItems: 'center' }}>
              <Icon name="code" size={44} style={{ color: '#fff' }} />
            </div>
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      <h1>Around the Web</h1>
      <div className="ios-sgrid">
        <button className="ios-sitem" onClick={() => ext(profile.linkedin)}>
          <div className="ios-sthumb" style={{ background: '#0a66c2', display: 'grid', placeItems: 'center' }}>
            <Icon name="linkedin" size={40} />
          </div>
          <span>LinkedIn</span>
        </button>
        <button className="ios-sitem" onClick={() => ext(profile.github)}>
          <div className="ios-sthumb" style={{ background: '#1b1f24', display: 'grid', placeItems: 'center' }}>
            <Icon name="github" size={40} />
          </div>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  )
}

function ProjectPage({ id, nav }) {
  const p = useMemo(() => projects.find((x) => x.id === id), [id])
  if (!p) return <div className="ios-spage"><h1>404 — Not Found</h1></div>

  const contactMe = () => {
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(`Let's work together — inspired by ${p.name}`)}` +
      `&body=${encodeURIComponent(`Hi ${profile.shortName},\n\nI saw the ${p.name} case study and would love to talk about a project.\n\n`)}`
  }

  const interleaved = []
  p.sections.forEach((s, i) => {
    interleaved.push({ type: 'section', data: s, key: `s-${i}` })
    if (p.gallery[i]) interleaved.push({ type: 'image', data: p.gallery[i], key: `i-${i}` })
  })
  p.gallery.slice(p.sections.length).forEach((u, i) => {
    interleaved.push({ type: 'image', data: u, key: `i-x-${i}` })
  })

  return (
    <div className="ios-proj">
      <div className="ios-proj-hero">
        <span className="ios-proj-rule" style={{ background: p.image.from }} />
        <h1>{p.name}</h1>
        <p className="ios-proj-tag">{p.tagline}</p>
        <span className="ios-proj-kind">{p.kind}</span>
      </div>
      <p className="ios-proj-meta">{p.client} · {p.year}</p>

      {interleaved.map((block) =>
        block.type === 'section' ? (
          <section key={block.key} className="ios-case-section">
            <h3>{block.data.title}</h3>
            <p>{block.data.text}</p>
          </section>
        ) : (
          <img key={block.key} className="ios-case-img" src={block.data} alt={`${p.name} — case artwork`} loading="lazy" />
        )
      )}

      <div className="ios-chips">
        {p.deliverables.map((t) => <span key={t} className="ios-chip">{t}</span>)}
      </div>
      <blockquote className="ios-proj-quote">
        {p.testimonial}
        <footer>— {p.testimonialAuthor}</footer>
      </blockquote>
      <div className="ios-proj-actions">
        <button className="ios-abtn" onClick={contactMe}>
          <Icon name="mailGlyph" size={16} /> Let's Work Together
        </button>
        <button className="ios-abtn secondary" onClick={() => nav({ type: 'start' })}>
          Back to All Work
        </button>
      </div>
    </div>
  )
}

function ExternalPage({ url, ext }) {
  return (
    <div className="ios-spage" style={{ textAlign: 'center', paddingTop: 80 }}>
      <h1>This link lives outside this iPhone</h1>
      <p style={{ color: 'var(--text-2)', margin: '0 0 22px' }}>{url}</p>
      <button className="ios-abtn" onClick={() => ext(url)}>
        <Icon name="external" size={15} /> Open in Real Browser
      </button>
    </div>
  )
}
