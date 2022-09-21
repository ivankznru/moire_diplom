<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
        Каталог
      </router-link>
    </li>

    <li class="breadcrumbs__item" v-for="item in items" :key="item.id">
      <router-link class="breadcrumbs__link" :to="{ name: item.name }" v-if="item.name">
        {{ item.title }}
      </router-link>

      <span class="breadcrumbs__link" v-else>
        {{ item.title }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseBreadcrumbs',
  props: ['items'],
};
</script>

<style scoped>

</style>
