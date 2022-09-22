<template>
  <CartBlock v-if="deliveriesData" :products="products" :total-price="totalPrice"
             :total-products="totalProducts" :priceDelivery="currentPriceDelivery">
    <button @click.prevent="submit"
            class="cart__button button button--primary" type="submit">
      {{ buttonText }}
    </button>
  </CartBlock>
</template>

<script>
import CartBlock from '@/components/CartBlock.vue';

export default {
  name: 'CheckOutCart',
  props: {
    buttonText: {},
    deliveriesData: {},
    products: {},
    totalPrice: {},
    totalProducts: {},
    currentPriceDelivery: {},
    submit: {},
  },
  components: {
    CartBlock,
  },
};
</script>

<style scoped>

</style>
