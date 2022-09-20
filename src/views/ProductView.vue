<template>
  <main class="content container" v-if="productLoading">
    <BaseLoader loader-title="Загрузка товара"></BaseLoader>
  </main>
  <main class="content container" v-else-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            {{ product.title }}
          </span>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="productImage"
               :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="color in product.colors" :key="color.id">
            <a href="#" class="pics__link"
               @click.prevent="currentColor = color.color.id"
               :class="{'pics__link--current': color.gallery[0].file.url === productImage}">
              <img width="98" height="98"
                   :src="color.gallery[0].file.url ? color.gallery[0].file.url : []"
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
                Добавляем товар в корзину...
                </span>
              <span class="message__add" v-show="productAdded">
                Товар добавлен в корзину
                </span>
            </div>

            <button class="item__button button button--primary" type="submit"
                    :disabled="errorAdd() || productAddSetting">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
// eslint-disable-next-line import/extensions
import CounterMenu from '@/components/CounterMenu';
// eslint-disable-next-line import/extensions
import BaseLoader from '@/components/BaseLoader';
// eslint-disable-next-line import/extensions
import BaseColor from '@/components/BaseColor';
// eslint-disable-next-line import/extensions
import BaseSelect from '@/components/BaseSelect';
import { API_BASE_URL, NO_IMAGE } from '@/config';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProductView',
  filters: {
    numberFormat,
  },
  components: {
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
    productImage: {
      get() {
        let value;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.product.colors.length; i++) {
          if (this.currentColor === this.product.colors[i].color.id || this.currentColor === null) {
            value = this.product.colors[i].gallery ? this.product.colors[i].gallery[0].file.url : `${NO_IMAGE}`;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.currentColor = this.product.colors[i].color.id;
            return value;
          }
        }
        return value;
      },
      set(value) {
        this.$emit('update:productImage', value);
      },
    },
  },
  methods: {
    ...mapMutations(['updateError']),
    ...mapActions(['addProductToCart']),
    errorAdd() {
      if (this.$store.state.error) {
        this.productAdded = false;
        this.productAddSetting = false;
        this.updateError(this.currentSize === -1);
      }
      return this.$store.state.error;
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSetting = true;
      this.addProductToCart({
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
      const response = await axios(`${API_BASE_URL}/api/products/${this.$route.params.id}`);
      this.productData = response.data;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
