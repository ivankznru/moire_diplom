template>
  <div class="cart__options">
    <h3 class="cart__title">{{ title }}</h3>
    <ul class="cart__options options">
      <li class="options__item" v-for="item in items" :key="item.id">
        <label class="options__label">
          <input class="options__radio sr-only" type="radio" :name="name"
                 v-model.number="computedValue" :value="item.id">
          <span class="options__value">
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
  props: ['title', 'items', 'name', 'currentValue'],
  computed: {
    computedValue: {
      get() {
        return this.currentValue;
      },
      set(value) {
        this.$emit('update:currentValue', value);
      },
    },
  },
};
</script>

<style scoped>

</style>
