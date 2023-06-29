import bots from "@/helpers/appEvents/bots";
import errors from "@/helpers/appEvents/errors";
import connection from "@/helpers/appEvents/connection";
import history from "@/helpers/appEvents/history";
import botEvents from "@/helpers/appEvents/botEvents";
import user from "@/helpers/appEvents/user"

import mitt from "mitt"
const emitter = mitt()

export {emitter}

export default {
    bots,
    errors,
    connection,
    history,
    botEvents,
    user
}