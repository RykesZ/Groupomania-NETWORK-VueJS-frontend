<template>
    <PublicationBar @emit-go-to-create-publi="$emit('emit-go-to-create-publi')" :imageUrlUser="imageUrlUser"/>
    
    <Publication ref="publication" v-for="publi in publiListe" :key="publi" :prenom="publi.firstname" :nom="publi.lastname" :moderator="publi.moderator" :moderatorAuth="moderatorAuth" :textPubli="publi.text" :numberOfComms="publi.comments" :imageUrl="publi.imageUrl" :fullDatePublication="publi.date_insertion" :fullDateModification="publi.date_modification" :media="publi.pubImageUrl" :pubId="publi.pubId" :usersLiked="publi.usersLiked" :likes="publi.likes" :autorId="publi.autorId" @emit-redirect-publi-details="redirectPubliDetails" @emit-redirect-modify-publi="$emit('emit-redirect-modify-publi')" :imageUrlUser="imageUrlUser"/>
</template>

<script>
import PublicationBar from "@/components/Frames/PublicationBar.vue"
import Publication from "@/components/Frames/Publication.vue"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
import ApiUserRoutes from "@/services/ApiUserRoutes"
export default {
    name: 'FilContent',
    emits: ['emit-redirect-modify-publi','emit-new-all-publi-length', 'emit-go-to-create-publi'],
    data() {
        return {
            publiListe: null,
            imageUrlUser: "",
            moderatorAuth: 0
        }
    },
    props: {
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
        },
        redirectPubliDetails(pubId) {
            console.log(pubId);
            this.$store.dispatch('setCurrentPubId', pubId);
            this.$emit('emit-redirect-publi-details');
        },
        async updateFilContent(pageNumber) {
            const authPayload = { userId: this.userId, token: this.token };
            let data = { pageNumber };
            const allPublis = await ApiPubliRoutes.getAllPublications(data, authPayload);
            this.publiListe = await allPublis.data.response;
            const allPubliLength = await allPublis.data.allPubliLength;
            this.$emit('emit-new-all-publi-length', allPubliLength);
        }
    },
    async beforeMount() {
        // Met à jour le contenu du fil d'actualités
        this.updateFilContent(1)

        const authPayload = { userId: this.userId, token: this.token }
        const userInfo = await ApiUserRoutes.getUserInfo(authPayload);
        this.imageUrlUser = await userInfo.data.response.imageUrl;
        this.moderatorAuth = await userInfo.data.response.moderator;


    }
}
</script>