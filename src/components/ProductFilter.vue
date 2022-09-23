<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="priceFrom">
          <input class="form__input" type="text" id="priceFrom" name="min-price"
                 placeholder="0"
                 v-model.number="currentPriceFrom"
                 @input="changeFilter({ filter: 'priceFrom', value: currentPriceFrom })">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="priceTo">
          <input class="form__input" type="text" id="priceTo" name="max-price"
                 placeholder="0"
                 v-model.number="currentPriceTo"
                 @input="changeFilter({ filter: 'priceTo', value: currentPriceTo })">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="category">
          <select class="form__select" id="category" name="category"
                  v-model.number="currentCategoryId"
                  @change="changeFilter(
                    { filter: 'categoryId', value: currentCategoryId })">
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
        {{ $options.componentData.buttonSubmitText }}
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset"
              :disabled="!checkedObject">
        {{ $options.componentData.buttonResetText }}
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
  componentData: {
    buttonSubmitText: 'Применить',
    buttonResetText: 'Сбросить',
  },
  props: ['page'],
  data() {
    return {
      currentPriceFrom: null,
      currentPriceTo: null,
      currentCategoryId: 0,
      currentColor: [],
      currentMaterial: [],
      currentSeason: [],

      currentQuery: {},

      categoriesData: null,
      materialsData: null,
      seasonsData: null,
      colorsData: null,
    };
  },
  computed: {
    checkedObject() {
      return Object.keys(this.$route.query).length;
    },
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
    changeFilter({
      filter,
      value,
    }) {
      this.currentQuery = {
        ...this.currentQuery,
        [filter]: value,
      };
    },

    async submit() {
      if (this.$route.query.categoryId) {
        this.currentQuery = {
          ...this.currentQuery,
          categoryId: this.$route.query.categoryId,
        };
      }
      await this.$router.push({
        query: {
          ...this.currentQuery,
          colorIds: [...this.currentColor],
          materialIds: [...this.currentMaterial],
          seasonIds: [...this.currentSeason],
        },
      });
      this.$emit('update:page', 1);
    },
    async reset() {
      this.currentQuery = {};
      if (this.$route.query) {
        await this.$router.push({
          query: null,
        });
      }
      this.currentColor = [];
      this.currentSeason = [];
      this.currentMaterial = [];
      this.currentPriceTo = null;
      this.currentPriceFrom = null;
      this.currentCategoryId = 0;
      this.$emit('update:page', 1);
    },
    async loadCategories() {
      const response = await axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/productCategories`,
      });
      this.categoriesData = response.data;
    },
    async loadColors() {
      const response = await axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/colors`,
      });
      this.colorsData = response.data;
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
    createdValueArr(item, value) {
      if (this.$route.query[value]) {
        if (!item.length) {
          if (typeof this.$route.query[value] !== 'string') {
            this.$route.query[value].forEach((p) => {
              item.push(+p);
            });
          } else {
            item.push(+this.$route.query[value]);
          }
        }
      }
    },
  },
  async created() {
    await this.createdValueArr(this.currentColor, 'colorIds');
    await this.createdValueArr(this.currentSeason, 'seasonIds');
    await this.createdValueArr(this.currentMaterial, 'materialIds');
    await this.createdValueArr(this.currentMaterial, 'materialIds');

    if (this.$route.query.priceFrom) {
      this.currentPriceFrom = +this.$route.query.priceFrom;
    }
    if (this.$route.query.priceFrom) {
      this.currentPriceTo = +this.$route.query.priceTo;
    }
    if (this.$route.query.categoryId) {
      this.currentCategoryId = +this.$route.query.categoryId;
    }

    await this.loadCategories();
    await this.loadColors();
    await this.loadMaterials();
    await this.loadSeasons();
  },
};
</script>

<style scoped>

</style>
