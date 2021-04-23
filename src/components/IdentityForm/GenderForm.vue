<template>
    <div class="genre">
            <div class="optionGenre">
                <label for="femme">Femme</label>
                <input type="radio" name="genre" id="femme" value="F" required>
            </div>
            <div class="optionGenre">
                <label for="homme">Homme</label>
                <input type="radio" name="genre" id="homme" value="H" required>
            </div>
        </div>
</template>

<script>
export default {
    name: 'GenderForm'
}
</script>

<style lang="scss">

</style>