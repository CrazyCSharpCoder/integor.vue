import routeNames from "@/router/routeNames";

import IntegorLayoutPage from "@/components/pages/IntegorLayoutPage";
import MyBotsPage from "@/components/pages/myBotsPage/Index";
import BotEventsPage from '@/components/pages/botEventsPage/Index'
import NotFoundPage from "@/components/pages/NotFoundPage";
import ArchivePage from "@/components/pages/ArchivePage";

export default [
    {
        path: '',
        component: IntegorLayoutPage,

        children: [
            {
                name: routeNames.bots,
                path: '',
                component: MyBotsPage
            },
            {
                name: routeNames.archive,
                path: 'archive',
                component: ArchivePage
            },
            {
                name: routeNames.botEvents,
                path: 'bot-:botId/page-:page',
                component: BotEventsPage
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: routeNames.notFound,
        component: NotFoundPage
    }
]