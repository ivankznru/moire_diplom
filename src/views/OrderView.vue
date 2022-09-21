<template>
  <main class="content container" v-if="sendingLoading">
    <BaseLoader loader-title="Обработка заказа"></BaseLoader>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            Оформление заказа
          </span>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" v-model="formData.name"
                          placeholder="Введите ваше полное имя" name="name"/>

            <BaseFormText title="Адрес доставки" :error="formError.address"
                          v-model="formData.address"
                          placeholder="Введите ваш адрес" name="address"/>

            <BaseFormText title="Телефон" :error="formError.phone" v-model="formData.phone"
                          placeholder="+7(999)-999-99-99" name="address" type="tel"/>

            <BaseFormText title="Email" :error="formError.email" v-model="formData.email"
                          placeholder="Введи ваш Email" name="address" type="email"/>

            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comments"
                              placeholder="Ваши пожелания" name="comments"
                              v-model="formData.comments"/>
          </div>

          <CartOption title="Доставка" name="delivery" :items="deliveriesData"
                      :current-value.sync="currentDelivery"/>

          <CartOption title="Оплата" name="pay" :items="paymentsData"
                      :current-value.sync="currentPayment"/>

        </div>

        <CartBlock v-if="this.deliveriesData" :products="products" :total-price="totalPrice"
                   :total-products="totalProducts" :priceDelivery="currentPriceDelivery">
          <button
            class="cart__button button button--primary" type="submit">
            Оформить заказ
          </button>
        </CartBlock>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseLoader from '@/components/BaseLoader.vue';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import CartBlock from '@/components/CartBlock.vue';
import CartOption from '@/components/CartOption.vue';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'OrderView',
  data() {
    return {
      formData: {},
      formError: {},
      deliveriesData: [],
      paymentsData: [],
      currentDelivery: 1,
      currentPayment: 1,

      sendingLoading: false,
      formErrorMessage: '',
    };
  },
  components: {
    BaseLoader,
    BaseFormText,
    BaseFormTextarea,
    CartBlock,
    CartOption,
  },
  methods: {
    async order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.sendingLoading = true;
      try {
        const response = await axios({
          method: 'POST',
          url: `${API_BASE_URL}/api/orders`,
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
          data: {
            ...this.formData,
            deliveryTypeId: this.currentDelivery,
            paymentTypeId: this.currentPayment,
          },
        });
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        await this.$router.push({
          name: 'orderInfo',
          params: { id: response.data.id },
        });
        this.sendingLoading = false;
        this.formData = {};
      } catch (error) {
        this.formError = error.response.data.error.request || {};
        this.formErrorMessage = error.response.data.error.message
          || error.response.data.error.request.paymentTypeId;
        this.sendingLoading = false;
      }
    },
    async loadDeliveries() {
      const response = await axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/deliveries`,
      });
      this.deliveriesData = response.data;
    },
    async loadPayments() {
      const response = await axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/payments`,
        params: {
          deliveryTypeId: this.currentDelivery,
        },
      });
      this.paymentsData = response.data;
    },
  },
  computed: {
    ...mapGetters({
      totalProducts: 'totalProducts',
      totalPrice: 'cartTotalPrice',
      products: 'cartDetailProducts',
    }),
    currentPriceDelivery() {
      const arr = this.deliveriesData.filter((item) => item.id === this.currentDelivery);
      return arr[0]?.price;
    },
  },
  created() {
    this.loadDeliveries();
    this.loadPayments();
  },
  watch: {
    currentDelivery() {
      this.loadPayments();
    },
  },
};
</script>

<style scoped>

</style>
