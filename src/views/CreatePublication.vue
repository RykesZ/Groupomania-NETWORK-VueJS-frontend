<template>
    <HeaderCreatePublication @emit-send-publi="sendNewPubli"/>
    <div class="publicatorInfos">
        <ProfilePicture :filename="imageUrl"/>
        <p class="identity">{{ prenom }} {{ nom }}</p>
    </div>
    <textarea name="textNewPubli" id="textNewPubli" cols="30" rows="20" class="zoneTextNewPubli" placeholder="Partagez vos pensées, une image, une vidéo, un lien..." form="publish" required v-model="textPubli"></textarea>
    <div class="addMedia">
        <button class="mediaButton invisibleButton">
            <span class="material-icons md-48">videocam</span>Vidéo
            </button>
        <button class="mediaButton invisibleButton" @click="choosePicture">
            <span class="material-icons md-48">image</span>Image
            <input type="file" accept="image/png, image/jpg, image/jpeg" ref="inputImageFile" @change="emitNewImageFile">
            </button>
    </div>
    
</template>

<script>
import HeaderCreatePublication from "@/components/Frames/HeaderCreatePublication.vue"
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
export default {
    name: 'CreatePublication',
    props: {
    },
    data() {
        return {
            imageUrl: null,
            prenom: null,
            nom: null,
            textPubli: null,
            file: ''
        }
    },
    components: {
        HeaderCreatePublication,
        ProfilePicture,
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
    methods: {
        choosePicture() {
            this.$refs.inputImageFile.click();
        },
        emitNewImageFile() {
            this.file = this.$refs.inputImageFile.files[0];
        },
        async sendNewPubli() {
            const response = await ApiPubliRoutes.createPublication();
            console.log(response);
        }
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token }
        const userInfo = await ApiUserRoutes.getUserInfo(authPayload);
        this.imageUrl = await userInfo.data.response.imageUrl;
        this.prenom = await userInfo.data.response.firstname;
        this.nom = await userInfo.data.response.lastname;
    }
}
</script>