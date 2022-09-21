<template>
  <ul class="dictionary">
    <li class="dictionary__item" v-for="item in form" :key="item.id">
      <span class="dictionary__key">
        {{ item.name }}
      </span>
      <span class="dictionary__value">
        {{ item.data }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DictionaryList',
  props: ['form'],
};
</script>

<style scoped>

</style>
