import {errorHandlerInternal} from "@/helpers/errorHandler";
import {emitter} from "@/helpers/appEvents";

import {createRouter, createWebHistory} from "vue-router";
import roles from "@/configuration/roles";
import store from "@/store"

import routes from "@/router/routes";
import validations from "@/router/validations";

import routeNames from "@/router/routeNames";
import {ServerError} from "@/errorHandling/serverErrors";

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
    let userRole

    try {
        await store.dispatch('loadUser')
    }
    catch (error) {
        if (error instanceof ServerError && error.statusCode == 401) {
            userRole = roles.unAuth
        }
        else if (!from || !from.name) {
            await next()
            // Костыль, потому что иначе не работает
            setTimeout(() => errorHandlerInternal(error, emitter), 400)
        }
        else {
            errorHandlerInternal(error, emitter)
        }
    }

    if (!store.getters.user) {
        userRole = roles.unAuth
    }

    if (userRole !== roles.unAuth) {
        userRole = store.getters['user'].role.id
    }

    let hasAccess = validations.roleHasAccess(userRole, to)

    if (!hasAccess)
        await next({name: routeNames.auth.login})
    else
        await next()
})

export default router