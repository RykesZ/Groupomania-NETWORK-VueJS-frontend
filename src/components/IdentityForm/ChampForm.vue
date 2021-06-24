<template>
    <input :type="type" :name="name" :id="id" :placeholder="placeholder" :required="required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" maxlength="255">
</template>

<script>
export default {
    name: 'ChampForm',
    props: {
        type: String,
        name: String,
        id: String,
        placeholder: String,
        required: Boolean,
        modelValue: String
    },
    emits: ['update:modelValue']
}
</script>

<style lang="scss">

</style>