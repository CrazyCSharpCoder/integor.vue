import ServerError from '@/errorHandling/serverError'

async function handle(url, method = 'GET', body = undefined, asJson = true) {
    const config = {method}

    if (body) {
        config.body = JSON.stringify(body)
        config.headers = {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(url, config)

    if (!response.ok) {
        throw new ServerError(
            'Server returned an error',
            response.body)
    }

    if (asJson)
        return await response.json()

    return await response.text()
}

export {handle}
