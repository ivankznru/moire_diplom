<template>
  <label class="form__label" :for="name">
    <slot/>
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',
  props: ['title', 'error', 'name'],
};
</script>

<style scoped>

</style>
