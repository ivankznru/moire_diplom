<template>
  <div class="product__counter form__counter">
    <button class="button" type="button" aria-label="Убрать один товар"
            @click.prevent="subtractProduct()">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="img/svg/sprite.svg#icon-minus"></use>
      </svg>
    </button>

    <label for="count-one">
      <input type="number" v-model="count" name="count" id="count-one" min="1">
    </label>

    <button class="button" type="button" aria-label="Добавить один товар"
            @click.prevent="addProduct()">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="img/svg/sprite.svg#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  name: 'CounterMenu',
  props: ['amount'],
  data() {
    return {
      currentAmount: 1,
    };
  },
  computed: {
    count: {
      get() {
        return +this.amount;
      },
      set(value) {
        if (value < 1) {
          value = 1;
        }
        this.$emit('update:amount', +value);
      },
    },
  },
  methods: {
    addProduct() {
      if (this.amount === this.currentAmount) {
        this.$emit('update:amount', this.currentAmount + 1);
      } else {
        this.$emit('update:amount', this.amount + 1);
      }
    },
    subtractProduct() {
      if (this.amount === this.currentAmount) {
        if (this.currentAmount !== 0) {
          this.$emit('update:amount', this.currentAmount - 1);
        }
      } else if (this.currentAmount !== 0) {
        this.$emit('update:amount', this.amount - 1);
      }
    },
  },
  watch: {
    amount(value) {
      this.currentAmount = value;
    },
  },
};
</script>

<style scoped>

</style>
