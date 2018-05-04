'use strict'

+function() {
	if (!('serviceWorker' in navigator)) {
		alert('This Browser does not support ServiceWorkers.')
		return
	}

	if (navigator.serviceWorker.controller) {
		console.info('ServiceWorker runs')
		return
	}

	console.info('Registering ServiceWorker ...')
	navigator.serviceWorker
	.register('./serviceworker.js')
	.catch(function(err) {
		console.error('ServiceWorker has not been registered!', err)
	})
}()

if (location.search)
	if (location.search.slice(1) === 'from_hs')
		document.querySelector('h1').insertAdjacentHTML('afterend', '<h2>Hey, I\'m an app!</h2>')