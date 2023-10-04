import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import MaxSystemView from '../views/MaxSystemView.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
      alias: '/start'
    },
    {
      path: '/maxsystem',
      name: 'maxsystem',
      component: MaxSystemView,
    }, 
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

export default router;