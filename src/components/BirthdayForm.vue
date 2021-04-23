<template>
    <div class="dateNaissance">
        <select name="jourNaissance" id="jourNaissance" aria-label="Jour" title="Jour" required>
            <option disabled value="0">Jour</option>
            <option value="1">1</option>
        </select>
        <select name="moisNaissance" id="moisNaissance" aria-label="Mois" title="Mois" required>
            <option disabled value="0">Mois</option>
            <option value="1">Janvier</option>
        </select>
        <select name="annéeNaissance" id="anneeNaissance" aria-label="Année" title="Année" required>
            <option disabled value="0">Année</option>
            <option value="1">1901</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'ChampForm',
    props: {
        
    }
}
</script>

<style lang="scss">

</style>