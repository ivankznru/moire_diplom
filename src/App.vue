<template>
  <div id="app">
    <header-item/>
    <router-view/>
    <footer-item/>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import HeaderItem from '@/components/HeaderItem';
// eslint-disable-next-line import/extensions
import FooterItem from '@/components/FooterItem';

export default {
  components: {
    HeaderItem,
    FooterItem,
  },
};
</script>

<style lang="scss"></style>
