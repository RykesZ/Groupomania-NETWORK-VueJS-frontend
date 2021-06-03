<template>
    <Header :active="active" @emit-redirect-main-thread="redirectMainThread" @emit-redirect-profile="redirectProfile" @emit-redirect-home="redirectHome"/>
    <FilContent @emit-go-to-create-publi="goToCreatePubli" @emit-redirect-publi-details="redirectPubliDetails" @emit-redirect-modify-publi="redirectModifyPubli"/>
</template>

<script>
import Header from "@/components/Header.vue"
import FilContent from "@/components/FilContent.vue"
export default {
    name: 'Fil',
    components: {
        Header,
        FilContent
    },
    computed: {
        active() {
            return "Thread"
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
        goToCreatePubli() {
            this.$router.push({ name: 'CreatePublication' });
        },
        redirectPubliDetails() {
            this.$router.push({ name: 'PublicationDetails' });
        },
        redirectModifyPubli() {
            this.$router.push({ name: 'ModifyPublication' });
        }
    }
}
</script>