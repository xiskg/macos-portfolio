import test from 'node:test'
import assert from 'node:assert/strict'
import worker from './media.js'
for (const path of ['/branding', '/branding/']) test(`Designer alias ${path}`, async () => {
 let actual
 const response = await worker.fetch(new Request('https://dealmeida.me'+path+'?case=checksy'), {ASSETS: {fetch: async request => {actual = new URL(request.url); return new Response('designer')}}})
 assert.equal(actual.pathname, '/')
 assert.equal(actual.search, '?case=checksy')
 assert.equal(await response.text(), 'designer')
})
for (const path of ['/', '/dev/', '/dev/resume/', '/product-design/', '/product-design/work/fastgovbid/']) test(`Pass through ${path}`, async () => {
 let actual
 await worker.fetch(new Request('https://dealmeida.me'+path), {ASSETS: {fetch: async request => {actual = new URL(request.url).pathname; return new Response('ok')}}})
 assert.equal(actual, path)
})
