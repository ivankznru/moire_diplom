<template>
  <main class="content container">
    <PageTitle :title="$options.pageData.pageTitle" :count-products="countProducts"/>

    <div class="content__catalog">

      <product-filter :page.sync="page" ref="filter"/>
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
    watchFilter(value) {
      if (typeof this.$route.query[value] === 'string'
        && this.$route.query[value] !== this.$route.query.categoryId
        && this.$route.query[value] !== this.$route.query.priceFrom
        && this.$route.query[value] !== this.$route.query.priceTo) {
        return Array(this.$route.query[value]);
      }
      return this.$route.query[value];
    },
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
            categoryId: this.watchFilter('categoryId'),
            materialIds: this.watchFilter('materialIds'),
            seasonIds: this.watchFilter('seasonIds'),
            colorIds: this.watchFilter('colorIds'),
            minPrice: this.watchFilter('priceFrom'),
            maxPrice: this.watchFilter('priceTo'),
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
    productsPerPage() {
      this.loadProducts();
    },
    '$route.query': {
      handler() {
        this.loadProducts();
      },
    },
  },
  async created() {
    await this.loadProducts();
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
