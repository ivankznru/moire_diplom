<template>
  <BaseFormField :form="form" :error="error">
    <input class="form__input" :value="value" @input="onInput" :type="form.type" :id="form.name"
           :placeholder="form.placeholder" :name="form.name">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormText',
  mixins: [formFieldMixin],
  props: {
    type: {
      default: 'text',
    },
    error: {
      type: String,
    },
  },
};
</script>

<style scoped>

</style>
