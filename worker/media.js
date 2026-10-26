// The static asset service ignores Range. Only this small, known video passes
// through this handler; pages, screenshots, fonts and PDFs stay on static serving.
import video from './video-meta.json' with {type: 'json'}
const VIDEO = '/product-design/assets/video/fastgovbid-walkthrough.mp4'
const MAX_VIDEO_BYTES = 8 * 1024 * 1024

export default {
  /** @param {Request} request @param {Env} env */
  async fetch(request, env) {
    if (new URL(request.url).pathname !== VIDEO || !['GET', 'HEAD'].includes(request.method)) {
      return env.ASSETS.fetch(request)
    }
    const sourceRequest = new Request(request)
    sourceRequest.headers.delete('Range')
    sourceRequest.headers.delete('If-Range')
    const source = await env.ASSETS.fetch(sourceRequest)
    if (source.status !== 200) return source

    // ASSETS may omit Content-Length inside the binding even when the outer
    // HTTP response includes it. The build records this exact file's length.
    const size = Number(source.headers.get('Content-Length') || video.byteLength)
    if (!Number.isSafeInteger(size) || size <= 0 || size > MAX_VIDEO_BYTES) return source
    const headers = new Headers(source.headers)
    headers.set('Accept-Ranges', 'bytes')
    headers.set('Content-Length', String(size))
    const range = request.headers.get('Range')
    const validator = request.headers.get('If-Range')
    if (request.method === 'HEAD' || !range || (validator && validator !== source.headers.get('ETag'))) {
      return new Response(source.body, {status: 200, headers})
    }
    // Multiple ranges and unknown units may be ignored under HTTP semantics.
    if (!range.startsWith('bytes=') || range.includes(',')) {
      return new Response(source.body, {status: 200, headers})
    }
    const match = /^bytes=(\d*)-(\d*)$/.exec(range)
    let start = NaN, end = size - 1
    if (match && (match[1] || match[2])) {
      if (!match[1]) start = Math.max(0, size - Number(match[2]))
      else {
        start = Number(match[1])
        if (match[2]) end = Math.min(Number(match[2]), size - 1)
      }
    }
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= size) {
      await source.body?.cancel()
      return new Response(null, {status: 416, headers: {'Content-Range': `bytes */${size}`, 'Accept-Ranges': 'bytes'}})
    }
    // Bounded by the checked length of this single 5.9 MB build asset.
    const bytes = await source.arrayBuffer()
    headers.set('Content-Range', `bytes ${start}-${end}/${size}`)
    headers.set('Content-Length', String(end - start + 1))
    return new Response(bytes.slice(start, end + 1), {status: 206, headers})
  },
}
