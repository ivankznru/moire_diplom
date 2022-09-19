<template>
  <ul class="catalog__list">
    <ProductItem v-for="(product, index) in products" :colors="colors[index]" :key="product.id"
                 :product="product"/>
  </ul>
</template>

<script>
// eslint-disable-next-line import/extensions
import ProductItem from '@/components/ProductItem';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products', 'colors'],
};
</script>

<style scoped>

</style>
