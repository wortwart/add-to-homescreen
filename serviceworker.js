'use strict'
const cacheName = 'app-v1' // change when cached content is updated
const pathRoot = (location.host === 'localhost')?
	'/Woerter.de/projects/add-to-homescreen/' : // local directory
	'/projects/add-to-homescreen/' // online directory
const urlsToCache = [
	'',
	'index.html',
	'eins.html',
	'zwei.html',
	'app.js',
	'style.css',
	'manifest.json'
]

self.addEventListener('install', ev => {
	ev.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			cache.addAll(urlsToCache.map(el => pathRoot + el))
		})
	)
})

self.addEventListener('activate', ev => {
	ev.waitUntil(
		caches
		.keys()
		.then(keyList => {
			keyList.forEach(key => {
				if (key !== cacheName)
					caches.delete(key)
			})
		})
	)
	return self.clients.claim();
})

self.addEventListener('fetch', ev => {
	ev.respondWith(
		caches
		.match(ev.request)
		.then(response => {
			if (response) return response
			return fetch(ev.request)
		})
	)
})
