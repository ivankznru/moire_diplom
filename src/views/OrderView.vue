<template>
  <main class="content container" v-if="sendingLoading">
    <BaseLoader loader-title="Обработка заказа"></BaseLoader>
  </main>
  <main class="content container" v-else>

    <page-title :title="$options.pageData.pageTitle" :items="paths()"/>

    <section class="cart">

      <form-generation
        ref="form"
        :data="formData"
        :form="forms"
        :button-text="$options.pageData.pageButtonText"
        @submit="order"/>

      <div class="cart__info">
        <check-out-cart
          :button-text="$options.pageData.pageButtonText"
          :deliveries-data="deliveriesData"
          :products="products"
          :total-price="totalPrice"
          :total-products="totalProducts"
          :current-price-delivery="currentPriceDelivery"
          :submit="onSubmit"/>
        <base-form-error-block :form-error-message="formErrorMessage"/>
      </div>

    </section>
  </main>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import BaseFormErrorBlock from '@/components/BaseFormErrorBlock.vue';
import formGeneration from '@/components/FormGeneration.vue';
import CheckOutCart from '@/components/CheckOutCart.vue';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'OrderView',
  pageData: {
    pageTitle: 'Оформление заказа',
    pageButtonText: 'Оформить заказ',
  },
  data() {
    return {
      formData: {},
      // formError: {},
      deliveriesData: [],
      paymentsData: [],
      sendingLoading: false,
      formErrorMessage: '',
    };
  },
  components: {
    PageTitle,
    BaseLoader,
    formGeneration,
    CheckOutCart,
    BaseFormErrorBlock,
  },
  methods: {
    onSubmit() {
      this.$refs.form.checkForm();
    },
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
        // this.formError = await error.response.data.error.request || {};
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
          deliveryTypeId: this.formData.deliveryTypeId || 1,
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
    forms() {
      const forms = [
        {
          title: 'ФИО',
          placeholder: 'Введите ваше полное имя',
          field: 'BaseFormText',
          model: 'name',
          rules: ['required', 'name'],
          type: 'text',
        },
        {
          title: 'Адрес доставки',
          placeholder: 'Введите ваш адрес',
          field: 'BaseFormText',
          model: 'address',
          rules: ['required'],
          type: 'text',
        },
        {
          title: 'Телефон',
          placeholder: '+7(999)-999-99-99',
          field: 'BaseFormText',
          model: 'phone',
          rules: ['required', 'tel'],
          type: 'tel',
        },
        {
          title: 'Email',
          placeholder: 'Введи ваш Email',
          field: 'BaseFormText',
          model: 'email',
          rules: ['required', 'email'],
          type: 'email',
        },
        {
          title: 'Комментарий к заказу',
          placeholder: 'Ваши пожелания',
          field: 'BaseFormTextarea',
          rules: ['comments'],
          model: 'comments',
        },
      ];
      if (this.deliveriesData && this.deliveriesData.length) {
        forms.push(
          {
            title: 'Доставка',
            field: 'CartOption',
            model: 'deliveryTypeId',
            items: this.deliveriesData,
            value: 1,
            rules: ['deliveries'],
          },
        );
      }
      if (this.paymentsData && this.paymentsData.length) {
        forms.push(
          {
            title: 'Оплата',
            field: 'CartOption',
            model: 'paymentTypeId',
            items: this.paymentsData,
            value: 1,
            rules: ['payment'],
          },
        );
      }
      return forms;
    },
    currentPriceDelivery() {
      const arr = this.deliveriesData
        .filter((item) => item.id === this.$refs.form.data.deliveryTypeId);
      return arr[0]?.price;
    },
  },
  async created() {
    await Promise.all([this.loadDeliveries(), this.loadPayments()]);
  },
  watch: {
    currentPriceDelivery() {
      this.loadPayments();
    },
  },
};
</script>

<style scoped>

</style>
