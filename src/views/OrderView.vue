<template>
  <main class="content container" v-if="sendingLoading">
    <BaseLoader loader-title="Обработка заказа"></BaseLoader>
  </main>
  <main class="content container" v-else>

    <page-title :title="$options.pageData.pageTitle" :items="paths()"/>

    <section class="cart">

      <form-generation
        :error="formError"
        :data="formData"
        :form="$options.pageData.forms"
        :submit-form="order"
        :button-text="$options.pageData.pageButtonText"
        :form-error-message="formErrorMessage"
        :deliveries-data="deliveriesData"
        :products="products"
        :total-price="totalPrice"
        :total-products="totalProducts"
        :current-price-delivery="currentPriceDelivery"
        @sendForm="order()">

        <CartOption title="Доставка" name="delivery" :items="deliveriesData"
                    :current-value.sync="currentDelivery"/>

        <CartOption title="Оплата" name="pay" :items="paymentsData"
                    :current-value.sync="currentPayment"/>
      </form-generation>

    </section>
  </main>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import BaseLoader from '@/components/BaseLoader.vue';
// import BaseFormErrorBlock from '@/components/BaseFormErrorBlock.vue';
import CartOption from '@/components/CartOption.vue';
import formGeneration from '@/components/FormGeneration.vue';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'OrderView',
  pageData: {
    pageTitle: 'Оформление заказа',
    pageButtonText: 'Оформить заказ',
    forms: [
      {
        id: 1,
        title: 'ФИО',
        placeholder: 'Введите ваше полное имя',
        field: 'BaseFormText',
        model: 'name',
        rules: ['required'],
        type: 'text',
      },
      {
        id: 2,
        title: 'Адрес доставки',
        placeholder: 'Введите ваш адрес',
        field: 'BaseFormText',
        model: 'address',
        rules: ['required'],
        type: 'text',
      },
      {
        id: 3,
        title: 'Телефон',
        placeholder: '+7(999)-999-99-99',
        field: 'BaseFormText',
        model: 'phone',
        rules: ['required', 'tel'],
        type: 'tel',
      },
      {
        id: 4,
        title: 'Email',
        placeholder: 'Введи ваш Email',
        field: 'BaseFormText',
        model: 'email',
        rules: ['required'],
        type: 'email',
      },
      {
        id: 5,
        title: 'Комментарий к заказу',
        placeholder: 'Ваши пожелания',
        field: 'BaseFormTextarea',
        model: 'comments',
      },
    ],
  },
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
    PageTitle,
    BaseLoader,
    formGeneration,
    // BaseFormErrorBlock,
    CartOption,
  },
  methods: {
    paths() {
      return [
        {
          id: 1,
          name: 'cart',
          title: 'Корзина',
        },
        {
          id: 2,
          title: `${this.$options.pageData.pageTitle}`,
        },
      ];
    },
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
