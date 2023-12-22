import routeNames from "@/router/routeNames";

import AuthenticationPage from "@/components/pages/authenticationPage/Index"

import LoginPage from "@/components/pages/authenticationPage/loginPage/Index"
import RegisterPage from "@/components/pages/authenticationPage/registerPage/Index"

const pathPrefix = 'auth/'

const children = [
    {
        name: routeNames.auth.login,
        path: pathPrefix + 'login/',

        component: LoginPage
    },
    {
        name: routeNames.auth.register,
        path: pathPrefix + 'register/',

        component: RegisterPage
    }
]

export default [
    {
        path: '',
        component: AuthenticationPage,
        children
    }
]