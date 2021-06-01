<template>
    <HeaderCreatePublication @emit-send-publi="sendNewPubli" :text="bigButtonText"/>
    <div class="publicatorInfos">
        <ProfilePicture :filename="imageUrl"/>
        <p class="identity">{{ prenom }} {{ nom }}</p>
    </div>
    <textarea name="textNewPubli" id="textNewPubli" cols="30" rows="20" class="zoneTextNewPubli" placeholder="Partagez vos pensées, une image, une vidéo, un lien..." form="publish" required v-model="textPubli"></textarea>
    <div class="addMedia">
        <!--<button class="mediaButton invisibleButton" @click="chooseVideo">
            <span class="material-icons md-48">videocam</span>Vidéo
            <input type="file" accept="video/mp4, video/mov, video/wmv" ref="inputVideoFile" @change="emitNewVideoFile">
            </button>-->
        <button class="mediaButton invisibleButton" @click="choosePicture">
            <span class="material-icons md-48">image</span>Image
            <progress max="100" :value.prop="uploadPercentage" v-if="uploadPercentage > 0"></progress>
            <span class="fileName">{{ fileName }}</span>
            <input type="file" accept="image/png, image/jpg, image/jpeg" ref="inputImageFile" @change="emitNewImageFile">
            </button>
    </div>
    <p v-show="alert">{{ alertMessage }}</p>
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
            file: null,
            alert: false,
            alertMessage: "",
            uploadPercentage: 0,
            fileName: null,
            bigButtonText: "PUBLIER"
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
            const newFile = this.$refs.inputImageFile.files[0];
            if (newFile.size > 5000000) {
                this.alert = true;
                this.alertMessage = "Fichier trop volumineux"
            } else {
                this.file = newFile;
                this.fileName = newFile.name;
                this.uploadPercentage = 100;
            }
        },
        chooseVideo() {
            this.$refs.inputVideoFile.click();
        },
        /*emitNewVideoFile() {
            const newFile = this.$refs.inputVideoFile.files[0];
            if (newFile.size > 200000000) {
                this.alert = true;
                this.alertMessage = "Fichier trop volumineux"
            } else {
                this.file = newFile;
            }
        },*/
        async sendNewPubli() {
            const data = {
                userId: this.userId,
                text: this.textPubli
            };
            const file = this.file;
            const authPayload = { userId: this.userId, token: this.token };
            const publishConfirmation = await ApiPubliRoutes.createPublication(data, file, authPayload);
            console.log(publishConfirmation);
            if (publishConfirmation.data.message === "publication created") {
                this.$router.push({ name: 'Fil' });
            } else {
                this.alert = true;
                this.alertMessage = "Erreur du serveur, réessayez plus tard."
            }
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