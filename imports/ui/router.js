import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Protected from './views/Protected.vue';
import Public from './views/Public.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/public',
      name: 'public',
      component: Public,
    },
    {
      path: '/protected',
      name: 'protected',
      component: Protected,
    },
  ],
})
