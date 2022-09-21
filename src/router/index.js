import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '@/views/MainView.vue';
import ProductView from '@/views/ProductView.vue';
import CartView from '@/views/CartView.vue';
import OrderView from '@/views/OrderView.vue';
import OrderInfoView from '@/views/OrderInfoView.vue';
import notFoundView from '@/views/notFoundView.vue';

Vue.use(VueRouter);

const routes = [{
  name: 'main',
  component: MainView,
  path: '/',
}, {
  name: 'product',
  component: ProductView,
  path: '/product/:id',
}, {
  name: 'cart',
  component: CartView,
  path: '/cart',
}, {
  name: 'order',
  component: OrderView,
  path: '/order',
}, {
  name: 'orderInfo',
  component: OrderInfoView,
  path: '/order/:id',
}, {
  name: 'notFound',
  component: notFoundView,
  path: '*',
}];

const router = new VueRouter({
  routes,
});

export default router;
