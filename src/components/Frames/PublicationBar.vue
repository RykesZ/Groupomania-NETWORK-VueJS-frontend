<template>
    <div class="publicationBar">
        <ProfilePicture :changePicture="changePicture" :filename="imageUrlUser"/>
        <button class="publicationBarButton" @click="$emit('emit-go-to-create-publi')">Partagez vos pensées, une image, une vidéo...</button>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
export default {
    name: 'PublicationBar',
    data() {
        return {
            changePicture: false,
        }
    },
    props: {
        imageUrlUser: {type: String}
    },
    emits: ['emit-go-to-create-publi'],
    methods: {
        
    },
    computed: {
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        token() {
            //return this.$store.state.token;
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    components: {
        ProfilePicture
    },
    async beforeMount() {
    }
}
</script>