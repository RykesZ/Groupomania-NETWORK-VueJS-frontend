<template>
    <div class="deletePubliBackground">
        <Panel class="panelDeletePubli">
            <p>Êtes vous sûr(e) de vouloir supprimer cette publication ? Cette action irréversible supprimera aussi tous les commentaires qui y sont attachés.</p>
            <BigButton type="submit" class="deletePubliButton" text="Oui, supprimer la publication" @click="deletePubli"/>
            <BigButton type="" class="back" text="Non, revenir en arrière" @click="$emit('emit-toggle-delete')"/>
            <p v-show="alert">{{ alertMessage }}</p>
        </Panel>
    </div>
</template>

<script>
import Panel from "@/components/Frames/Panel.vue"
import BigButton from "@/components/Buttons/BigButton.vue"
export default {
    data() {
        return {
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
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    emits: ['emit-toggle-delete'],
    methods: {
        async deletePubli() {
            
        }
    }
}
</script>