import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/user/login';
import AttentionsList from '../components/attentions/AttentionsList';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/atenciones',
            name: 'attentions',
            component: AttentionsList
        }
    ]
});