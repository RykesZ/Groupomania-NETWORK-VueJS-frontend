<template>
    <PublicationBar/>
    <Publication v-for="publi in publiListe" :key="publi" :prenom="publi.firstname" :nom="publi.lastname" :textPubli="publi.text" :numberOfLikes="publi.likes" :numberOfComms="publi.comments" :imageUrl="publi.imageUrl" :fullDatePublication="publi.date_insertion" :fullDateModification="publi.date_modification" :media="publi.pubImageUrl" :pubId="publi.pubId" :usersLiked="publi.usersLiked" :likes="publi.likes" :comments="publi.comments" :autorId="publi.autorId"/>
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
        const data = { pageNumber: 1 };
        const allPublis = await ApiPubliRoutes.getAllPublications(data, authPayload);
        console.log(allPublis);
        this.publiListe = await allPublis.data.response;
    }
}
</script>