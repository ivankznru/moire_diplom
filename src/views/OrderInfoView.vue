<template>
  <main class="content container" v-if="orderData">

    <page-title :title="$options.pageData.pageTitle" :order-data="orderData"/>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            {{ $options.pageData.formDescription }}
          </p>

          <dictionary-list :form="pageForm()"/>

        </div>

      </form>
      <CartBlock :products="products" :total-products="totalProducts"
                 :total-price="totalPrice"
                 :price-delivery="priceDelivery"/>
    </section>
  </main>
</template>

<script>
import CartBlock from '@/components/CartBlock.vue';
import PageTitle from '@/components/PageTitle.vue';
import DictionaryList from '@/components/DictionaryList.vue';

export default {
  name: 'OrderInfoView',
  pageData: {
    pageTitle: 'Заказ оформлен',
    formDescription: `Благодарим за\u00A0выбор нашего магазина. На\u00A0
    Вашу почту придет письмо с\u00A0деталями заказа. Наши менеджеры свяжутся с\u00A0
    Вами в\u00A0течение часа для уточнения деталей доставки.`,
  },
  components: {
    CartBlock,
    PageTitle,
    DictionaryList,
  },
  computed: {
    orderData() {
      return this.$store.state.orderInfo;
    },
    products() {
      return this.orderData.basket.items;
    },
    totalProducts() {
      return this.orderData.basket.items.reduce((acc, item) => item.quantity + acc, 0);
    },
    totalPrice() {
      return this.orderData.totalPrice - Number(this.orderData.deliveryType.price);
    },
    priceDelivery() {
      return this.orderData.deliveryType.price;
    },
  },
  methods: {
    pageForm() {
      return [
        {
          id: 1,
          name: 'Получатель',
          data: this.orderData?.name,
        },
        {
          id: 2,
          name: 'Адрес доставки',
          data: this.orderData?.address,
        },
        {
          id: 3,
          name: 'Телефон',
          data: this.orderData?.phone,
        },
        {
          id: 4,
          name: 'Email',
          data: this.orderData?.email,
        },
        {
          id: 5,
          name: 'Способ оплаты',
          data: this.orderData?.paymentType,
        },
      ];
    },
  },
  watch: {
    '$route.params.id': {
      async handler() {
        await this.$store.dispatch('loadOrderInfoView', +this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
