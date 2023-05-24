import routeNames from "@/router/routeNames";

import IntegorLayoutPage from "@/components/pages/IntegorLayoutPage";
import MyBotsPage from "@/components/pages/myBotsPage/Index";
import BotEventsPage from '@/components/pages/botEventsPage/Index'
import NotFoundPage from "@/components/pages/NotFoundPage";
import ArchivePage from "@/components/pages/ArchivePage";
import MyBotsPageContextActions from "@/components/pages/myBotsPage/ContextActions";

export default [
    {
        path: '',
        component: IntegorLayoutPage,

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