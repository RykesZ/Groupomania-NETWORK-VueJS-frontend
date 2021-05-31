<template>
    <div class="panelPubliOptions">
        <button class="buttonPubliOptions">Modifier</button>
        <button class="buttonPubliOptions" @click="$emit('emit-toggle-delete')">Supprimer</button>
        <button class="buttonPubliOptions" @click="$emit('show-publi-options')">Annuler</button>
    </div>
    
</template>

<script>
export default {
    name: 'PublicationOptions',
    data() {
        return {
            
        }
    },
    emits: ['show-publi-options'],
    methods: {
        
    },
    components: {
    }
}
</script>