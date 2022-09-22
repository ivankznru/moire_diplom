<template>
  <label class="form__label" :for="form.name">
    <slot/>
    <span class="form__value">{{ form.title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',
  props: {
    form: Object,
    error: String,
  },
};
</script>

<style scoped>

</style>
