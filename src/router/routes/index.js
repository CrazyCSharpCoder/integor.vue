import roles from "@/configuration/roles";

import routeNames from "@/router/routeNames";
import auth from "@/router/routes/auth";

import ErrorHandlingPage from "@/components/pages/ErrorHandlingPage";
import IntegorLayoutPage from "@/components/pages/IntegorLayoutPage";
import MyBotsPage from "@/components/pages/myBotsPage/Index";
import BotEventsPage from '@/components/pages/botEventsPage/Index'
import NotFoundPage from "@/components/pages/NotFoundPage";
import ArchivePage from "@/components/pages/ArchivePage";
import MyBotsPageContextActions from "@/components/pages/myBotsPage/ContextActions";
import RecentBotsNavigation from "@/components/pages/botEventsPage/RecentBotsNavigation";

const defaultRoutes = [
    {
        path: '',
        component: IntegorLayoutPage,

        meta: {
            forbidFor: roles.unAuth
        },

        children: [
            {
                name: routeNames.bots,
                path: '',
                components: {
                    default: MyBotsPage,
                    contextActions: MyBotsPageContextActions
                }
            },
            {
                name: routeNames.archive,
                path: 'archive/',
                component: ArchivePage
            },
            {
                name: routeNames.botEvents,
                path: 'bot-:botId/page-:page/',
                components: {
                    default: BotEventsPage,
                    contextActions: RecentBotsNavigation
                }
            },
        ]
    },
    ...auth
]

export default [
    {
        path: '',
        component: ErrorHandlingPage,
        children: defaultRoutes
    },
    {
        path: '/:catchAll(.*)',
        name: routeNames.notFound,
        component: NotFoundPage
    }
]