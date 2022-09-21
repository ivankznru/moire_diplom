import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],

    orderInfo: null,
    error: false,
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.colors[0] ? product.colors[0].gallery[0].file.url : 0,
            color: product.colors[0].color.code,
            colorTitle: product.colors[0].color.title,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      // eslint-disable-next-line max-len
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    totalProducts(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.amount) + acc, 0);
    },
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      basketItemId,
      amount,
    }) {
      // eslint-disable-next-line no-shadow
      const item = state.cartProducts.find((item) => item.basketItemId === basketItemId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteProduct(state, basketItemId) {
      state.cartProducts = state.cartProducts.filter((item) => item.basketItemId !== basketItemId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
        sizeId: item.size.id,
        colorId: item.color.color.id,
        basketItemId: item.id,
        size: item.size,
        params: item.product.colors.filter((p) => p.color.id === item.color.color.id),
      }));
    },
    updateError(state, value) {
      state.error = value;
    },
  },
  actions: {
    async loadCart(context) {
      const response = await axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/baskets`,
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      });
      if (!context.state.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey);
      }
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
    async addProductToCart(context, {
      productId,
      amount,
      colorId,
      sizeId,
    }) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${API_BASE_URL}/api/baskets/products`,
          data: {
            productId,
            quantity: amount,
            colorId,
            sizeId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
        context.commit('updateError', false);
      } catch {
        context.commit('updateError', true);
      }
    },
    async updateCartProductAmount(context, {
      basketItemId,
      amount,
    }) {
      context.commit('updateCartProductAmount', {
        basketItemId,
        amount,
      });
      if (amount < 1) {
        return;
      }
      const response = await axios({
        method: 'PUT',
        url: `${API_BASE_URL}/api/baskets/products`,
        data: {
          basketItemId,
          quantity: amount,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      });
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
    async deleteProductCart(context, basketItemId) {
      context.commit('deleteProduct', basketItemId);
      try {
        const response = await axios({
          url: `${API_BASE_URL}/api/baskets/products`,
          method: 'DELETE',
          data: {
            basketItemId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit('updateCartProductsData', response.data.items);
      } catch {
        context.commit('syncCartProducts');
      }
    },
    async loadOrderInfoView(context, orderId) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${API_BASE_URL}/api/orders/${orderId}`,
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit('updateOrderInfo', response.data);
      } catch {
        await router.replace({ name: 'notFound' });
      }
    },
  },
});
