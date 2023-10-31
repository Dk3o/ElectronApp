import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import MaxSystemView from '../views/MaxSystemView.vue';
import ProjectSetupView from '../views/ProjectSetupView.vue';
import TestView from '../views/Test.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      alias: '/startpage', 
      component: StartView, 
      name: 'Home', 
      meta: { title: 'Home' }, 
      exact: true 
    },
    { 
      path: '/maxsystem', 
      component: MaxSystemView,  
      children: [
        {
          path: 'projectsetup', // Note: No leading slash here
          component: ProjectSetupView,
          name: 'ProjectSetup',
          meta: {
            title: 'Project Setup',
          },
        },
      ],
    },
    { 
      path: '/test', 
      component: TestView, 
      name: 'Test', 
      meta: { title: 'Test' }, 
      exact: true 
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

export default router;