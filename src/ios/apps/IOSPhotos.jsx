import { useEffect, useMemo, useState } from 'react'
import { projects } from '../../content/portfolio.js'
import { useSwipe } from '../../system/ios/useSwipe.js'
import Icon from '../../components/Icon.jsx'

// ============================================================================
//  Photos for iOS — edge-to-edge 3-column grid, full-screen viewer with
//  horizontal swipe between photos.
// ============================================================================

function usePhotos() {
  return useMemo(
    () =>
      projects.flatMap((p) =>
        p.gallery.map((url) => ({
          url,
          caption: p.name,
          projectId: p.id,
          fallback: `linear-gradient(135deg, ${p.image.from}, ${p.image.to})`,
        }))
      ),
    []
  )
}

export default function IOSPhotos({ projectId }) {
  const photos = usePhotos()
  const indexOf = (pid) => Math.max(0, photos.findIndex((ph) => ph.projectId === pid))
  const [viewing, setViewing] = useState(() => (projectId ? indexOf(projectId) : null))

  // Files/Terminal can retarget an already-open Photos app
  useEffect(() => {
    if (projectId) setViewing(indexOf(projectId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  return (
    <div className="ios-photos">
      {viewing === null ? (
        <div className="ios-scroll">
          <h1 className="ios-big-title">Library</h1>
          <div className="ios-pgrid">
            {photos.map((ph, i) => (
              <button
                key={ph.url}
                className="ios-ptile"
                style={{ background: ph.fallback }}
                onClick={() => setViewing(i)}
              >
                <img src={ph.url} alt={ph.caption} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="ios-pcount">{photos.length} Photos</div>
        </div>
      ) : (
        <Viewer photos={photos} index={viewing} setIndex={setViewing} close={() => setViewing(null)} />
      )}
    </div>
  )
}

function Viewer({ photos, index, setIndex, close }) {
  const ph = photos[index]
  const [chrome, setChrome] = useState(true)

  const swipe = useSwipe({
    onSwipeLeft: () => index < photos.length - 1 && setIndex(index + 1),
    onSwipeRight: () => index > 0 && setIndex(index - 1),
    onSwipeDown: close,
  })

  return (
    <div className="ios-pviewer" {...swipe} onClick={() => setChrome((c) => !c)}>
      <div className="ios-pviewer-stage" style={{ background: ph.fallback }}>
        <img src={ph.url} alt={ph.caption} draggable={false} />
      </div>
      {chrome && (
        <>
          <div className="ios-pviewer-top" onClick={(e) => e.stopPropagation()}>
            <button className="ios-back" onClick={close}>
              <Icon name="chevL" size={18} /> Library
            </button>
            <span className="ios-pviewer-count">{index + 1} of {photos.length}</span>
          </div>
          <div className="ios-pviewer-cap">{ph.caption}</div>
        </>
      )}
    </div>
  )
}
