<template>
<div class="publication">
    <div class="headLine">
        <ProfilePicture />
        <div class="infoPubli">
            <p class="identity">{{ prenom }} {{ nom }}</p>
            <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
        </div>
        <button class="publicationOptions invisibleButton"><span class="material-icons md-18">more_horiz</span></button>
    </div>
    <p class="textPubli">{{ textPubli }}</p>
    <div class="media">{{ media }}</div>
    <div class="numberSocials">
        <span class="material-icons md-18">thumb_up</span>
        <span class="numberOfLikes">{{ numberOfLikes }}</span>
        <button class="numberOfComms invisibleButton" @click="showComments"><span>voir les {{ numberOfComms }} commentaires</span></button>
        <span class="numberOfShares">{{ numberOfShares }} partages </span>
    </div>
    <div class="actionSocials">
        <LikeButton/>
        <CommentButton/>
        <ShareButton/>
    </div>
    <div v-show="commentSwitch" class="commentsBloc">
        <Comment :commentText="commentText"/>
    </div>
</div>

</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import LikeButton from "@/components/Buttons/LikeButton.vue"
import CommentButton from "@/components/Buttons/CommentButton.vue"
import ShareButton from "@/components/Buttons/ShareButton.vue"
import Comment from "@/components/Comment.vue"
export default {
    name: 'Publication',
    data() {
        return {
            commentSwitch: false,
            commentText: "Maecenas gravida arcu velit, eu vulputate diam sagittis vitae. Vivamus suscipit placerat nulla, sed molestie quam lobortis sed. Donec blandit semper orci a ultrices. Nullam sed mauris ante. Donec sed sem semper, vestibulum dui a, ornare nulla. Maecenas iaculis luctus nunc, in volutpat orci aliquam ut. Nulla faucibus sit amet risus in sagittis. Ut massa enim, efficitur eget aliquet vitae, maximus ac enim. Mauris lorem mauris, consectetur vitae urna in, suscipit interdum orci. Nulla auctor, mi quis fringilla cursus, leo augue cursus eros, ac tempor risus ex non lorem. Ut suscipit ornare dolor sed consequat. In pretium vestibulum dui, sagittis condimentum erat volutpat eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam mi nunc, fringilla non pharetra sed, varius non nulla. Pellentesque id pretium neque. Sed feugiat quis orci at aliquet."
        }
    },
    props: {
        prenom: {type: String, default: "Andréa"},
        nom: {type: String, default: "Piacquadio"},
        datePublication: {type: Date, default: "26/04/2021"},
        heurePublication: {type: Date, default: "09:23"},
        textPubli: {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        media: {type: Object},
        numberOfLikes: {type: Number, default: 19},
        numberOfComms: {type: Number, default: 7},
        numberOfShares: {type: Number, default: 17},
    }
    ,
    methods: {
        showComments() {
            this.commentSwitch = !this.commentSwitch
        }
    }
    ,
    components: {
        ProfilePicture,
        LikeButton,
        CommentButton,
        ShareButton,
        Comment
    }
}
</script>