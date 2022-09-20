<template>
  <label class="form__label form__label--small form__label--select">
    <select class="form__select" name="category" v-model="computedSize">
      <option disabled value="-1">Выберите размер</option>
      <option v-for="size in product.sizes" :key="size.id"
              :value="size.id">
        {{ size.title }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: ['product', 'currentSize'],
  computed: {
    computedSize: {
      get() {
        return this.currentSize;
      },
      set(value) {
        this.$emit('update:currentSize', value);
      },
    },
  },
};
</script>

<style scoped>

</style>
