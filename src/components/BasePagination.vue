<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow"
         :class="{'pagination__link--disabled': page === 1}"
         aria-label="Предыдущая страница"
         @click.prevent="prevPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="img/svg/sprite.svg#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link"
         :class="{'pagination__link--current': pageNumber === page}"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#"
         :class="{'pagination__link--disabled': page === pages}"
         aria-label="Следующая страница"
         @click.prevent="nextPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="img/svg/sprite.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BasePagination',
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    prevPage() {
      if (this.page !== 1) {
        this.$emit('paginate', this.page - 1);
      }
    },
    nextPage() {
      if (this.page !== this.pages) {
        this.$emit('paginate', this.page + 1);
      }
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>

<style scoped>

</style>
