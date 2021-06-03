<template>
    <div class="headerCreatePublication">
        <button class="backToThreadButton invisibleButton" @click="$emit('emit-redirect-main-thread')"><span class="material-icons md-36">arrow_back</span></button>
        <p>Créer une publication</p>
        <BigButton type="" class="publishButton" :text="text" id="publish" @click="$emit('emit-send-publi')"/>
    </div>
</template>

<script>
import BigButton from "@/components/Buttons/BigButton.vue"
export default {
    name: 'HeaderCreatePublication',
    props: {
        text: String
    },
    emits: ['emit-send-publi', 'emit-redirect-main-thread'],
    components: {
        BigButton
    },
    methods: {
        /*backToFil() {
            this.$router.push({ name: 'Fil' })
        }*/
    }
}
</script>