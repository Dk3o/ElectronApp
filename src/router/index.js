import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import MaxSystemView from '../views/MaxSystemView.vue';
import TestView from '../views/Test.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', alias: '/startpage', component: StartView, name: 'Home', meta: { title: 'Home' }, exact: true },
    { path: '/maxsystem', component: MaxSystemView, name: 'MaxSystem', meta: { title: 'Max System' }, exact: true },
    { path: '/test', component: TestView, name: 'Test', meta: { title: 'Test' }, exact: true },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

export default router;