import ServerError from '@/errorHandling/serverError'

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
