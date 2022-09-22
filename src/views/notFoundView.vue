<template>
  <main class="content container">
    <h1>
      {{ $options.pageData.title }}
    </h1>
  </main>
</template>

<script>
export default {
  name: 'notFoundView',
  pageData: {
    title: 'Страница не найдена',
  },
};
</script>

<style scoped>

</style>
