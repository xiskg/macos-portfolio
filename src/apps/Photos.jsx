import { useEffect, useMemo, useState } from 'react'
import { projects } from '../content/portfolio.js'
import Icon from '../components/Icon.jsx'

// Flatten every gallery image of every project into one photo stream
function usePhotos() {
  return useMemo(
    () =>
      projects.flatMap((p) =>
        p.gallery.map((url) => ({
          url,
          caption: p.name,
          projectId: p.id,
          fallback: `linear-gradient(135deg, ${p.image.from}, ${p.image.to})`,
          glyph: p.image.glyph,
        }))
      ),
    []
  )
}

export default function Photos({ projectId }) {
  const photos = usePhotos()
  const indexOf = (pid) => Math.max(0, photos.findIndex((ph) => ph.projectId === pid))
  const [viewing, setViewing] = useState(() => (projectId ? indexOf(projectId) : null))

  // When the window is reused for another image (Finder/Spotlight), follow it
  useEffect(() => {
    if (projectId) setViewing(indexOf(projectId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  return (
    <div className="photos">
      <div className="sidebar" style={{ width: 180 }}>
        <div className="sb-section">Library</div>
        <div className={`sb-item${viewing === null ? ' active' : ''}`} onClick={() => setViewing(null)}>
          <span className="glyph"><Icon name="photos" size={16} /></span>
          All Photos
        </div>
        <div className="sb-section">Albums</div>
        <div className="sb-item" onClick={() => setViewing(null)}>
          <span className="glyph"><Icon name="folderSm" size={16} /></span>
          Projects
        </div>
        <div className="sb-item disabled">
          <span className="glyph"><Icon name="tag" size={15} /></span>
          Favorites
        </div>
      </div>

      {viewing === null ? (
        <div className="photos-main">
          <div className="photos-head">Projects</div>
          <div className="photos-scroll">
            <div className="photos-grid">
              {photos.map((ph, i) => (
                <div
                  key={ph.url}
                  className="ptile"
                  style={{ background: ph.fallback }}
                  onClick={() => setViewing(i)}
                >
                  <img src={ph.url} alt={ph.caption} loading="lazy" />
                  <div className="pcap">{ph.caption}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="statusbar">{photos.length} Photos</div>
        </div>
      ) : (
        <Viewer photos={photos} index={viewing} setIndex={setViewing} close={() => setViewing(null)} />
      )}
    </div>
  )
}

function Viewer({ photos, index, setIndex, close }) {
  const ph = photos[index]
  return (
    <div className="pviewer">
      <div className="pviewer-bar">
        <button className="back" onClick={close}>
          <Icon name="chevL" size={15} /> Projects
        </button>
        <span className="t">{ph.caption} — Hero Image.png</span>
      </div>
      <div className="pviewer-stage">
        <div className="pviewer-img" style={{ background: ph.fallback }}>
          <img src={ph.url} alt={ph.caption} />
        </div>
        {index > 0 && (
          <button className="pnav prev" onClick={() => setIndex(index - 1)} aria-label="Previous">
            <Icon name="chevL" size={18} />
          </button>
        )}
        {index < photos.length - 1 && (
          <button className="pnav next" onClick={() => setIndex(index + 1)} aria-label="Next">
            <Icon name="chevR" size={18} />
          </button>
        )}
        <div className="pviewer-count">{index + 1} of {photos.length}</div>
      </div>
    </div>
  )
}
