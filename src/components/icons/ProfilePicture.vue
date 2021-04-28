<template>
    <div>
        <img :src="require(`@/assets/icons/${filename}`)" alt="Image de Profil">
    </div>
</template>

<script>
export default {
    name: 'ProfilePicture',
    props: {
        filename: {type: String, default: "PP_default.png"}
    }
}
</script>