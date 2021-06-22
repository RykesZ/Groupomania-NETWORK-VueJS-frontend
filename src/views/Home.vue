<template>
<div class="homePanel">
    <LogoHome />
    <LoginMenu v-show="!overlay" @emit-overlay-toggle="overlayToggle"/>
    <SignupMenu v-show="overlay" @emit-close-pop-up="overlayToggle"/>
</div>
</template>

<script>
// @ is an alias to /src
import LogoHome from "@/components/icons/LogoHome.vue"
import LoginMenu from '@/components/LoginMenu.vue'
import SignupMenu from "@/components/SignupMenu.vue"


export default {
  name: 'Home',
  data() {
    return {
      overlay: false,
    }
  },
  methods: {
        overlayToggle() {
            this.overlay = !this.overlay
        },
        redirectMainThread() {
            this.$router.push({ name: 'Fil' });
        },
        redirectProfile() {
            this.$router.push({ name: 'Profil' });
        },
        redirectHome() {
            this.$router.push({ name: 'Home' });
        },
    },
  components: {
    LoginMenu,
    SignupMenu,
    LogoHome
  }
}
</script>
