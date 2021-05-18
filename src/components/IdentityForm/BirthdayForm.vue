<template>
    <input type="date" id="dateNaissance" name="dateNaissance" :value="modelValue" min="1901-01-01" :max="currentDate" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script>
export default {
    name: 'BirthdayForm',
    computed: {
        currentDate() {
            return new Date().getDate()
        }
    },
    props: {
        modelValue: Date
    },
    emits: ['update:modelValue']
}
</script>

<style lang="scss">

</style>