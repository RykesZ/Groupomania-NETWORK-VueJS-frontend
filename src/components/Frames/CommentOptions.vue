<template>
    <div class="panelCommentOptions">
        <button class="buttonCommentOptions" @click="$emit('emit-toggle-modify-comment')">Modifier</button>
        <button class="buttonCommentOptions" @click="$emit('emit-delete-comment')">Supprimer</button>
        <!--<button class="buttonCommentOptions" @click="$emit('show-comment-options')">Annuler</button>-->
    </div>
    
</template>

<script>
export default {
    name: 'CommentOptions',
    data() {
        return {
            
        }
    },
    emits: ['show-comment-options', 'emit-delete-comment', 'emit-toggle-modify-comment'],
    methods: {
        
    },
    components: {
    }
}
</script>