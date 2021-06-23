<template>
    <HeaderCreatePublication @emit-send-publi="modifyPubli" :text="bigButtonText" @emit-redirect-main-thread="redirectMainThread"/>
    <div class="publicatorInfos">
        <ProfilePicture :filename="imageUrl"/>
        <p class="identity">{{ prenom }} {{ nom }}</p>
    </div>
    <textarea name="textNewPubli" id="textNewPubli" cols="30" rows="20" class="zoneTextNewPubli" placeholder="Partagez vos pensées, une image, une vidéo, un lien..." form="publish" required v-model="textPubli"></textarea>
    <div class="media" v-if="imagePubliUrl != null && imagePubliUrl != '' && imagePubliUrl != undefined">
        <p>Fichier joint :</p>
        <img :src="`${imagePubliUrl}`" alt="Image de Publication">
        <div class="fileOptions">
            <input type="checkbox" name="removeFile" id="removeFile" ref="removeFileInput" v-model="removeFile" @click="removeFileCheckbox">
            <label for="removeFile">Retirer le fichier joint</label>
            <p>-OU-</p>
            <p>Remplacer le fichier joint :</p>
        </div>
        </div>
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
            imagePubliUrl: null,
            uploadPercentage: 0,
            fileName: null,
            bigButtonText: "MODIFIER",
            removeFile: null
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
        },
        pubId() {
            return this.$store.state.pubId;
        }
    },
    methods: {
        // Clique sur le bouton caché d'input de fichier
        choosePicture() {
            this.$refs.inputImageFile.click();
        },
        // Limite la taille de l'image chargée par l'utilisateur et envoie un feedback visuel par la complétion de la barre de chargement
        emitNewImageFile() {
            const newFile = this.$refs.inputImageFile.files[0];
            if (newFile.size > 5000000) {
                this.alert = true;
                this.alertMessage = "Fichier trop volumineux"
                this.$refs.inputImageFile.value = null;
                this.file = null;
            } else if (newFile == null) {
                console.log("New file is null");
                this.file = null;
            } else {
                if (this.imagePubliUrl != null && this.imagePubliUrl != '' && this.imagePubliUrl != undefined) {
                    this.$refs.removeFileInput.checked = false;
                }
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
        // Envoie au serveur la requête HTTP contenant les infos de la publication à modifier
        async modifyPubli() {
            const data = {
                pubId: this.pubId,
                text: this.textPubli,
                userId: this.userId,
                removeFile: this.removeFile
            };
            const file = this.file;
            const authPayload = { userId: this.userId, token: this.token };
            const publishConfirmation = await ApiPubliRoutes.modifyPublication(data, file, authPayload);
            console.log(publishConfirmation);
            if (publishConfirmation.data.message === "publication modified") {
                this.$router.push({ name: 'Fil' });
            } else {
                this.alert = true;
                this.alertMessage = "Erreur du serveur, réessayez plus tard."
            }
        },
        // Permet de retirer l'image actuellement enregistrée dans la publication
        removeFileCheckbox() {
            if (this.$refs.removeFileInput.checked == true) {
                this.$refs.inputImageFile.value = null;
                this.file = null;
                this.fileName = null;
                this.uploadPercentage = 0;
            }
        },
        // Envoie sur la page de fil de publications
        redirectMainThread() {
            this.$router.push({ name: 'Fil' });
        }
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token };
        const data = { pubId: this.pubId};
        console.log(data);
        const userInfo = await ApiUserRoutes.getUserInfo(authPayload);
        this.imageUrl = await userInfo.data.response.imageUrl;
        this.prenom = await userInfo.data.response.firstname;
        this.nom = await userInfo.data.response.lastname;
        const publiInfo = await ApiPubliRoutes.getOnePublication(data, authPayload);
        this.textPubli = await publiInfo.data.response.text;
        this.imagePubliUrl = await publiInfo.data.response.pubImageUrl;
    },
    beforeUnmount() {
        this.$store.dispatch('setCurrentPubId', this.pubId);
    }
}
</script>