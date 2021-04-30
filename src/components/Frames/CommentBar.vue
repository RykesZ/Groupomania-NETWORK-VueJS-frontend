<template>
<div class="commentPanel">
    <div class="commentBar">
        <ProfilePicture/>
        <textarea @focus="growTextArea" @blur="shrinkTextArea" name="newComment" id="newComment" cols="30" :rows="rowsNumber" class="zoneTextNewComment" placeholder="Écrivez un commentaire..."></textarea>
    </div>
    <BigButton type="submit" class="publishButton" text="PUBLIER" id="publishComment"/>
</div>
    
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
export default {
    name: 'CommentBar',
    data() {
        return {
            rowsNumber: 1
        }
    },
    methods: {
        growTextArea() {
            this.rowsNumber = 10
        },
        shrinkTextArea() {
            this.rowsNumber = 1
        }
    },
    components: {
        ProfilePicture,
        BigButton
    }
}
</script>