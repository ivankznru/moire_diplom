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
import { mapActions, mapMutations } from 'vuex';

export default {
  components: {
    HeaderItem,
    FooterItem,
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
};
</script>

<style lang="scss"></style>
