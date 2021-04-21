<template>
  <div class="home">
    <LoginMenu/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginMenu from '@/components/LoginMenu.vue'

export default {
  name: 'Home',
  components: {
    LoginMenu
  }
}
</script>
