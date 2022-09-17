<template>
  <ul class="colors">
    <li class="colors__item" v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio"
               :value="item.id" v-model="computedColor">
        <span class="colors__value" :style="{backgroundColor: item.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseColor',
  props: ['colors', 'currentColor'],
  computed: {
    computedColor: {
      get() {
        return this.currentColor;
      },
      set(value) {
        this.$emit('update:currentColor', value);
      },
    },

  },
};
</script>
<style scoped>

</style>
