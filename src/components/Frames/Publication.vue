<template>
<div class="publication">
    <div class="headLine">
        <ProfilePicture :filename="imageUrl"/>
        <div class="infoPubli">
            <p class="identity">{{ prenom }} {{ nom }}</p>
            <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
        </div>
        <button class="publicationOptions invisibleButton"><span class="material-icons md-18">more_horiz</span></button>
    </div>
    <p class="textPubli" v-if="textPubli != null && textPubli != undefined && textPubli != 'null'">{{ textPubli }}</p>
    <div class="media" v-if="media != null && media != '' && media != undefined && mediaType == 'image'"><img :src="`${media}`" alt="Image de Publication"></div>
    <div class="media" v-if="media != null && media != '' && media != undefined && mediaType == 'video'"><video controls autoplay muted> <source :src="`${media}`" type="video/mp4">Sorry, your browser doesn't support embedded videos.</video></div>
    <div class="numberSocials">
        <span class="material-icons md-18">thumb_up</span>
        <span class="numberOfLikes">{{ numberOfLikes }}</span>
        <button class="numberOfComms invisibleButton" @click="showComments" v-if="numberOfComms > 0"><span>voir les {{ numberOfComms }} commentaires</span></button>
        <span class="numberOfComms notAButton" v-else>Aucun commentaire</span>
        <span class="numberOfShares">{{ numberOfShares }} partages </span>
    </div>
    <div class="actionSocials">
        <LikeButton/>
        <CommentButton/>
        <ShareButton/>
    </div>
    <div v-show="commentSwitch" class="commentsBloc">
        <Comment v-for="commentator in commentators" :key="commentator" :prenom="commentator.prenom" :nom="commentator.nom" :datePublication="commentator.datePublication" :heurePublication="commentator.heurePublication" :commentText="commentator.commentText"/>
        <CommentBar/>
    </div>
</div>

</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import LikeButton from "@/components/Buttons/LikeButton.vue"
import CommentButton from "@/components/Buttons/CommentButton.vue"
import ShareButton from "@/components/Buttons/ShareButton.vue"
import Comment from "@/components/Comment.vue"
import CommentBar from "@/components/Frames/CommentBar.vue"
export default {
    name: 'Publication',
    data() {
        return {
            commentSwitch: false,
            commentators: [
                {prenom: "Prénom", nom: "Nom", datePublication: "26/04/2021", heurePublication: "09:42", commentText: "Ipsum"},
            ],
            mediaPresent: false
        }
    },
    props: {
        prenom: {type: String, default: "Prénom"},
        nom: {type: String, default: "Nom"},
        fullDatePublication: {type: Date},
        textPubli: {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        media: {type: String},
        numberOfLikes: {type: Number, default: 0},
        numberOfComms: {type: Number, default: 0},
        numberOfShares: {type: Number, default: 0},
        imageUrl: {type: String},
    },
    methods: {
        showComments() {
            this.commentSwitch = !this.commentSwitch
        }
    },
    computed: {
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
        heurePublication() {
            return this.fullDatePublication.split(' ')[1];
        },
        mediaType() {
            const type = this.media.split('.')[1];
            if (type == 'jpg' || type == 'png') {
                return 'image';
            } else if (type == 'mp4' || type == 'm4v') {
                return 'video'
            } else {
                return null;
            }
        }
    },
    components: {
        ProfilePicture,
        LikeButton,
        CommentButton,
        ShareButton,
        Comment,
        CommentBar
    },
    beforeMount() {
        if (this.media != null || this.media != '' || this.media != undefined) {
            this.mediaPresent = true;
        }
    }
}
</script>