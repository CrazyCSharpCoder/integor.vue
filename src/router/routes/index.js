import routeNames from "@/router/routeNames";

import IntegorLayoutPage from "@/components/pages/IntegorLayoutPage";
import MyBotsPage from "@/components/pages/myBotsPage/Index";
import BotEventsPage from '@/components/pages/botEventsPage/Index'

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
                name: routeNames.botEvents,
                path: 'bot-:botId/page-:page',
                component: BotEventsPage
            }
        ]
    },
]