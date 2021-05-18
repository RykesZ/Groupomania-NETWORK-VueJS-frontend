<template>
    <Panel>
        <ExitCross @click="$emit('emit-close-pop-up')" />
        <ChampForm v-for="(champ, i) in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required" v-model="info[i].modelValue"/>
        <p>Date de naissance :</p>
        <BirthdayForm v-model="birthdate"/>
        <p>Genre :</p>
        <GenderForm @select-option="pickGender"/>
        <!--<router-link to="/fil">--><BigButton :type="signupButton.type" :class="signupButton.classe" :text="signupButton.text" @click="signupNewUser()"/><!--</router-link>-->
    </Panel>
</template>

<script>
import BirthdayForm from '@/components/IdentityForm/BirthdayForm.vue'
import ChampForm from "@/components/IdentityForm/ChampForm.vue"
import GenderForm from "@/components/IdentityForm/GenderForm.vue"
import ExitCross from "@/components/Buttons/ExitCross.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import Panel from "@/components/Frames/Panel.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
export default {
    name: 'SignupMenu',
    methods: {
        emits: ['emit-close-pop-up'],
        pickGender(payload) {
            this.gender = payload.pickedOption;
        },
        async signupNewUser() {
            const data = {
                firstname: this.info[0].modelValue,
                lastname: this.info[1].modelValue,
                email: this.info[2].modelValue,
                password: this.info[3].modelValue,
                passwordVerif: this.info[4].modelValue,
                birthdate: this.birthdate,
                gender: this.gender
            };

            if (data.password === data.passwordVerif) {
                const isSignedUp = await ApiUserRoutes.signupNewUser(data);
                console.log(isSignedUp);
                /*if (isSignedUp.message = "user added") {

                }*/
            }   
        }
    },
    data() {
        return {
            info: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: true, modelValue: ""},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: true, modelValue: ""},
                {type: "email", name: "email", id: "emailSignup", placeholder: "Adresse e-mail", required: true, modelValue: ""},
                {type: "password", name: "password", id: "passwordSignup", placeholder: "Mot de passe", required: true, modelValue: ""},
                {type: "password", name: "passwordVerif", id: "passwordSignupVerif", placeholder: "Ré-entrez le mot de passe", required: true, modelValue: ""}
            ],
            signupButton: {type: "submit", classe: "signup", text: "Je m'inscris !"},
            birthdate: "",
            gender: ""
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