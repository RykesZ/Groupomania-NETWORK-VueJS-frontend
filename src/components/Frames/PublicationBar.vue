<template>
    <div class="publicationBar">
        <ProfilePicture :changePicture="changePicture" :filename="imageUrl"/>
        <button class="publicationBarButton" @click="goToCreatePubli">Partagez vos pensées, une image, une vidéo...</button>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
export default {
    name: 'PublicationBar',
    data() {
        return {
            changePicture: false,
            imageUrl: ""
        }
    },
    methods: {
        goToCreatePubli() {
            this.$router.push({ name: 'CreatePublication' });
        }
    },
    computed: {
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        token() {
            //return this.$store.state.token;
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    components: {
        ProfilePicture
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token }
        const userInfo = await ApiUserRoutes.getUserInfo(authPayload);
        this.imageUrl = await userInfo.data.response.imageUrl;
    }
}
</script>