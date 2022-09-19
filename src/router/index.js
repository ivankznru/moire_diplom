import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import MainView from '@/views/MainView';
// eslint-disable-next-line import/extensions
import ProductView from '@/views/ProductView';
// eslint-disable-next-line import/extensions
import CartView from '@/views/CartView';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainView,
    path: '/',
  },
  {
    name: 'product',
    component: ProductView,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: CartView,
    path: '/cart',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
