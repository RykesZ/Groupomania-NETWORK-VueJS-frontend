<template>
    <Header :active="active" @emit-redirect-main-thread="redirectMainThread" @emit-redirect-profile="redirectProfile" @emit-redirect-home="redirectHome"/>
    <ProfileContent/>
</template>

<script>
import Header from "@/components/Header.vue"
import ProfileContent from "@/components/ProfileContent.vue"
export default {
    name: 'Profil',
    components: {
        Header,
        ProfileContent
    },
    computed: {
        active() {
            return "Profile"
        }
    },
    methods: {
        redirectMainThread() {
            this.$router.push({ name: 'Fil' });
        },
        redirectProfile() {
            this.$router.push({ name: 'Profil' });
        },
        redirectHome() {
            this.$router.push({ name: 'Home' });
        },
    }
}
</script>