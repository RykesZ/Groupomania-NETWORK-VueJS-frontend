<template>
    <input :type="type" :name="name" :id="id" :placeholder="placeholder" :required="required">
</template>

<script>
export default {
    name: 'ChampForm',
    props: {
        type: String,
        name: String,
        id: String,
        placeholder: String,
        required: Boolean
    }
}
</script>

<style lang="scss">

</style>