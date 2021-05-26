<template>
    <Header/>
    <PublicationBar/>
    <Publication/>
</template>

<script>
import Header from "@/components/Header.vue"
import PublicationBar from "@/components/Frames/PublicationBar.vue"
import Publication from "@/components/Frames/Publication.vue"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
export default {
    name: 'Fil',
    data() {
        return {
            publiListe: null
        }
    },
    methods: {
    },
    components: {
        Header,
        PublicationBar,
        Publication,
        ApiPubliRoutes,
    },
    computed: {
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        token() {
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token };
        const payload = {pageNumber: 1};
        const data = { authPayload, payload};
        const allPublis = await ApiPubliRoutes.getAllPublications(data);
        this.publiListe = allPublis;
    }
}
</script>