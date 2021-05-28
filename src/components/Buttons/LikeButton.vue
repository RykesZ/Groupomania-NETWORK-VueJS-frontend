<template>
    <button class="invisibleButton" @click="$emit('emit-like-publi')"><span class="material-icons md-24 like">thumb_up</span> <span>J'aime</span></button>
</template>

<script>
export default {
    name: 'LikeButton',
    emits: ['emit-like-publi']
}
</script>