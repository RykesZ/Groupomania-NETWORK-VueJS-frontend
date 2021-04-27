<template>
    <button :type="type" :class="classe" >{{ text }}</button>
</template>

<script>
export default {
    name: 'BigButton',
    props: {
        type: String,
        classe: String,
        text: String
    }
}
</script>