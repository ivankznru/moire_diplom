<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.params[0].gallery[0].file.url" width="120" height="120"
           :alt="item.params[0].gallery[0].title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :class="{'value--black': item.params[0].color.code === '#ffffff'}"
           :style="{ backgroundColor: item.params[0].color.code }"></i>
          {{ item.params[0].color.title }}
      </span>
    </p>
    <div class="product__code">
      <span class="product__item">
        Размер: {{ item.size.title }}
      </span>
      <span class="product__item">
        Артикул: {{ item.product.id }}
      </span>
    </div>

    <counter-menu :amount.sync="amount"/>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteProductCart(item.basketItemId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="img/svg/sprite.svg#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import CounterMenu from '@/components/CounterMenu.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  props: ['item'],
  components: { CounterMenu },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions({
      deleteProductCart: 'deleteProductCart',
      updateCartProductAmount: 'updateCartProductAmount',
    }),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          basketItemId: this.item.basketItemId,
          amount: value,
        });
      },
    },
  },
};
</script>

<style scoped>

</style>
