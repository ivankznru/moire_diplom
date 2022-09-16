import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from "@/views/MainView";
import ProductView from "@/views/ProductView";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
