import {ServerError, ConnectionFailedError} from '@/errorHandling/serverErrors'
import appEvents from "@/helpers/appEvents";

const errorTypesToEvents = [
    {
        error: ServerError,
        event: appEvents.errors.serverError
    },
    {
        error: ConnectionFailedError,
        event: appEvents.connection.connectionFailedError
    }
]

function getErrorEvent(error) {
    for (let typeToEvent of errorTypesToEvents) {
        if (error instanceof typeToEvent.error)
            return typeToEvent.event
    }

    return appEvents.errors.applicationError
}

export function errorHandlerInternal(error, emitter) {
    const emittedEvent = getErrorEvent(error)
    emitter.emit(emittedEvent, error)
}

export default function (error, component) {
    errorHandlerInternal(error, component.$emitter)
}