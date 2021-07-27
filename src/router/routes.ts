import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') },
      {
        path: '',
        component: () => import('pages/question1.vue'),
      },
      { path: 'question/2', component: () => import('pages/question2.vue') },
      { path: 'elastic/1', component: () => import('pages/elastic1.vue') },
      { path: 'elastic/2', component: () => import('pages/elastic2.vue') },
      { path: 'elastic/3', component: () => import('pages/elastic3.vue') },
      { path: 'elastic/4', component: () => import('pages/elastic4.vue') },
      { path: 'elastic/5', component: () => import('pages/elastic5.vue') },
      { path: 'elastic/6', component: () => import('pages/elastic6.vue') },
      { path: 'dynamo/1', component: () => import('pages/dynamo1.vue') },
      { path: 'dynamo/2', component: () => import('pages/dynamo2.vue') },
      { path: 'dynamo/3', component: () => import('pages/dynamo3.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
