<template>
  <main class="content container">
    <page-title :title="$options.pageData.pageTitle" :items="paths()"/>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem :item="item" v-for="item in products" :key="item.basketItemId"/>
          </ul>
        </div>

      </form>
      <div class="cart__block">
        <p class="cart__desc">
          {{ $options.pageData.cartDescription }}
        </p>
        <p class="cart__price">
          {{ $options.pageData.total }} <span>{{ cartTotalPrice | numberFormat }} ₽</span>
        </p>

        <router-link tag="button" class="cart__button button button--primary"
                     :to="{ name: 'order' }" type="submit">
          {{ $options.pageData.buttonText }}
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'CartView',
  components: {
    CartItem,
    PageTitle,
  },
  pageData: {
    pageTitle: 'Корзина',
    buttonText: 'Оформить заказ',
    total: 'Итого:',
    cartDescription: 'Мы\u00A0посчитаем стоимость доставки на\u00A0следующем этапе',
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalProducts: 'totalProducts',
      cartTotalPrice: 'cartTotalPrice',
    }),
  },
  methods: {
    paths() {
      return [
        {
          id: 1,
          title: `${this.$options.pageData.pageTitle}`,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
