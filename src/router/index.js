import { createRouter, createWebHistory } from 'vue-router';
import Start from '../views/StartView.vue';
import Select from '../views/SelectView.vue';
import Result from '../views/ResultView.vue';
import Main from '../views/MainView.vue';
import Out from '../views/OutView.vue';

// 관리자 페이지 관련 컴포넌트
import AdminLayout from '../components/AdminLayout.vue';
import AdminWrite from '../views/admin/AdminWrite.vue';
import AdminPosts from '../views/admin/AdminPosts.vue';

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
        },
        {
            path: '/admin',
            component: AdminLayout,
            children: [
                {
                    path: 'write',
                    name: 'admin-write',
                    component: AdminWrite
                },
                {
                    path: 'posts',
                    name: 'admin-posts',
                    component: AdminPosts
                }
            ]
        }
    ]
});

export default router;
