<template>
    <Header :active="active" @emit-reload-main-thread="reloadMainThread"/>
    <FilContent ref="filContent" @emit-go-to-create-publi="goToCreatePubli" @emit-redirect-modify-publi="redirectModifyPubli" :key="reloadFilContentKey" />
    <Pagination @emit-first-page-value="goToPage" @emit-first-button-value="goToPage" @emit-second-button-value="goToPage" @emit-last-page-value="goToPage"/>
</template>

<script>
import Header from "@/components/Header.vue"
import FilContent from "@/components/FilContent.vue"
import Pagination from "@/components/Frames/Pagination.vue"
export default {
    name: 'Fil',
    components: {
        Header,
        FilContent,
        Pagination
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
        },
        goToPage(pageNumber) {
            console.log('click');
            if (pageNumber) {
                this.$refs.filContent.updateFilContent(pageNumber);
            } else {
                return 1;
            }
            
        }
    }
}
</script>