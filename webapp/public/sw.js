const cacheName = 'cache-1.0.0'

const criticalFiles = [
    'confetti.js',
    'index.js',
    'index.css',
    'index.html',
]

const fileUris = []
criticalFiles.forEach((file) => {
    fileUris.push(file)
})

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then(async (cache) => {
            try {
                await cache.addAll(fileUris)
                console.log('[SW] Все критичные файлы теперь в кэше')
                return self.skipWaiting()
            } catch (error) {
                console.error('[SW] Ошибка кэширования критичных файлов')
                console.error(error)
            }
        })
    )
})

self.addEventListener('fetch', async (event) => {
    const request = event.request

    if (!request.url.startsWith('https')) {
        // console.log('[SW] Ignore non-http request (mode: ' + request.mode + ')', request.url)
        return
    }

    if (request.method === 'POST') {
        // console.log('[SW] Ignore POST request (mode: ' + request.mode + ')', request.url)
        return
    }

    event.respondWith(networkFirst(request))
})

self.addEventListener('activate', async (event) => {
    console.log('[SW] Event: Activate')

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    // eslint-disable-next-line consistent-return
                    (cacheNames || []).forEach((cache) => {
                        if (cache !== cacheName) {
                            return caches.delete(cache)
                        }
                    })
                )
            })
            .then(() => {
                console.log('[SW] Старый кэш очищен')
                return self.clients.claim()
            })
    )
})

async function networkFirst(request) {
    const cache = await caches.open(cacheName)

    const requestUrl = modifyRequestUrl(request.url)
    request.url = requestUrl

    try {
        const networkResponse = await fetch(request)
        cache
            .put(requestUrl, networkResponse.clone())
            .catch((err) => {
                console.warn(requestUrl, err.message)
            })
        return networkResponse
    } catch (error) {
        return cache.match(requestUrl)
    }
}
