import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import(/* webpackChunkName: "upload" */ './views/Upload.vue'),
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import(/* webpackChunkName: "collection" */ './views/Collection.vue'),
    },
  ],
});
