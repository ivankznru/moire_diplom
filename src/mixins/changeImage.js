import { NO_IMAGE } from '@/config';

export default {
  computed: {
    productChangeImage() {
      return this.product.colors
        .find((color) => color.color.id === this.currentColor)?.gallery?.[0].file.url || NO_IMAGE;
    },
  },
};
