<template>
    <div class="genre">
        <div class="optionGenre">
            <label for="femme">Femme</label>
            <input type="radio" name="genre" id="femme" value="F" required v-model="picked" @change="emitOption">
        </div>
        <div class="optionGenre">
            <label for="homme">Homme</label>
            <input type="radio" name="genre" id="homme" value="H" required v-model="picked" @change="emitOption">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GenderForm',
    data() {
        return {
            picked: "A"
        }
    },
    methods: {
        emitOption() {
            this.$emit('select-option', { pickedOption: this.picked })
        }
        
    }
}
</script>

<style lang="scss">

</style>