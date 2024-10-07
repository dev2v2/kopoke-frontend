import { createRouter, createWebHistory } from 'vue-router';
import Start from '../views/StartView.vue';
import Select from '../views/SelectView.vue';
import Result from '../views/ResultView.vue';
import Main from '../views/MainView.vue';
import Out from '../views/OutView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL || '/'),
    routes: [
        {
            path: '/',
            redirect: '/start'
        },
        {
            path: '/start',
            name: 'start',
            component: Start
        },
        {
            path: '/select',
            name: 'select',
            component: Select
        },
        {
            path: '/result',
            name: 'result',
            component: Result
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/out',
            name: 'out',
            component: Out
        }
    ]
});

export default router;
