<template>
    <input type="date" id="dateNaissance" name="dateNaissance" :value="currentDate" min="1901-01-01" :max="currentDate">
</template>

<script>
export default {
    name: 'BirthdayForm',
    computed: {
        currentDate() {
            return new Date().getDate()
        }
    }
}
</script>

<style lang="scss">

</style>