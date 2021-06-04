<template>
<div class="commentPanel">
    <div class="commentBar">
        <ProfilePicture :filename="filename"/>
        <textarea @focus="growTextArea" @blur="shrinkTextArea" name="newComment" id="newComment" cols="30" :rows="rowsNumber" class="zoneTextNewComment" placeholder="Écrivez un commentaire..." required v-model="textComm"></textarea>
    </div>
    <BigButton type="submit" class="publishButton" text="PUBLIER" id="publishComment" @click="sendNewComment"/>
    <p v-show="alert">{{ alertMessage }}</p>
</div>
    
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import ApiCommentRoutes from "@/services/ApiCommentRoutes"
export default {
    name: 'CommentBar',
    props: {
        filename: {type: String},
        pubId: {type: Number},
    },
    data() {
        return {
            rowsNumber: 1,
            textComm: null,
            alert: false,
            alertMessage: "",
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
        }
    },
    methods: {
        growTextArea() {
            this.rowsNumber = 10
        },
        shrinkTextArea() {
            this.rowsNumber = 1
        },
        async sendNewComment() {
            const authPayload = { userId: this.userId, token: this.token };
            const data = { pubId: this.pubId, text: this.textComm, userId: this.userId};
            const commConfirmation = await ApiCommentRoutes.createComment(data, authPayload);
            if (commConfirmation.data.message == "comment created") {
                this.$store.dispatch('setCurrentPubId', this.pubId);
                console.log("ready to reload comments");
                this.textComm = null;
                this.$emit('emit-reload-comments', 1);
            } else {
                this.alert = true;
                this.alertMessage = "Erreur du serveur, réessayez plus tard."
            }
        }
    },
    components: {
        ProfilePicture,
        BigButton
    }
}
</script>