<template>
    <div class="PPContainer">
        <img :src="`./images/${filename}`" alt="Image de Profil">
        <button class="changePicture invisibleButton" v-show="changePicture">
            <span class="material-icons">add_a_photo</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProfilePicture',
    data() {
        return {
            changePicture: true
        }
    },
    props: {
        filename: {type: String, default: "PP_default.png"}
    }
}
</script>