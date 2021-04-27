<template>
        <Panel>
            <ChampForm v-for="champ in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
            <BigButton :type="loginButton.type" :class="loginButton.classe" :text="loginButton.text" />
            <a href="#">Mot de passe oublié ?</a>
            <BigButton :type="signupButton.type" :class="signupButton.classe" :text="signupButton.text" @click="$emit('emit-overlay-toggle')"/>
        </Panel>
</template>

<script>
import ChampForm from "@/components/IdentityForm/ChampForm.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import Panel from "@/components/Frames/Panel.vue"
export default {
    name: 'LoginMenu',
    data() {
        return {
            info: [
                {type: "email", name: "email", id: "emailLogin", placeholder: "Adresse e-mail", required: true},
                {type: "password", name: "password", id: "passwordLogin", placeholder: "Mot de passe", required: true}
            ],
            loginButton: {type: "submit", classe: "login", text: "Connexion"},
            signupButton: {type: "", classe: "accountCreate", text: "Créer un compte"}
        }
    },
    methods: {
        emits: ['emit-overlay-toggle']
    },
    components: {
        ChampForm,
        BigButton,
        Panel
    }
}
</script>

<style lang="scss">
</style>