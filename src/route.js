import { createRouter, createWebHistory } from 'vue-router';
import Legenda from './components/Legenda.vue';
import University from './components/university.vue';

const routes = [
    { path: '/', component: Legenda, name: 'universities' },  
    { path: '/university/:name', component: University, name: 'universityInfo' },  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;  