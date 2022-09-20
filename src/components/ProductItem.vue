<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="productImage" :alt="product.title">
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
import { NO_IMAGE } from '@/config';

export default {
  name: 'ProductItem',
  components: { BaseColor },
  props: ['product', 'colors'],
  data() {
    return {
      currentColor: this.product.colors[0].color.id,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    productImage() {
      let value;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.product.colors.length; i++) {
        if (this.currentColor === this.product.colors[i].color.id) {
          value = this.product.colors[i].gallery ? this.product.colors[i].gallery[0].file.url : `${NO_IMAGE}`;
          return value;
        }
      }
      return value;
    },
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
