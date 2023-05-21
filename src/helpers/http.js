import {ServerError, ConnectionFailedError} from '@/errorHandling/serverErrors'

function appendQuery(url, queryParams) {
    return url + '?' + new URLSearchParams(queryParams)
}

async function handle(url, params, asJson = true) {
    const config = {method: params?.method ?? 'GET'}

    if (params?.body) {
        config.body = JSON.stringify(params.body)
        config.headers = {
            "Content-Type": "application/json"
        }
    }

    if (params?.queryParams && Object.keys(params.queryParams).length)
        url = appendQuery(url, params.queryParams)

    try {
        var response = await fetch(url, config)
    }
    catch {
        throw new ConnectionFailedError('Could not connect to the server')
    }

    if (!response.ok) {
        throw new ServerError(
            'Server returned an error',
            response.status,
            await response.json())
    }

    if (asJson)
        return await response.json()

    return await response.text()
}

export {handle}
