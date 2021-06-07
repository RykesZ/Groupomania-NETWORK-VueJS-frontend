<template>
    <Header :active="active" @emit-reload-main-thread="reloadMainThread"/>
    <FilContent @emit-go-to-create-publi="goToCreatePubli" @emit-redirect-modify-publi="redirectModifyPubli" :key="reloadFilContentKey"/>
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
    data() {
        return {
            reloadFilContentKey: 0
        }
    },
    computed: {
        active() {
            return "Thread"
        }
    },
    methods: {
        reloadMainThread() {
            this.reloadFilContentKey += 1;
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