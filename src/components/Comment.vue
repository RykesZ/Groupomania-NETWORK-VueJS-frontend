<template>
    <div class="commentContainer">
        <ProfilePicture :filename="imageUrl"/>
        <div class="commentFrame" v-if="!modifyMode">
            <div class="infoPubli">
                <p class="identity">{{ prenom }} {{ nom }}<span v-if="moderator" class="material-icons moderatorBadge">stars</span></p>
                <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
                <p class="datetime" v-if="datePublication != dateModification || heurePublication != heureModification">Modifié le {{ dateModification }} à {{ heureModification }}</p>
            </div>
            <p class="commentText">{{ commentText }}</p>
        </div>



        <div class="commentFrame" v-if="modifyMode">
            <textarea ref="textarea" name="modifiedComment" id="modifiedComment" cols="300" rows="10" placeholder="Modifiez votre commentaire" class="zoneTextNewComment" v-model="commentTextArea"></textarea>
            <div>
                <BigButton type="submit" class="publishButton" text="MODIFIER" id="modifyComment" @click="sendModifiedComment"/>
                <BigButton type="" class="cancelButton" text="ANNULER" id="cancelModifyComment" @click="toggleModifyComment"/>
            </div>
        </div>

        

        <button ref="commentOptionsButtonMenu" class="commentOptionsButtonMenu invisibleButton" v-if="userId == autorId || moderatorAuth == true" @click="showCommentOptions">
            <span class="material-icons md-18">more_horiz</span>
            <CommentOptions v-show="commentOptionsSwitch" @show-comment-options="showCommentOptions" @emit-delete-comment="deleteComment" @emit-toggle-modify-comment="toggleModifyComment"/>
        </button>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import CommentOptions from "@/components/Frames/CommentOptions.vue"
import ApiCommentRoutes from "@/services/ApiCommentRoutes"
import BigButton from "@/components/Buttons/BigButton.vue"
export default {
    name: 'Comment',
    data() {
        return {
            commentOptionsSwitch: false,
            modifyMode: false,
            commentTextArea: null,
        }
    },
    props: {
        commentText: String,
        prenom: {type: String, default: "Elle"},
        nom: {type: String, default: "Hughes"},
        fullDatePublication: {type: String},
        fullDateModification: {type: String},
        imageUrl: {type: String},
        autorId: {type: Number},
        commId: {type: Number},
        moderator: {type: Number, default: 0},
        moderatorAuth: {type: Number, default: 0}
    },
    components: {
        ProfilePicture,
        CommentOptions,
        BigButton
    },
    computed: {
        // Transforme la date Year/Month/Day-Hour:Min:Sec en date Day/MonthInLetters/Year
        datePublication() {
            const date = this.fullDatePublication.split(' ')[0];
            let YMD = date.split('-');
            switch (YMD[1]) {
                case '01':
                    YMD[1] = "Janvier";
                    break;
                case '02':
                    YMD[1] = "Février";
                    break;
                case '03':
                    YMD[1] = "Mars";
                    break;
                case '04':
                    YMD[1] = "Avril";
                    break;
                case '05':
                    YMD[1] = "Mai";
                    break;
                case '06':
                    YMD[1] = "Juin";
                    break;
                case '07':
                    YMD[1] = "Juillet";
                    break;
                case '08':
                    YMD[1] = "Août";
                    break;
                case '09':
                    YMD[1] = "Septembre";
                    break;
                case '10':
                    YMD[1] = "Octobre";
                    break;
                case '11':
                    YMD[1] = "Novembre";
                    break;
                case '12':
                    YMD[1] = "Décembre";
                    break;
            }
            let DMY = YMD.reverse();
            return DMY.join(' ');
        },
        // Transforme la date Year/Month/Day-Hour:Min:Sec en date Hour:Min:Sec
        heurePublication() {
            return this.fullDatePublication.split(' ')[1];
        },
        // Transforme la date Year/Month/Day-Hour:Min:Sec en date Day/MonthInLetters/Year
        dateModification() {
            const date = this.fullDateModification.split(' ')[0];
            let YMD = date.split('-');
            switch (YMD[1]) {
                case '01':
                    YMD[1] = "Janvier";
                    break;
                case '02':
                    YMD[1] = "Février";
                    break;
                case '03':
                    YMD[1] = "Mars";
                    break;
                case '04':
                    YMD[1] = "Avril";
                    break;
                case '05':
                    YMD[1] = "Mai";
                    break;
                case '06':
                    YMD[1] = "Juin";
                    break;
                case '07':
                    YMD[1] = "Juillet";
                    break;
                case '08':
                    YMD[1] = "Août";
                    break;
                case '09':
                    YMD[1] = "Septembre";
                    break;
                case '10':
                    YMD[1] = "Octobre";
                    break;
                case '11':
                    YMD[1] = "Novembre";
                    break;
                case '12':
                    YMD[1] = "Décembre";
                    break;
            }
            let DMY = YMD.reverse();
            return DMY.join(' ');
        },
        // Transforme la date Year/Month/Day-Hour:Min:Sec en date Hour:Min:Sec
        heureModification() {
            return this.fullDateModification.split(' ')[1];
        },
        // Récupère le userId dans le localStorage
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        // Récupère le token d'authentification dans le localStorage
        token() {
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    methods: {
        showCommentOptions() {
            this.commentOptionsSwitch = !this.commentOptionsSwitch;
        },
        toggleDeleteComment() {
            this.deletePopUp = !this.deletePopUp
            this.commentOptionsSwitch = this.commentOptionsSwitch = false;
        },
        async deleteComment() {
            const data = {
                commId: this.commId
            }
            const authPayload = {
                userId: this.userId,
                token: this.token
            }
            const deleteConfirmation = await ApiCommentRoutes.deleteComment(data, authPayload);
            console.log(deleteConfirmation.data)
            if (deleteConfirmation.data.message == "comment deleted") {
                this.$emit('emit-reload-comments', -1);
            } else {
                console.log(deleteConfirmation.message);
            }
        },
        toggleModifyComment() {
            if (this.modifyMode == false) {
                this.modifyMode = !this.modifyMode;
                setTimeout( () => {
                this.focusTextarea();
                this.commentOptionsSwitch = this.commentOptionsSwitch = false;
                }, 200)
            } else {
                this.focusTextarea();
                setTimeout( () => {
                this.commentOptionsSwitch = this.commentOptionsSwitch = false;
                }, 200)
            } 
        },
        async sendModifiedComment() {
            const data = {
                commId: this.commId,
                text: this.commentTextArea,
                userId: this.userId
            }
            const authPayload = {
                userId: this.userId,
                token: this.token
            }
            const modifCommConfirmation = await ApiCommentRoutes.modifyComment(data, authPayload);
            if (modifCommConfirmation.data.message == "comment modified") {
                this.$store.dispatch('setCurrentPubId', this.pubId);
                console.log("ready to reload comments");
                this.modifyMode = false;
                this.$emit('emit-reload-comments');
            } else {
                this.alert = true;
                this.alertMessage = "Erreur du serveur, réessayez plus tard."
            }
        },
        focusTextarea() {
            this.$refs.textarea.focus();
            this.$refs.textarea.select();
        },
    },
    beforeMount() {
        this.commentTextArea = this.commentText;
    }
}
</script>