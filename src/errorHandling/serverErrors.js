export class ServerError extends Error {
    constructor(message, statusCode, responseBody) {
        super(message)
        this.statusCode = statusCode
        this.responseBody = responseBody
    }
}

export class ConnectionFailedError extends Error {
    constructor(message) {
        super(message);
    }
}