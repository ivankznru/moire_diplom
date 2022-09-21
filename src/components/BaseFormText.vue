<template>
  <BaseFormField :title="title" :error="error" :name="name">
    <input class="form__input" v-model="dataValue" :type="type" :id="name"
           :placeholder="placeholder" :name="name">
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
  },
};
</script>

<style scoped>

</style>
