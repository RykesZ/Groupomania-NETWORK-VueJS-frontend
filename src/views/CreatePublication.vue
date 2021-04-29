<template>
    <HeaderCreatePublication/>
    <div class="publicatorInfos">
        <ProfilePicture />
        <p class="identity">{{ prenom }} {{ nom }}</p>
    </div>
    <textarea name="textNewPubli" id="textNewPubli" cols="30" rows="20" class="zoneTextNewPubli" placeholder="Partagez vos pensées, une image, une vidéo, un lien..." form="publish" required></textarea>
    <div class="addMedia">
        <button class="mediaButton invisibleButton"><span class="material-icons md-48">videocam</span>Vidéo</button>
        <button class="mediaButton invisibleButton"><span class="material-icons md-48">image</span>Image</button>
    </div>
    
</template>

<script>
import HeaderCreatePublication from "@/components/Frames/HeaderCreatePublication.vue"
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
export default {
    name: 'CreatePublication',
    props: {
        prenom: {type: String, default: "Italo"},
        nom: {type: String, default: "Melo"}
    },
    components: {
        HeaderCreatePublication,
        ProfilePicture,
    }
    
}
</script>