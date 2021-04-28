<template>
    <div class="publicationBar">
        <ProfilePicture/>
        <button class="publicationBarButton">Partagez vos pensées, une image, une vidéo...</button>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
export default {
    name: 'PublicationBar',
    components: {
        ProfilePicture
    }
}
</script>