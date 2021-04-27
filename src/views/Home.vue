<template>
    <LogoHome />
    <LoginMenu v-show="!overlay" @emitOverlayToggle="overlayToggle"/>
    <SignupMenu v-show="overlay" @emit-close-pop-up="overlayToggle"/>
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
        }
    },
  components: {
    LoginMenu,
    SignupMenu,
    LogoHome
  }
}
</script>
