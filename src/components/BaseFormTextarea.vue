<template>
  <BaseFormField :form="form">
      <textarea class="form__input form__input--area" :id="form.name"
                :placeholder="form.placeholder" :value="value" @input="onInput"></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormTextarea',
  mixins: [formFieldMixin],

};
</script>

<style scoped>

</style>
