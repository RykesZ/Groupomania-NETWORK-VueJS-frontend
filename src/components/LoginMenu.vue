<template>
    <div class="panelsContainer">
        <LogoHome />
        <div class="panel" v-show="!overlay">
            <ChampForm v-for="champ in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
            <BigButton :type="loginButton.type" :class="loginButton.classe" :text="loginButton.text" /><br>
            <a href="#">Mot de passe oublié ?</a><br>
            <BigButton :type="signupButton.type" :class="signupButton.classe" :text="signupButton.text" @click="overlayToggle()"/>
        </div>
        <div class="overlay" v-show="overlay">
            <SignupMenu @close-pop-up="overlayToggle()"/>
        </div>
    </div>
</template>

<script>
import SignupMenu from "./SignupMenu.vue"
import LogoHome from "./icons/LogoHome.vue"
import ChampForm from "./IdentityForm/ChampForm.vue"
import BigButton from "./Buttons/BigButton.vue"
export default {
    name: 'LoginMenu',
    data() {
        return {
            overlay: false,
            info: [
                {type: "email", name: "email", id: "emailLogin", placeholder: "Adresse e-mail", required: true},
                {type: "password", name: "password", id: "passwordLogin", placeholder: "Mot de passe", required: true}
            ],
            loginButton: {type: "submit", classe: "login", text: "Connexion"},
            signupButton: {type: "", classe: "accountCreate", text: "Créer un compte"}
        }
    },
    methods: {
        overlayToggle() {
            this.overlay = !this.overlay
        }
    },
    props: {
    },
    components: {
        SignupMenu,
        LogoHome,
        ChampForm,
        BigButton
    }
}
</script>

<style lang="scss">
</style>