<template>
  <form class="cart__form form" action="#" method="POST">
    <div class="cart__field">
      <div class="cart__data">
        <component :is="item.field" v-for="item in form" :key="item.id"
                   :form="item" :value="data[item.model]" @input="onInput(item, $event)"
                   :error="error[item.model]"/>
      </div>

      <slot/>

    </div>

    <CartBlock v-if="deliveriesData" :products="products" :total-price="totalPrice"
               :total-products="totalProducts" :priceDelivery="currentPriceDelivery">
      <button @click.prevent="checkForm()"
              class="cart__button button button--primary" type="submit">
        {{ buttonText }}
      </button>
    </CartBlock>

    <base-form-error-block :form-error-message="formErrorMessage"/>

  </form>
</template>

<script>
import validators from '@/validation/validators';
import textErrors from '@/validation/textErrors';
import BaseFormErrorBlock from '@/components/BaseFormErrorBlock.vue';
import CartBlock from '@/components/CartBlock.vue';

export default {
  name: 'FormGeneration',
  props: {
    error: {},
    data: {},
    form: {},
    deliveriesData: {},
    submitForm: {},
    buttonText: {},
    formErrorMessage: {},
    products: {},
    totalProducts: {},
    totalPrice: {},
    currentPriceDelivery: {},
  },
  data() {
    return {
      validators,
      textErrors,
    };
  },
  components: {
    BaseFormText: () => import('@/components/BaseFormText.vue'),
    BaseFormTextarea: () => import('@/components/BaseFormTextarea.vue'),
    CartBlock,
    BaseFormErrorBlock,
  },
  methods: {
    onInput(item, value) {
      this.$set(this.data, item.model, value);
      if (this.data[item.model]) {
        if (this.validators.required(value)) {
          this.$set(this.error, item.model, this.textErrors.required);
        }

        // Если поле пустое, проверка на корректность значения
        if (this.error[item.model]) {
          // Проверка на количество символов
          if (item.type === 'tel') {
            if (this.validators.tel(this.validators.replaceNumber(value))) {
              this.$set(this.error, item.model, this.textErrors.tel);
            } else {
              this.$set(this.error, item.model, '');
            }
          }
          // Проверка ФИО на 3 слова
          if (item.type === 'text' && item.model === 'name') {
            if (this.validators.name(this.validators.splitString(value, ' '))) {
              this.$set(this.error, item.model, '');
            } else {
              this.$set(this.error, item.model, this.textErrors.name);
            }
          }
          // Проверка Email на корректное значение
          if (item.type === 'email') {
            if (this.validators.validEmail(value)) {
              this.$set(this.error, item.model, '');
            } else {
              this.$set(this.error, item.model, this.textErrors.email);
            }
          }
        }
      }
    },
    checkForm() {
      this.$emit('submit', this.data);
      return this.submitForm;
    },
  },
};
</script>

<style scoped>

</style>
