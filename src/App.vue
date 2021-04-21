<!--<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>-->

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
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #DCE2E6;
  display: flex;
  justify-content: center;
}
</style>

