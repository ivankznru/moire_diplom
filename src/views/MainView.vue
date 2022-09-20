<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }} {{ stringProduct(countProducts) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">

      <product-filter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                      :category-id.sync="filterCategoryId" :color.sync="filterColor"
                      :page.sync="page" :material.sync="filterMaterial"
                      :season.sync="filterSeason"/>
      <section class="catalog">

        <div v-if="products.length === 0 && !productsLoading">
          <h4>
            Товаров, соответствующих вашему запросу, не обнаружено
          </h4>
        </div>

        <base-loader loader-title="Загрузка товаров" v-if="productsLoading"/>
        <product-list :products="products" :colors="colorsProduct" v-else/>

        <base-pagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>

      </section>
    </div>
  </main>
</template>

<script>
import stringProduct from '@/helpers/stringProduct';
// eslint-disable-next-line import/extensions
import BaseLoader from '@/components/BaseLoader';
// eslint-disable-next-line import/extensions
import ProductFilter from '@/components/ProductFilter';
// eslint-disable-next-line import/extensions
import BasePagination from '@/components/BasePagination';
// eslint-disable-next-line import/extensions
import ProductList from '@/components/ProductList';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'MainView',
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: [],
      filterMaterial: [],
      filterSeason: [],
      stringProduct,

      productsLoading: false,
      productsLoadingFailed: false,

      productsData: null,
    };
  },

  components: {
    BasePagination,
    ProductList,
    ProductFilter,
    BaseLoader,
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    colorsProduct() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product.colors.map((color) => ({
          ...color.color,
        })),
      })) : [];
    },
  },
  methods: {
    async loadProducts() {
      this.productsLoading = true;
      const response = await axios({
        method: 'GET',
        url: `${API_BASE_URL}/api/products`,
        params: {
          page: this.page,
          limit: this.productsPerPage,
          categoryId: this.filterCategoryId,
          materialIds: this.filterMaterial,
          seasonIds: this.filterSeason,
          colorIds: this.filterColor,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
        },
      });
      this.productsData = response.data;
      if (response.data) {
        this.productsLoading = false;
      }
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterSeason() {
      this.loadProducts();
    },
    filterMaterial() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>

</style>
