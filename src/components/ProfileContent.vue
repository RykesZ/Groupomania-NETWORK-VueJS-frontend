<template>
    <div class="profileContainer">
        <div class="PPIdentity">
            <ProfilePicture filename="ItaloMeloPP.jpg"/>
            <div class="identity">
                <ChampForm v-for="champ in info1" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
            </div>
        </div>
        <div class="logIds">
            <ChampForm v-for="champ in info2" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
        </div>
        <div class="otherInfos">
            <p>Date de naissance :</p>
            <BirthdayForm/>
            <p>Genre :</p>
            <GenderForm/>
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
export default {
    name: 'ProfileContent',
    data() {
        return {
            info1: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: false},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: false},
            ],
            info2: [
                {type: "email", name: "email", id: "emailSignup", placeholder: "Adresse e-mail", required: false},
                {type: "password", name: "password", id: "passwordSignup", placeholder: "Mot de passe", required: true},
                {type: "password", name: "passwordVerif", id: "passwordSignupVerif", placeholder: "Ré-entrez le mot de passe", required: true}
            ],
            updateButton: {type: "submit", classe: "updateButton", text: "Mettre à jour"}
        }
    },
    components: {
        ProfilePicture,
        ChampForm,
        BirthdayForm,
        GenderForm,
        BigButton
    }
}
</script>