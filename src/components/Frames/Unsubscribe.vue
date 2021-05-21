<template>
    <div class="block"></div>
    <Panel class="unsubscribePanel">
        <p>Êtes vous sûr(e) de vouloir vous désinscrire ? Vous ne pourrez plus publier ni lire de publications de vos collègues, et vos publications seront effacées.</p>
        <input type="checkbox" name="deletePubAndComms" id="deletePubAndComms" v-model="deletePubAndComms">
        <label for="deletePubAndComms">En cochant cette case, vous demandez qu'en plus que votre compte et vos informations personnelles soient supprimés, les publications et commentaires y étant rattachés soient aussi supprimés. Sinon, vos publications seront conservées mais masquées pour tous les utilisateurs, et vos commentaires seront conservés et visibles pour tous les utilisateurs bien que votre identité soit anonymisée.</label>
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
            deletePubAndComms: "",
            alert: false
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
    methods: {
        emits: ['emit-toggle-unsubscribe'],
        async unsubscribe() {
            const payload = {
                deletePubAndComm: this.deletePubAndComms,
                userId: this.userId
            }
            const deleteConfirmation = await ApiUserRoutes.deleteUser(payload);
            if (deleteConfirmation.message === "user deleted") {
                this.alert = true;
                this.alertMessage = "Désinscription confirmée. En espérant vous revoir !";
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