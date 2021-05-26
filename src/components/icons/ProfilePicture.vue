<template>
    <div class="PPContainer">
        <img :src="`${filename}`" alt="Image de Profil">
        <button class="changePicture invisibleButton" @click="ChoosePicture" v-if="changePicture">
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
            file: ''
        }
    },
    props: {
        filename: {type: String, default: "PP_default.png"},
        changePicture: {type: Boolean, default: false}
    },
    methods: {
        ChoosePicture() {
            this.$refs.inputFile.click();
        },
        emitNewFile() {
            this.file = this.$refs.inputFile.files[0];
            this.$emit('change-file', { file: this.file });
        }
    }
}
</script>