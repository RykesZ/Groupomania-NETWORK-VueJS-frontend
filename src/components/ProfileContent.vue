<template>
    <div class="profileContainer">
        <div class="PPIdentity">
            <ProfilePicture :filename="imageUrl"/>
            <div class="identity">
                <ChampForm v-for="(champ, i) in info1" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required" v-model="info1[i].modelValue"/>
            </div>
        </div>
        <div class="logIds">
            <ChampForm v-for="(champ, i) in info2" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required" v-model="info2[i].modelValue"/>
        </div>
        <div class="otherInfos">
            <p>Date de naissance :</p>
            <BirthdayForm v-model="birthdate"/>
            <p>Genre :</p>
            <GenderForm @select-option="pickGender" ref="genderForm"/>
        </div>
        <BigButton :type="updateButton.type" :class="updateButton.classe" :text="updateButton.text"/>
        <a href="#">Me désinscrire</a>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import ChampForm from "@/components/IdentityForm/ChampForm.vue"
import BirthdayForm from '@/components/IdentityForm/BirthdayForm.vue'
import GenderForm from "@/components/IdentityForm/GenderForm.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
export default {
    name: 'ProfileContent',
    data() {
        return {
            info1: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: false, modelValue: ""},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: false, modelValue: ""},
            ],
            info2: [
                {type: "email", name: "email", id: "emailSignup", placeholder: "Adresse e-mail", required: false, modelValue: ""},
                {type: "password", name: "password", id: "passwordSignup", placeholder: "Nouveau mot de passe", required: true, modelValue: ""},
                {type: "password", name: "passwordVerif", id: "passwordSignupVerif", placeholder: "Ré-entrez le nouveau mot de passe", required: true, modelValue: ""}
            ],
            updateButton: {type: "submit", classe: "updateButton", text: "Mettre à jour"},
            birthdate: "",
            gender: "",
            imageUrl: ""
        }
    },
    components: {
        ProfilePicture,
        ChampForm,
        BirthdayForm,
        GenderForm,
        BigButton
    },
    computed: {
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        token() {
            //return this.$store.state.token;
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    methods: {
        pickGender(payload) {
            this.gender = payload.pickedOption;
        },
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token }
        const userInfo = await ApiUserRoutes.getUserInfo(authPayload);
        this.info1[0].placeholder = userInfo.response.firstname;
        this.info1[1].placeholder = userInfo.response.lastname;
        this.info2[0].placeholder = userInfo.response.email;
        this.birthdate = userInfo.response.birthdate;
        this.gender = userInfo.response.gender;
        console.log(this.gender);
        this.$refs.genderForm.setPicked(this.gender);
        this.imageUrl = userInfo.response.imageUrl;
        console.log(this.imageUrl);
    }
}
</script>