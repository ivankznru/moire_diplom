<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            Корзина
          </span>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ totalProducts }} {{ stringProduct(totalProducts) }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem :item="item" v-for="item in products" :key="item.basketItemId"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }}₽</span>
          </p>

          <router-link tag="button" class="cart__button button button--primary"
                       :to="{ name: 'order' }" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import stringProduct from '@/helpers/stringProduct';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartView',
  components: { CartItem },
  filters: {
    numberFormat,
  },
  data() {
    return {
      stringProduct,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalProducts: 'totalProducts',
      cartTotalPrice: 'cartTotalPrice',
    }),
  },
};
</script>

<style scoped>

</style>
