<template>
    <Panel>
        <ExitCross @click="$emit('emit-close-pop-up')" />
        <ChampForm v-for="champ in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
        <p>Date de naissance :</p>
        <BirthdayForm/>
        <p>Genre :</p>
        <GenderForm/>
        <router-link to="/fil"><BigButton :type="signupButton.type" :class="signupButton.classe" :text="signupButton.text"/></router-link>
    </Panel>
</template>

<script>
import BirthdayForm from '@/components/IdentityForm/BirthdayForm.vue'
import ChampForm from "@/components/IdentityForm/ChampForm.vue"
import GenderForm from "@/components/IdentityForm/GenderForm.vue"
import ExitCross from "@/components/Buttons/ExitCross.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import Panel from "@/components/Frames/Panel.vue"
export default {
    name: 'SignupMenu',
    methods: {
        emits: ['emit-close-pop-up']
    },
    data() {
        return {
            info: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: true},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: true},
                {type: "email", name: "email", id: "emailSignup", placeholder: "Adresse e-mail", required: true},
                {type: "password", name: "password", id: "passwordSignup", placeholder: "Mot de passe", required: true},
                {type: "password", name: "passwordVerif", id: "passwordSignupVerif", placeholder: "Ré-entrez le mot de passe", required: true}
            ],
            signupButton: {type: "submit", classe: "signup", text: "Je m'inscris !"}
        }
    },
    components: {
        BirthdayForm,
        ChampForm,
        GenderForm,
        ExitCross,
        BigButton,
        Panel
    }
}
</script>