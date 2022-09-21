<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="priceFrom">
          <input class="form__input" type="text" id="priceFrom" name="min-price"
                 v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="priceTo">
          <input class="form__input" type="text" id="priceTo" name="max-price"
                 v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="category">
          <select class="form__select" id="category" name="category"
                  v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <BaseColor :colors="productsColor" type="checkbox" :current-color.sync="currentColor"
                   class="colors--black"/>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label" :for="material.code">
              <input class="check-list__check sr-only" type="checkbox" name="material"
                     :value="material.id" :id="material.code" v-model="currentMaterial">
              <span class="check-list__desc">
                    {{ material.title }}
                    <span>({{ material.productsCount }})</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label" :for="season.code">
              <input class="check-list__check sr-only" type="checkbox" name="collection"
                     :id="season.code" v-model="currentSeason" :value="season.id">
              <span class="check-list__desc">
                    {{ season.title }}
                    <span>({{ season.productsCount }})</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primary" type="submit" @click.prevent="submit()">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import BaseColor from '@/components/BaseColor.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'ProductFilter',
  components: { BaseColor },
  props: ['priceFrom', 'priceTo', 'categoryId', 'color', 'page', 'material', 'season'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: [],
      currentMaterial: [],
      currentSeason: [],

      categoriesData: null,
      materialsData: null,
      seasonsData: null,
      colorsData: null,
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    productsColor() {
      return this.colorsData ? this.colorsData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    seasons() {
      return this.seasonsData ? this.seasonsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    color(value) {
      this.currentColor = value;
    },
    material(value) {
      this.currentMaterial = value;
    },
    season(value) {
      this.currentSeason = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColor);
      this.$emit('update:material', this.currentMaterial);
      this.$emit('update:season', this.currentSeason);
      this.$emit('update:page', 1);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', []);
      this.$emit('update:material', []);
      this.$emit('update:season', []);
      this.$emit('update:page', 1);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        // eslint-disable-next-line no-return-assign
        .then((response) => this.categoriesData = response.data);
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        // eslint-disable-next-line no-return-assign
        .then((response) => this.colorsData = response.data);
    },
    async loadMaterials() {
      const response = await axios(`${API_BASE_URL}/api/materials`, {
        method: 'GET',
      });
      this.materialsData = await response.data;
    },
    async loadSeasons() {
      const response = await axios(`${API_BASE_URL}/api/seasons`, {
        method: 'GET',
      });
      this.seasonsData = await response.data;
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
    this.loadMaterials();
    this.loadSeasons();
  },
};
</script>

<style scoped>

</style>
