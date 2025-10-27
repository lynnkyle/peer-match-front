import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index,
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
        },
        {
            path: '/team',
            name: 'team',
            component: Team,
        },
        {
            path: '/user',
            name: 'user',
            component: User,
        },
    ],
})
export default router;