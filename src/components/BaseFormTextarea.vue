<template>
  <BaseFormField :title="title" :error="error" :name="name">
      <textarea class="form__input form__input--area" :name="name" :id="name"
                :placeholder="placeholder" v-model="dataValue"></textarea>
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
