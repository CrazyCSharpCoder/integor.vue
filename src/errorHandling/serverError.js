export default class ServerError extends Error {
    constructor(message, responseBody) {
        super(message)
        this.responseBody = responseBody
    }
}