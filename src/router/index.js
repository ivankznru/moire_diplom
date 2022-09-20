import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import MainView from '@/views/MainView';
// eslint-disable-next-line import/extensions
import ProductView from '@/views/ProductView';
// eslint-disable-next-line import/extensions
import CartView from '@/views/CartView';
// eslint-disable-next-line import/extensions
import OrderView from '@/views/OrderView';
// eslint-disable-next-line import/extensions
import OrderRegistrationView from '@/views/OrderRegistrationView';
// eslint-disable-next-line import/extensions
import notFoundView from '@/views/notFoundView';

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
  {
    name: 'order',
    component: OrderView,
    path: '/order',
  },
  {
    name: 'orderRegistration',
    component: OrderRegistrationView,
    path: '/order/:id',
  },
  {
    name: 'notFound',
    component: notFoundView,
    path: '*',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
