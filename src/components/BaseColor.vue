<template>
  <ul class="colors">
    <li class="colors__item" v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" :type="type"
               :value="item.id" v-model="computedColor">
        <span class="colors__value" :class="{'value--black': item.title === 'white'}"
              :style="{backgroundColor: item.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseColor',
  props: {
    colors: {},
    currentColor: {},
    type: {
      default: 'radio',
    },
  },
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
