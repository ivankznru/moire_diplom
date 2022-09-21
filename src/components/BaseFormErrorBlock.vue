<template>
  <div class="cart__error form__error-block" v-if="formErrorMessage">
    <h4>{{ $options.componentData.applicationNotSent }}</h4>
    <p>
      {{ formErrorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseFormErrorBlock',
  props: ['formErrorMessage'],
  componentData: {
    applicationNotSent: 'Заявка не отправлена!',
  },
};
</script>

<style scoped>

</style>
