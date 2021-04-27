<template>
<section >
  <div>
    <LoginMenu />
  </div>
</section>
  
</template>

<script>
import LoginMenu from './components/LoginMenu.vue'
export default {
  name: 'App',
  components: {
    LoginMenu
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
@import "./assets/styles/sass/main.scss";
</style>

