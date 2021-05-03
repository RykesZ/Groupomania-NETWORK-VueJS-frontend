<template>
    <div class="publicationBar">
        <ProfilePicture/>
        <router-link to="/create"><button class="publicationBarButton">Partagez vos pensées, une image, une vidéo...</button></router-link>
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