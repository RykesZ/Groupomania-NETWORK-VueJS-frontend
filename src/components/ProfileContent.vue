<template>
    <div class="profileContainer">
        <div class="PPIdentity">
            <div class="profilePictureChange">
                <ProfilePicture :filename="imageUrl" @change-file="setNewFile" :changePicture="changePicture"/>
                <span class="fileName">{{ fileName }}</span>
                <progress max="100" :value.prop="uploadPercentage" v-if="uploadPercentage > 0"></progress>
            </div>
            
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
        <BigButton :type="updateButton.type" :class="updateButton.classe" :text="updateButton.text" @click="updateProfile"/>
        <p class="fakeLink" @click="toggleUnsubscribe">Me désinscrire</p>
        <p v-show="alert">{{ alertMessage }}</p>
        <Unsubscribe v-if="unsubscribePopUp" @emit-toggle-unsubscribe="toggleUnsubscribe"/>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import ChampForm from "@/components/IdentityForm/ChampForm.vue"
import BirthdayForm from '@/components/IdentityForm/BirthdayForm.vue'
import GenderForm from "@/components/IdentityForm/GenderForm.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
import Unsubscribe from "@/components/Frames/Unsubscribe.vue"
export default {
    name: 'ProfileContent',
    data() {
        return {
            info1: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: false, modelValue: ""},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: false, modelValue: ""},
            ],
            info2: [
                {type: "email", name: "email", id: "emailProfile", placeholder: "Adresse e-mail", required: false, modelValue: ""},
                {type: "password", name: "password", id: "passwordProfile", placeholder: "Nouveau mot de passe", required: true, modelValue: ""},
                {type: "password", name: "passwordVerif", id: "passwordProfileVerif", placeholder: "Ré-entrez le nouveau mot de passe", required: true, modelValue: ""}
            ],
            updateButton: {type: "submit", classe: "updateButtonActive", text: "Mettre à jour"},
            birthdate: "",
            gender: "",
            imageUrl: "",
            alert: false,
            alertMessage: "",
            file: null,
            activeInputs: false,
            unsubscribePopUp: false,
            changePicture: true,
            uploadPercentage: 0,
            fileName: null,
        }
    },
    components: {
        ProfilePicture,
        ChampForm,
        BirthdayForm,
        GenderForm,
        BigButton,
        Unsubscribe
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
        setNewFile(payload) {
            this.file = payload.file;
            this.fileName = payload.file.name;
            this.uploadPercentage = 50;
            setTimeout(() => {
                this.uploadPercentage = 75;
            },500);
            setTimeout(() => {
                this.uploadPercentage = 80;
            },550);
            setTimeout(() => {
                this.uploadPercentage = 100;
            },1000);
        },
        async updateProfile() {
            const data = {
                userId: this.userId,
                firstname:  this.info1[0].modelValue,
                lastname: this.info1[1].modelValue,
                email: this.info2[0].modelValue,
                password: this.info2[1].modelValue,
                passwordVerif: this.info2[2].modelValue,
                birthdate: this.birthdate,
                gender: this.gender,
            };
            const file = this.file;
            console.log(data);
            //Permet de remplacer les champs vides par la valeur null, ce qui permettra à la BDD de considérer que la valeur précédente doit être conservée lors de l'update
            for (let property in data) {
                if (data[property] == "" || data[property] == undefined) {
                    data[property] = null;
                }
            }

            console.log(data);
            const authToken = this.token;
            console.log(authToken);
            const payload = {data, authToken};

            if (data.password === data.passwordVerif) {
                this.alert = false;
                console.log(this.file);
                const updateConfirmation = await ApiUserRoutes.updateUser(payload, file);
                console.log(updateConfirmation);
                if (updateConfirmation.data.message === "user updated") {
                    window.location.reload();
                } else {
                    this.alert = true;
                    this.alertMessage = "Erreur du serveur, réessayez plus tard."
                }
            } else {
                this.alert = true;
                this.alertMessage = "Les mots de passe de correspondent pas !"
            }
        },
        toggleUnsubscribe() {
            this.unsubscribePopUp = !this.unsubscribePopUp
        }
    },
    async beforeMount() {
        const authPayload = { userId: this.userId, token: this.token }
        const userInfo = await ApiUserRoutes.getUserInfo(authPayload);
        this.info1[0].placeholder = await userInfo.data.response.firstname;
        this.info1[1].placeholder = await userInfo.data.response.lastname;
        this.info2[0].placeholder = await userInfo.data.response.email;
        this.birthdate = await userInfo.data.response.birthdate;
        this.gender = await userInfo.data.response.gender;
        this.$refs.genderForm.setPicked(this.gender);
        this.imageUrl = await userInfo.data.response.imageUrl;
        console.log(userInfo);
    }
}
</script>