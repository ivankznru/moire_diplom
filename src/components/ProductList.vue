<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
// eslint-disable-next-line import/extensions
import ProductItem from '@/components/ProductItem';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products'],
};
</script>

<style scoped>

</style>
