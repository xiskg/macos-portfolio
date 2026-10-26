import test from 'node:test'
import assert from 'node:assert/strict'
import worker from './media.js'

const url = 'https://dealmeida.me/product-design/assets/video/fastgovbid-walkthrough.mp4'
const bytes = new Uint8Array(100).map((_, i) => i)
const env = {ASSETS: {fetch: async request => new Response(request.method === 'HEAD' ? null : bytes, {
  headers: {'Content-Length': '100', 'Content-Type': 'video/mp4', ETag: '"video-v1"'},
})}}

for (const [range, status, start, end] of [
  ['bytes=0-1', 206, 0, 1], ['bytes=90-', 206, 90, 99],
  ['bytes=-7', 206, 93, 99], ['bytes=90-500', 206, 90, 99],
  ['bytes=100-', 416], ['bytes=-0', 416], ['bytes=7-2', 416],
  ['bytes=invalid', 416], ['bytes=0-1,5-6', 200], ['other=0-1', 200],
]) test(range, async () => {
  const response = await worker.fetch(new Request(url, {headers: {Range: range}}), env)
  assert.equal(response.status, status)
  if (status === 206) {
    assert.equal(response.headers.get('Content-Range'), `bytes ${start}-${end}/100`)
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes.slice(start, end + 1))
  }
  if (status === 416) assert.equal(response.headers.get('Content-Range'), 'bytes */100')
})

test('HEAD advertises ranges without a response body', async () => {
  const response = await worker.fetch(new Request(url, {method: 'HEAD', headers: {Range: 'bytes=0-1'}}), env)
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Accept-Ranges'), 'bytes')
  assert.equal((await response.arrayBuffer()).byteLength, 0)
})

test('stale If-Range returns the full current video', async () => {
  const response = await worker.fetch(new Request(url, {headers: {Range: 'bytes=0-1', 'If-Range': '"old"'}}), env)
  assert.equal(response.status, 200)
  assert.equal((await response.arrayBuffer()).byteLength, 100)
})

test('matching If-Range returns the requested bytes', async () => {
  const response = await worker.fetch(new Request(url, {headers: {Range: 'bytes=0-1', 'If-Range': '"video-v1"'}}), env)
  assert.equal(response.status, 206)
})

test('other paths pass through without transformation', async () => {
  const response = new Response('original', {status: 404})
  assert.equal(await worker.fetch(new Request('https://dealmeida.me/other'), {ASSETS: {fetch: async () => response}}), response)
})
