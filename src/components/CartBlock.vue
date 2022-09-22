<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.basketItemId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.product.price | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
        <span class="center">х {{ item.amount || item.quantity }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p v-if="priceDelivery">Доставка: <b>{{ priceDelivery }} ₽</b></p>
      <p>Итого: <b>{{ totalProducts }}
        {{ stringProduct(totalProducts) }}</b> на
        сумму
        <b>{{ totalPrice | numberFormat }} ₽</b>
      </p>
    </div>

    <slot/>
  </div>
</template>

<script>
import stringProduct from '@/helpers/stringProduct';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartBlock',
  props: {
    products: {},
    totalPrice: {},
    totalProducts: {},
    priceDelivery: {
      default: 0,
    },
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      stringProduct,
    };
  },
};

</script>

<style lang="scss">
.center {
  text-align: center;
}
</style>
