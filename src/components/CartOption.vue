<template>
  <div class="cart__options">
    <h3 class="cart__title">{{ title }}</h3>
    <span class="form__error form__error--option" v-if="error">{{ error }}</span>
    <ul class="cart__options options">
      <li class="options__item" v-for="item in items" :key="item.id">
        <label class="options__label">
          <input class="options__radio sr-only" type="radio" :name="item.title"
                 v-model.number="computedValue" :value="item.id">
          <span class="options__value" :class="{ 'border--error': error}">
          {{ item.title }} <b v-if="item.price">{{ item.price }} ₽</b>
        </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CartOption',
  props: ['title', 'items', 'value', 'error'],
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss">
.cart__options {
  position: relative;
}

.form__error--option {
  top: 25px;
  bottom: auto;
  left: 0;
}
</style>
