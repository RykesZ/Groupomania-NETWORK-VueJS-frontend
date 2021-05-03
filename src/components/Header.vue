<template>
    <div class="header">
        <LogoFil/>
        <div class="buttonsRow">
            <router-link to="/fil"><MainThreadButton/></router-link>
            <router-link to="/profil"><ProfilButton/></router-link>
            <router-link to="/"><LogOutButton/></router-link>
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
    }
}
</script>