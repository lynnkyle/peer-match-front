import {createRouter, createWebHistory} from 'vue-router'
import Index from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import User from "../pages/User.vue"
import Search from "../pages/Search.vue"
import UserEdit from '../pages/UserEdit.vue'
import SearchResult from '../pages/SearchResult.vue'
import UserLogin from "../pages/UserLogin.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import UserUpdate from "../pages/UserUpdate.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";

export const routes = [
    {
        path: '/',
        name: 'index',
        title: '首页',
        component: Index,
    },
    {
        path: '/search',
        name: 'search',
        title: '搜索',
        component: Search,
    },
    {
        path: '/team',
        name: 'team',
        title: '队伍',
        component: Team,
    },
    {
        path: '/team/add',
        name: 'teamAdd',
        title: '队伍创建',
        component: TeamAdd,
    },
    {
        path: '/team/update',
        name: 'teamUpdate',
        title: "队伍更新",
        component: TeamUpdate,
    },
    {
        path: '/user',
        name: 'user',
        title: '用户',
        component: User,
    },
    {
        path: '/user/login',
        name: 'userLogin',
        title: '用户登录',
        component: UserLogin
    },
    {
        path: '/user/list',
        name: 'SearchResult',
        title: '搜索结果',
        component: SearchResult
    },
    {
        path: '/user/edit',
        name: 'userEdit',
        title: '编辑信息',
        component: UserEdit
    },
    {
        path: '/user/update',
        name: 'userUpdate',
        title: '用户更新 ',
        component: UserUpdate
    },
    {
        path: '/user/team/join',
        name: 'userTeamJoin',
        title: '已加入队伍',
        component: UserTeamJoin
    },
    {
        path: '/user/team/create',
        name: 'userTeamCreate',
        title: '已创建队伍',
        component: UserTeamCreate
    }
]
export const router = createRouter({
    history: createWebHistory("peer-match"),
    routes: routes
})
export default router;