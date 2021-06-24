<template>
    <div class="block"></div>
    <Panel class="unsubscribePanel">
        <p>Êtes vous sûr(e) de vouloir vous désinscrire ? Vous ne pourrez plus publier ni lire de publications de vos collègues, et vos publications, vos commentaires, et vos informations personnelles seront effacés.</p>
        <input type="checkbox" name="deletePubAndComms" id="deletePubAndComms" v-model="deletePubAndComms">
        <label for="deletePubAndComms">En cochant cette case, vous autorisez Groupomania NETWORK à conserver vos commentaires anonymisés dans le but de garder compréhensible les conversations auxquelles vous avez participé. Vos informations personnelles ainsi que vos publications seront supprimées.</label>
        <BigButton :type="unsubscribeButton.type" :class="unsubscribeButton.classe" :text="unsubscribeButton.text" @click="unsubscribe"/>
        <BigButton :type="backButton.type" :class="backButton.classe" :text="backButton.text" @click="$emit('emit-toggle-unsubscribe')"/>
        <p v-show="alert">{{ alertMessage }}</p>
    </Panel>
</template>

<script>
import Panel from "@/components/Frames/Panel.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
import ApiUserRoutes from "@/services/ApiUserRoutes"
export default {
    data() {
        return {
            unsubscribeButton: {type: "submit", classe: "unsubscribe", text: "Oui, me désinscrire"},
            backButton: {type: "", classe: "back", text: "Non, revenir en arrière"},
            deletePubAndComms: null,
            alert: false,
            alertMessage: ""
        }
    },
    components: {
        Panel,
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
    emits: ['emit-toggle-unsubscribe'],
    methods: {
        // Demande l'envoi au serveur de la requête HTTP demandant de supprimer l'utilisateur et attend sa réponse
        async unsubscribe() {
            const payload = {
                deletePubAndComm: this.deletePubAndComms,
                userId: this.userId,
                authToken: this.token
            }
            const deleteConfirmation = await ApiUserRoutes.deleteUser(payload);
            console.log(deleteConfirmation);
            if (deleteConfirmation.data.message == "user deleted") {
                this.alert = true;
                this.alertMessage = "Désinscription confirmée. En espérant vous revoir !";
                localStorage.clear();
                setTimeout(() => {
                    this.$router.push({ name: 'Home' });
                }, 3000);
                
            } else {
                this.alert = true;
                this.alertMessage = deleteConfirmation.message;
            }
        }
    }
}
</script>