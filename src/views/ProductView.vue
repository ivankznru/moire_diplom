<template>
  <main class="content container" v-if="productLoading">
    <BaseLoader loader-title="Загрузка товара"></BaseLoader>
  </main>
  <main class="content container" v-else-if="productData">

    <page-title :items="paths()"/>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="productChangeImage"
               :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="color in product.colors" :key="color.id">
            <a href="#" class="pics__link"
               @click.prevent="currentColor = color.color.id"
               :class="{'pics__link--current': changeActive(color, productChangeImage)}">
              <img width="98" height="98"
                   :src="changeSrc(color)"
                   :alt="product.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">

              <counter-menu :amount.sync="productAmount"/>

              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>
            </div>

            <div class="item__row">

              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <base-color :colors="colorsProduct" :current-color.sync="currentColor"
                            class="colors--black"/>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <BaseSelect :current-size.sync="currentSize" :product="product"
                            :class="{ 'border--error': errorAdd() }"/>
              </fieldset>
            </div>

            <div class="message">
              <span class="message__loading" v-show="productAddSetting">
                {{ $options.pageData.addingProductText }}
                </span>
              <span class="message__add" v-show="productAdded">
                {{ $options.pageData.addedProductText }}
                </span>
            </div>

            <button class="item__button button button--primary" ref="btn" type="submit"
                    :disabled="errorAdd() || productAddSetting || productAmount < 1">
              {{ $options.pageData.titleButton }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import PageTitle from '@/components/PageTitle.vue';
import CounterMenu from '@/components/CounterMenu.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import BaseColor from '@/components/BaseColor.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { client, NO_IMAGE } from '@/config';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProductView',
  filters: {
    numberFormat,
  },
  pageData: {
    titleButton: 'В корзину',
    addingProductText: 'Добавляем товар в корзину...',
    addedProductText: 'Товар добавлен в корзину',
  },
  components: {
    PageTitle,
    BaseLoader,
    CounterMenu,
    BaseSelect,
    BaseColor,
  },
  data() {
    return {
      productAmount: 1,
      productLoading: false,
      productData: null,
      currentColor: null,
      currentSize: -1,
      productAdded: false,
      productAddSetting: false,
    };
  },
  computed: {
    product() {
      return this.productData ? this.productData : [];
    },
    colorsProduct() {
      return this.productData ? this.productData.colors.map((item) => ({
        ...item.color,
      })) : [];
    },
    productChangeImage: {
      get() {
        return this.product.colors
          ?.find((color) => {
            if (!this.currentColor) {
              this.currentColor = color.color.id;
            }
            return this.currentColor === color.color.id;
          })?.gallery?.[0].file.url || NO_IMAGE;
      },
      set(value) {
        this.$emit('update:productImage', value);
      },
    },
  },
  methods: {
    ...mapMutations(['updateError']),
    ...mapActions(['addProductToCart']),
    paths() {
      return [
        {
          id: 1,
          name: 'main',
          query: this.product.category.id,
          title: `${this.product.category.title}`,
        },
        {
          id: 2,
          title: `${this.product.title}`,
          category: this.product.category.id,
        },
      ];
    },
    changeActive(value, computed) {
      return value?.gallery?.[0].file.url === computed;
    },
    changeSrc(value) {
      return value.gallery ? value.gallery[0].file.url : NO_IMAGE;
    },
    errorAdd() {
      if (this.$store.state.error) {
        this.productAdded = false;
        this.productAddSetting = false;
        this.updateError(this.currentSize === -1);
      }
      return this.$store.state.error;
    },
    async addToCart() {
      this.productAdded = false;
      this.productAddSetting = true;
      await this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
        colorId: this.currentColor,
        sizeId: this.currentSize,
      });
      clearTimeout(this.loadAddProduct);
      this.loadAddProduct = setTimeout(() => {
        this.productAddSetting = false;
        this.productAdded = true;
      }, 1000);
    },

    async loadProduct() {
      try {
        this.productLoading = true;
        this.productsLoadingFailed = false;
        const response = await client({
          method: 'GET',
          url: `/api/products/${this.$route.params.id}`,
        });
        this.productData = response.data;
        if (response.data) {
          this.productLoading = false;
        }
      } catch {
        this.productsLoadingFailed = true;
        await this.$router.replace({ name: 'notFound' });
      }
    },
  },
  watch: {
    '$route.params.id': {
      async handler() {
        await this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.pics__list {
  img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
