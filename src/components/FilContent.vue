<template>
    <PublicationBar/>
    <Publication v-for="publi in publiListe" :key="publi"/>
</template>

<script>
import PublicationBar from "@/components/Frames/PublicationBar.vue"
import Publication from "@/components/Frames/Publication.vue"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
export default {
    name: 'FilContent',
    data() {
        return {
            publiListe: null
        }
    },
    components: {
        PublicationBar,
        Publication
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
    methods: {
        async updatePublication() {
            const updateConfirmation = await ApiPubliRoutes.updatePubli();
            console.log(updateConfirmation);
        }
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token };
        console.log(authPayload);
        const payload = {pageNumber: 1};
        const data = { authPayload, payload };
        const allPublis = await ApiPubliRoutes.getAllPublications(data);
        console.log(allPublis);
        this.publiListe = await allPublis.data.response;
    }
}
</script>