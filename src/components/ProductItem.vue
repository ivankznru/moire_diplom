
<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
          {{ product.price | numberFormat }} ₽
    </span>

    <BaseColor :colors="colors"
               :current-color.sync="currentColor"
               class="colors--black"/>

  </li>

</template>

<script>
// eslint-disable-next-line import/extensions
import BaseColor from '@/components/BaseColor';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  components: { BaseColor },
  props: ['product', 'colors'],
  data() {
    return {
      currentColor: null,
    };
  },
  filters: {
    numberFormat,
  },
};
</script>

<style lang="scss">

.catalog__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
