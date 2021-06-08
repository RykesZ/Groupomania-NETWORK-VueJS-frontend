<template>
    <div class="pagination">
        <button class="paginationButton" @click="$emit('emit-first-page-value', 1)"><span class="material-icons">first_page</span></button>
        <button ref="firstPaginationButton" class="paginationButton" @click="$emit('emit-first-button-value', firstButtonValue), changeActiveButton($event)"><span>{{ firstButtonValue }}</span></button>
        <button ref="secondPaginationButton" class="paginationButton" @click="$emit('emit-second-button-value', secondButtonValue), changeActiveButton($event)"><span>{{ secondButtonValue }}</span></button>
        <button ref="thirdPaginationButton" class="paginationButton" @click="$emit('emit-third-button-value', thirdButtonValue), changeActiveButton($event)"><span>{{ thirdButtonValue }}</span></button>
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
        }
    },
    props: {
        firstButtonValue: {type: Number, default: 1},
        secondButtonValue: {type: Number, default: 2},
        thirdButtonValue: {type: Number, default: 3}
    },
    methods: {
        changeActiveButton(event) {
            console.log('coucou');
            this.$refs.firstPaginationButton.classList.remove('active');
            this.$refs.secondPaginationButton.classList.remove('active');
            this.$refs.thirdPaginationButton.classList.remove('active');
            event.target.classList.add('active');
        }
    },
    computed: {

    },
    watch: {
    }
}
</script>