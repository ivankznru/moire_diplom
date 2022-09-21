<template>
  <div class="content__top">

    <base-breadcrumbs :items="items" v-if="items"/>

    <div class="content__row" v-if="title">
      <h1 class="content__title">
        {{ title }}
        <span v-if="orderData">№ {{ orderData.id }}</span>
      </h1>
      <span class="content__info" v-if="countProducts">
          {{ countProducts }} {{ stringProduct(countProducts) }}
      </span>
    </div>
  </div>

</template>

<script>
import stringProduct from '@/helpers/stringProduct';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue';

export default {
  name: 'PageTitle',
  props: ['title', 'countProducts', 'items', 'orderData'],
  components: { BaseBreadcrumbs },
  data() {
    return {
      stringProduct,
    };
  },
};
</script>

<style scoped>

</style>
