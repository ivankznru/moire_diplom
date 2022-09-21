<template>
  <div id="app">
    <header-item/>
    <router-view/>
    <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '@/components/HeaderItem.vue';
import FooterItem from '@/components/FooterItem.vue';
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

<style lang="scss">
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
