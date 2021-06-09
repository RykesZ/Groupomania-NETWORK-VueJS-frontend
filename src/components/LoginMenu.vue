<template>
        <Panel>
            <ChampForm v-for="(champ, i)  in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required" v-model="info[i].modelValue"/>
            <BigButton :type="loginButton.type" :class="loginButton.classe" :text="loginButton.text" @click="loginUser()"/>
            <!--<a href="#">Mot de passe oublié ?</a>-->
            <BigButton :type="signupButton.type" :class="signupButton.classe" :text="signupButton.text" @click="$emit('emit-overlay-toggle')"/>
            <p v-show="alert">{{ alertMessage }}</p>
        </Panel>
</template>

<script>
import ChampForm from "@/components/IdentityForm/ChampForm.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import Panel from "@/components/Frames/Panel.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
export default {
    name: 'LoginMenu',
    data() {
        return {
            info: [
                {type: "email", name: "email", id: "emailLogin", placeholder: "Adresse e-mail", required: true, modelValue: ""},
                {type: "password", name: "password", id: "passwordLogin", placeholder: "Mot de passe", required: true, modelValue: ""}
            ],
            loginButton: {type: "submit", classe: "login", text: "Connexion"},
            signupButton: {type: "", classe: "accountCreate", text: "Créer un compte"},
            alert: false,
            alertMessage: ""
        }
    },
    methods: {
        emits: ['emit-overlay-toggle'],
        async loginUser() {
            const loginData = {
                email: this.info[0].modelValue,
                password: this.info[1].modelValue
            };

            const isLoggedIn = await ApiUserRoutes.loginUser(loginData);
            console.log(isLoggedIn);
            try {
                if (isLoggedIn.data.userId && isLoggedIn.data.token) {
                console.log(isLoggedIn);
                localStorage.setItem('userId', JSON.stringify(isLoggedIn.data.userId));
                localStorage.setItem('token', JSON.stringify(isLoggedIn.data.token));
                this.$router.push({ name: 'Fil' });
                } else {
                    this.alert = true;
                    this.alertMessage = "Utilisateur inconnu"
                }
            } catch {
                this.alert = true;
                    this.alertMessage = "Utilisateur inconnu"
            }
            
        }
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