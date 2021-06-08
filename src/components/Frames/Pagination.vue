<template>
    <div class="pagination">
        <!-- |< -->
        <button ref="firstPagePaginationButton" class="paginationButton" @click="$emit('emit-first-page-value', 1), changeActiveButton($event)"><span class="material-icons">first_page</span></button>
        <!-- 1 -->
        <button ref="firstPaginationButton" class="paginationButton" @click="$emit('emit-first-button-value', firstButtonValue), changeActiveButton($event)"><span>{{ firstButtonValue }}</span></button>
        <!-- 2 -->
        <button v-if="activeSecondButton" ref="secondPaginationButton" class="paginationButton" @click="$emit('emit-second-button-value', secondButtonValue), changeActiveButton($event)"><span>{{ secondButtonValue }}</span></button>
        <!-- 3 -->
        <button v-if="activeThirdButton" ref="thirdPaginationButton" class="paginationButton" @click="$emit('emit-third-button-value', thirdButtonValue), changeActiveButton($event)"><span>{{ thirdButtonValue }}</span></button>
        <!-- ... -->
        <button class="paginationButton"><span>...</span></button>
        <!-- >| -->
        <button ref="lastPagePaginationButton" class="paginationButton" @click="$emit('emit-last-page-value', 'max'), changeActiveButton($event)"><span class="material-icons">last_page</span></button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    emits: ['emit-first-page-value', 'emit-first-button-value', 'emit-second-button-value', 'emit-third-button-value', 'emit-last-page-value'],
    data() {
        return {
            activeSecondButton: false,
            activeThirdButton: false,
        }
    },
    props: {
        firstButtonValue: {type: Number, default: 1},
        secondButtonValue: {type: Number, default: 2},
        thirdButtonValue: {type: Number, default: 3},
        allPubliLength: {type: Number, default: null}
    },
    methods: {
        changeActiveButton(event) {
            console.log('coucou');
            this.$refs.firstPagePaginationButton.classList.remove('active');
            this.$refs.firstPaginationButton.classList.remove('active');
            this.$refs.secondPaginationButton.classList.remove('active');
            this.$refs.thirdPaginationButton.classList.remove('active');
            this.$refs.lastPagePaginationButton.classList.remove('active');
            event.target.classList.add('active');
        }
    },
    computed: {
    },
    watch: {
        allPubliLength() {
            if (this.allPubliLength > 10) {
                this.activeSecondButton = true;
                if (this.allPubliLength > 20) {
                    this.activeThirdButton = true;
                } else {
                    this.activeThirdButton = false;
                }
            } else {
                this.activeSecondButton = false;
                this.activeThirdButton = false;
            }
        }
    }
}
</script>