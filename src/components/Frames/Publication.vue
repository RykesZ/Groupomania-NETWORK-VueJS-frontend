<template>
<div class="publication">
    <div class="headLine">
        <ProfilePicture />
        <div class="infoPubli">
            <p class="identity">{{ prenom }} {{ nom }}</p>
            <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
        </div>
    </div>
    <p class="textPubli">{{ textPubli }}</p>
    <div class="media">{{ media }}</div>
    <div class="numberSocials">
        <span class="material-icons md-18">thumb_up</span>
        <span class="numberOfLikes">{{ numberOfLikes }}</span>
        <button class="numberOfComms invisibleButton"><span>voir les {{ numberOfComms }} commentaires</span></button>
        <span class="numberOfShares">{{ numberOfShares }} partages </span>
    </div>
    <div class="actionSocials">
        <LikeButton/>
        <CommentButton/>
        <ShareButton/>
    </div>
</div>

</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import LikeButton from "@/components/Buttons/LikeButton.vue"
import CommentButton from "@/components/Buttons/CommentButton.vue"
import ShareButton from "@/components/Buttons/ShareButton.vue"
export default {
    name: 'Publication',
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
    components: {
        ProfilePicture,
        LikeButton,
        CommentButton,
        ShareButton
    }
}
</script>