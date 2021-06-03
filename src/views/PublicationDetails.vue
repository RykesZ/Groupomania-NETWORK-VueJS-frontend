<template>
    <Header/>
    <Publication :prenom="publi.firstname" :nom="publi.lastname" :textPubli="publi.text" :numberOfLikes="publi.likes" :numberOfComms="publi.comments" :imageUrl="publi.imageUrl" :fullDatePublication="publi.date_insertion" :fullDateModification="publi.date_modification" :media="publi.pubImageUrl" :pubId="publi.pubId" :usersLiked="publi.usersLiked" :likes="publi.likes" :autorId="publi.autorId" :commentSwitch="true" @emit-redirect-publi-details="redirectPubliDetails"/>
</template>

<script>
import Header from "@/components/Header.vue"
import Publication from "@/components/Frames/Publication.vue"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
export default {
    name: 'PublicationDetails',
    data() {
        return {
            publi: null
        }
    },
    components: {
        Header,
        Publication
    },
    methods: {
        redirectPubliDetails(pubId) {
            console.log(pubId);
            this.$store.dispatch('setCurrentPubId', pubId);
            this.$router.push({ name: 'PublicationDetails' });
        }
    },
    computed: {
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        token() {
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        },
        pubId() {
            return this.$store.state.pubId;
        }
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token };
        const data = { pubId: this.pubId};
        const publi = await ApiPubliRoutes.getOnePublication(data, authPayload);
        this.publi = await publi.data.response;
    },
    beforeUnmount() {
        this.$store.dispatch('setCurrentPubId', this.pubId);
    }
}
</script>