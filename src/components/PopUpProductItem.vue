<template>
  <transition name="fade">
    <div class="popup" v-if="popUpShow && productData">
      <form class="form" action="#" method="POST"
            @submit.prevent="addToCart()">
        <img :src="productChangeImage" :alt="product.title">
        <div class="form__right">
          <button class="button--close button-del" @click.prevent="currentPopUp">
            <svg width="20" height="20" fill="currentColor">
              <use xlink:href="img/svg/sprite.svg#icon-close"></use>
            </svg>
          </button>
          <h4 class="catalog__title">
          <span>
            {{ product.title }}
          </span>
          </h4>

          <span class="catalog__price">
                {{ product.price | numberFormat }} ₽
        </span>

          <div class="item__row">

            <fieldset class="form__block">
              <legend class="form__legend">Цвет</legend>
              <BaseColor :colors="colors"
                         :current-color.sync="currentColor"
                         class="colors--black"/>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Размер</legend>
              <BaseSelect :current-size.sync="currentSize" :product="productItem"
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
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import BaseSelect from '@/components/BaseSelect.vue';
import BaseColor from '@/components/BaseColor.vue';
import axios from 'axios';
import { mapActions, mapMutations } from 'vuex';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import changeImage from '@/mixins/changeImage';

export default {
  name: 'PopUpProductItem',
  props: {
    currentPopUp: {},
    product: {},
    colors: {},
    popUpShow: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentColor: this.product.colors[0].color.id,
      currentSize: -1,
      productData: null,
      productAmount: 1,
      productAdded: false,
      productAddSetting: false,
    };
  },
  mixins: [changeImage],
  filters: {
    numberFormat,
  },
  components: {
    BaseColor,
    BaseSelect,
  },
  computed: {
    productItem() {
      return this.productData ? this.productData : [];
    },
    currentPopUpShow: {
      get() {
        return this.popUpShow;
      },
      set(value) {
        this.$emit('update:popUpShow', value);
      },
    },
  },
  methods: {
    ...mapMutations(['updateError']),
    ...mapActions(['addProductToCart']),
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
        // this.productAdded = true;
        this.$emit('closePopUp', false);
      }, 1000);
    },
    productLoading() {
      this.productCartLoading = true;
      clearTimeout(this.loadAddProduct);
      this.loadAddProduct = setTimeout(() => {
        this.productCartLoading = false;
      }, 1000);
    },
    async loadProduct() {
      this.productCartLoading = true;
      try {
        const response = await axios(`${API_BASE_URL}/api/products/${this.product.id}`);
        this.productData = response.data;
        if (response.data) {
          this.productCartLoading = false;
        }
      } catch {
        // await router.replace({ name: 'notFound' });
      }
    },
    errorAdd() {
      if (this.$store.state.error) {
        this.productAdded = false;
        this.productAddSetting = false;
        this.updateError(this.currentSize === -1);
      }
      return this.$store.state.error;
    },
  },
  watch: {
    popUpShow() {
      this.loadProduct();
    },
  },
};
</script>

<style lang="scss">
.popup {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;

  .form {
    position: relative;
    display: flex;
    padding: 40px;
    height: 600px;
    width: 800px;
    background-color: white;

    img {
      margin-right: 50px;
    }

    &__right {

      .button--close {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
}
</style>
