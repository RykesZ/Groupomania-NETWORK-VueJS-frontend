<template>
    <Header :active="active"/>
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
    },
    computed: {
        active() {
            return "Profile"
        }
    }
}
</script>