<template>
  <main class="content container">
    <PageTitle :title="$options.pageData.pageTitle" :count-products="countProducts"/>

    <div class="content__catalog">

      <product-filter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                      :category-id.sync="filterCategoryId" :color.sync="filterColor"
                      :page.sync="page" :material.sync="filterMaterial"
                      :season.sync="filterSeason"/>
      <section class="catalog">

        <div v-if="!products.length && !productsLoading && !productsLoadingFailed">
          <h4>
            {{ $options.pageData.noProductsFoundText }}
          </h4>
        </div>

        <div class="block__option" v-if="products.length">
          <span class="block__option__title">
            {{ $options.pageData.numberProductsPageText }}
          </span>
          <label class="form__label form__label--small form__label--select">
            <select class="form__select" name="category" v-model="productsPerPage">
              <option v-for="item in displayingProducts" :key="item.id"
                      :value="item.value">
                {{ item.value }}
              </option>
            </select>
          </label>
        </div>
        <base-loader loader-title="Загрузка товаров" v-if="productsLoading"/>
        <h2 v-else-if="productsLoadingFailed">{{ $options.pageData.errorLoadingProductsText }}</h2>
        <product-list :products="products" :colors="colorsProduct" v-else/>

        <base-pagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductList from '@/components/ProductList.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'MainView',
  pageData: {
    pageTitle: 'Каталог',
    noProductsFoundText: 'Товаров, соответствующих вашему запросу, не обнаружено',
    numberProductsPageText: 'Количество товаров на странице:',
    errorLoadingProductsText: 'Ошибка загрузки товаров, перезагрузите пожалуйста страницу',
  },
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

      displayingProducts: [
        {
          id: 1,
          value: 6,
        },
        {
          id: 2,
          value: 9,
        },
        {
          id: 3,
          value: 12,
        },
        {
          id: 4,
          value: 15,
        },
        {
          id: 5,
          value: 18,
        },
      ],
      productsLoading: false,
      productsLoadingFailed: false,

      productsData: null,
    };
  },

  components: {
    PageTitle,
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
      try {
        this.productsLoading = true;
        this.productsLoadingFailed = false;
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
      } catch {
        this.productsLoading = false;
        this.productsLoadingFailed = true;
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
    productsPerPage() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style lang="scss">
.block__option {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;

  &__title {
    margin-right: 10px;
  }
}
</style>
