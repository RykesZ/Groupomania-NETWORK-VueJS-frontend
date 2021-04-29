<template>
    <div class="headerCreatePublication">
        <button class="backToThreadButton invisibleButton"><span class="material-icons md-36">arrow_back</span></button>
        <p>Créer une publication</p>
        <BigButton type="" class="publishButton" text="PUBLIER" id="publish"/>
    </div>
</template>

<script>
import BigButton from "@/components/Buttons/BigButton.vue"
export default {
    name: 'HeaderCreatePublication',
    components: {
        BigButton
    }
}
</script>