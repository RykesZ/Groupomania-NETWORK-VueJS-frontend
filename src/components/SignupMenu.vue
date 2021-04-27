<template>
    <div class="panelOverlay">
        <button class="exitCross" @click="closePopUp">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <ChampForm v-for="champ in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
        <p>Date de naissance :</p>
        <BirthdayForm/>
        <p>Genre :</p>
        <GenderForm/>
        <button type="submit" class="signup">Je m'inscris !</button>
    </div>
</template>

<script>
import BirthdayForm from './IdentityForm/BirthdayForm.vue'
import ChampForm from "./IdentityForm/ChampForm.vue"
import GenderForm from "./IdentityForm/GenderForm.vue"
export default {
    name: 'SignupMenu',
    methods: {
        closePopUp() {
            this.$emit('close-pop-up')
        }
    },
    data() {
        return {
            info: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: true},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: true},
                {type: "email", name: "email", id: "emailSignup", placeholder: "Adresse e-mail", required: true},
                {type: "password", name: "password", id: "passwordSignup", placeholder: "Mot de passe", required: true},
                {type: "password", name: "passwordVerif", id: "passwordSignupVerif", placeholder: "Ré-entrez le mot de passe", required: true}
            ]
        }
    },
    components: {
        ChampForm,
        BirthdayForm,
        GenderForm
    }
}
</script>

<style lang="scss">

</style>