<template>
    <div class="pagination">
        <button class="paginationButton" @click="$emit('emit-first-page-value', 1)"><span class="material-icons">first_page</span></button>
        <button class="paginationButton" @click="$emit('emit-first-button-value', firstButtonValue)"><span>{{ firstButtonValue }}</span></button>
        <button class="paginationButton" @click="$emit('emit-second-button-value', secondButtonValue)"><span>{{ secondButtonValue }}</span></button>
        <button class="paginationButton" @click="$emit('emit-third-button-value', thirdButtonValue)"><span>{{ thirdButtonValue }}</span></button>
        <button class="paginationButton"><span>...</span></button>
        <button class="paginationButton" @click="$emit('emit-last-page-value', 'max')"><span class="material-icons">last_page</span></button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    emits: ['emit-first-page-value', 'emit-first-button-value', 'emit-second-button-value', 'emit-third-button-value', 'emit-last-page-value'],
    data() {
        return {
            firstButtonValue: 1,
            secondButtonValue: 2,
            thirdButtonValue: 3
        }
    },
    props: {

    },
    methods: {

    },
    computed: {

    }
}
</script>