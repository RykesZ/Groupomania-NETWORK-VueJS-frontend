<template>
    <div class="header">
        <LogoFil/>
        <div class="buttonsRow">
            <MainThreadButton @click="$emit('emit-redirect-main-thread')" v-if="active == 'Thread'" class="active"/><MainThreadButton @click="$emit('emit-redirect-main-thread')" v-if="active != 'Thread'"/>
            <ProfilButton @click="$emit('emit-redirect-profile')" v-if="active == 'Profile'" class="active"/><ProfilButton @click="$emit('emit-redirect-profile')" v-if="active != 'Profile'"/>
            <LogOutButton @click="$emit('emit-redirect-home')"/>
        </div>
    </div>
</template>

<script>
import LogoFil from "@/components/icons/LogoFil.vue"
import MainThreadButton from "@/components/Buttons/MainThreadButton.vue"
import ProfilButton from "@/components/Buttons/ProfilButton.vue"
import LogOutButton from "@/components/Buttons/LogOutButton.vue"
export default {
    name: 'Header',
    components: {
        LogoFil,
        MainThreadButton,
        ProfilButton,
        LogOutButton
    },
    props: {
        active: String
    },
    methods: {
        redirectMainThread() {
            this.$router.push({ name: 'Fil' });
        },
        redirectProfile() {
            this.$router.push({ name: 'Profil' });
        },
        redirectHome() {
            this.$router.push({ name: 'Home' });
        },
    }
}
</script>