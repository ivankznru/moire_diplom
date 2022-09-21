<template>
  <main class="content container" v-if="orderData">
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
          <router-link class="breadcrumbs__link" :to="{ name: 'order' }">
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderData.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей
            доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderData.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderData.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderData.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderData.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderData.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <CartBlock :products="products" :total-products="totalProducts"
                   :total-price="totalPrice"
                   :price-delivery="priceDelivery"/>
      </form>
    </section>
  </main>
</template>

<script>
import CartBlock from '@/components/CartBlock.vue';

export default {
  name: 'OrderInfoView',
  components: { CartBlock },
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
      return this.orderData.totalPrice;
    },
    priceDelivery() {
      return this.orderData.deliveryType.price;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.$store.dispatch('loadOrderInfoView', +this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
