<template>
    <div class="commentContainer">
        <ProfilePicture/>
        <div class="commentFrame">
            <div class="infoPubli">
                <p class="identity">{{ prenom }} {{ nom }}</p>
                <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
            </div>
            <p class="commentText">{{ commentText }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
export default {
    name: 'Comment',
    props: {
        commentText: String,
        prenom: {type: String, default: "Elle"},
        nom: {type: String, default: "Hughes"},
        datePublication: {type: Date, default: "26/04/2021"},
        heurePublication: {type: Date, default: "09:42"}
    },
    components: {
        ProfilePicture
    }
}
</script>