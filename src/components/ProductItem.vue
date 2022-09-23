<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <div class="block__img">
        <img :src="productChangeImage" :alt="product.title">
        <div v-if="productCartLoading" class="block__loader">
          <span class="loader-product"></span>
        </div>
      </div>
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
          {{ product.price | numberFormat }} ₽
    </span>

    <div class="catalog__block">
      <BaseColor :colors="colors"
                 :current-color.sync="currentColor"
                 class="colors--black"/>

      <button class="button-del btn--cart" @click.prevent="computedPopUpShow">
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="img/svg/sprite.svg#shopping-cart"></use>
        </svg>
      </button>
    </div>

    <PopUpProductItem :pop-up-show="popUpShow" :product="product" :colors="colors"
                      :current-pop-up="computedPopUpShow" @closePopUp="closePopUp()"
                      ref="popUp"/>
  </li>
</template>

<script>
import PopUpProductItem from '@/components/PopUpProductItem.vue';
import BaseColor from '@/components/BaseColor.vue';
import numberFormat from '@/helpers/numberFormat';
import changeImage from '@/mixins/changeImage';

export default {
  name: 'ProductItem',
  components: {
    BaseColor,
    PopUpProductItem,
  },
  props: ['product', 'colors'],
  data() {
    return {
      currentColor: this.product.colors[0].color.id,
      popUpShow: false,
      productCartLoading: false,
    };
  },
  mixins: [changeImage],
  filters: {
    numberFormat,
  },
  methods: {
    closePopUp() {
      if (!this.$store.state.error) {
        this.popUpShow = false;
      }
    },
    computedPopUpShow() {
      if (!this.$refs.popUp.productData) {
        this.productCartLoading = true;
      }
      clearTimeout(this.loadAddProduct);
      if (this.popUpShow !== true) {
        this.loadAddProduct = setTimeout(() => {
          this.popUpShow = !this.popUpShow;
          this.productCartLoading = false;
        }, 400);
      } else {
        this.popUpShow = !this.popUpShow;
        this.productCartLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">

.block__img {
  position: relative;

  img {
    display: block;
  }

  .block__loader {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    transform: translateX(-50%) translateY(-50%);
  }
}

.catalog__block {
  display: flex;
  justify-content: space-between;
}

.catalog__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn--cart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: orangered;
  color: white;
  transition: opacity .3s ease-in-out;

  &:hover, &:focus-visible {
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
  }
}

.loader-product,
.loader-product:before,
.loader-product:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}

.loader-product {
  color: white;
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader-product:before,
.loader-product:after {
  content: '';
  position: absolute;
  top: 0;
}

.loader-product:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader-product:after {
  left: 3.5em;
}

@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
