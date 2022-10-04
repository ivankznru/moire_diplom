<template>
  <form class="cart__form form" @submit.prevent="checkForm">
    <div class="cart__field">
      <div class="cart__data">
          <component :is="item.field" v-for="(item, index) in form" :key="index"
                     :form="item" :value="data[item.model]" @input="onInput(item, $event)"
                     :error="error[item.model]" v-bind="item"/>
      </div>

    </div>

  </form>
</template>

<script>
import validators from '@/validation/validators';
import BaseFormErrorBlock from '@/components/BaseFormErrorBlock.vue';

export default {
  name: 'FormGeneration',
  props: {
    data: {},
    form: {},
  },
  data() {
    return {
      error: {},
    };
  },
  components: {
    BaseFormText: () => import('@/components/BaseFormText.vue'),
    BaseFormTextarea: () => import('@/components/BaseFormTextarea.vue'),
    CartOption: () => import('@/components/CartOption.vue'),
    BaseFormErrorBlock,
  },
  methods: {
    checkError(item, value) {
      if (item.rules) {
        let error = false;
        item.rules.forEach((rule) => {
          const localError = validators[rule](value);
          if (localError) {
            error = localError;
          }
        });
        this.$set(this.error, item.model, error);
      }
    },
    onInput(item, value) {
      this.$set(this.data, item.model, value);
      this.checkError(item, value);
    },
    checkAllForm() {
      let error = false;
      this.form.forEach((item) => {
        const value = this.data[item.model];
        this.checkError(item, value);
        const checked = this.error[item.model];
        if (checked) {
          error = true;
        }
      });
      return error;
    },
    checkForm() {
      this.checkAllForm();
      if (!this.checkAllForm()) {
        this.$emit('submit', this.data);
      }
    },
  },
};
</script>

<style scoped>

</style>
