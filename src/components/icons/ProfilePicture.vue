<template>
    <div class="PPContainer">
        <img :src="`./images/${filename}`" alt="Image de Profil">
        <button class="changePicture invisibleButton" v-show="changePicture" @click="ChoosePicture">
            <span class="material-icons">add_a_photo</span>
            <input type="file" accept="image/png, image/jpg, image/jpeg" ref="inputFile" @change="emitNewFile">
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProfilePicture',
    data() {
        return {
            changePicture: true,
            file: {}
        }
    },
    props: {
        filename: {type: String, default: "PP_default.png"}
    },
    methods: {
        ChoosePicture() {
            this.$refs.inputFile.click();
        },
        emitNewFile(event) {
            this.file = event.target.files[0];
            this.$emit('change-file', { file: this.file });
        }
    }
}
</script>