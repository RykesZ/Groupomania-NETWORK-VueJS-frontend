<template>
    <Header/>
    <ProfileContent/>
</template>

<script>
import Header from "@/components/Header.vue"
import ProfileContent from "@/components/ProfileContent.vue"
export default {
    name: 'Profil',
    components: {
        Header,
        ProfileContent
    }
}
</script>