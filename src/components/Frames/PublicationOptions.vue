<template>
    <div class="panelPubliOptions">
        <button class="buttonPubliOptions" @click="$emit('emit-redirect-modify-publi')">Modifier</button>
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
    emits: ['show-publi-options', 'emit-toggle-delete', 'emit-redirect-modify-publi'],
    methods: {
        
    },
    components: {
    }
}
</script>