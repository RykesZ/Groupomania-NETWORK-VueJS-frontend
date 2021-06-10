<template>
    <div class="pagination">
        <!-- |< -->
        <button ref="firstPagePaginationButton" class="paginationButton" @click="$emit('emit-first-page-value', 1), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">first_page</span></button>
        <!-- < -->
        <button v-if="activePreviousButton" ref="previousPagePaginationButton" class="paginationButton" @click="$emit('emit-previous-page-value', previousPageValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">navigate_before</span></button>
        <!-- 1 -->
        <button ref="firstPaginationButton" class="paginationButton active" @click="$emit('emit-first-button-value', firstButtonValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span>{{ firstButtonValue }}</span></button>
        <!-- 2 -->
        <button v-if="activeSecondButton" ref="secondPaginationButton" class="paginationButton" @click="$emit('emit-second-button-value', secondButtonValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span>{{ secondButtonValue }}</span></button>
        <!-- 3 -->
        <button v-if="activeThirdButton" ref="thirdPaginationButton" class="paginationButton" @click="$emit('emit-third-button-value', thirdButtonValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span>{{ thirdButtonValue }}</span></button>
        <!-- ... -->
        <button v-if="activeSearchButton" class="paginationButton" @click="searchPage"><span>...</span></button>
        <!-- > -->
        <button v-if="activeNextButton" ref="nextPagePaginationButton" class="paginationButton" @click="$emit('emit-next-page-value', nextPageValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">navigate_next</span></button>
        <!-- >| -->
        <button ref="lastPagePaginationButton" class="paginationButton" @click="$emit('emit-last-page-value', 'max'), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">last_page</span></button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    emits: ['emit-first-page-value', 'emit-first-button-value', 'emit-second-button-value', 'emit-third-button-value', 'emit-last-page-value','emit-previous-page-value', 'emit-next-page-value', 'emit-search-page-value', 'emit-scroll-to-top'],
    data() {
        return {
            activePreviousButton: false,
            activeSecondButton: false,
            activeThirdButton: false,
            activeSearchButton: false,
            activeNextButton: false,
            activeButton: 1
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
            if ((event.target == this.$refs.firstPaginationButton && this.firstButtonValue == 1) || event.target == this.$refs.firstPagePaginationButton || (event.target == this.$refs.previousPagePaginationButton && this.secondButtonValue == 2)) {
                this.setActiveButton(1);
            } else if (event.target == this.$refs.lastPagePaginationButton || (event.target == this.$refs.nextPagePaginationButton && this.thirdButtonValue == Math.ceil(this.allPubliLength / 10)) || (event.target == this.$refs.thirdPaginationButton && this.thirdButtonValue == Math.ceil(this.allPubliLength / 10))) {
                this.setActiveButton(3);
            } else {
                this.setActiveButton(2);
            }
        },
        searchPage() {
            let pageNumber = prompt("Entrez le numéro de la page à laquelle vous souhaitez accéder :");
            if ((pageNumber != null || pageNumber != "") && pageNumber.match(/^[0-9]+$/) ) {
                this.$emit('emit-search-page-value', pageNumber);
                this.$emit('emit-scroll-to-top');

                if (pageNumber == Math.ceil(this.allPubliLength / 10) || pageNumber > Math.ceil(this.allPubliLength / 10)) {
                    // Désactive tous les boutons
                    this.$refs.firstPagePaginationButton.classList.remove('active');
                    this.$refs.firstPaginationButton.classList.remove('active');
                    this.$refs.secondPaginationButton.classList.remove('active');
                    this.$refs.thirdPaginationButton.classList.remove('active');
                    this.$refs.lastPagePaginationButton.classList.remove('active');
                    // Active le 3eme bouton
                    this.$refs.thirdPaginationButton.classList.add('active');
                    this.activeButton = 3;
                } else if (pageNumber < Math.ceil(this.allPubliLength / 10) && pageNumber > 1) {
                    // Désactive tous les boutons
                    this.$refs.firstPagePaginationButton.classList.remove('active');
                    this.$refs.firstPaginationButton.classList.remove('active');
                    this.$refs.secondPaginationButton.classList.remove('active');
                    this.$refs.thirdPaginationButton.classList.remove('active');
                    this.$refs.lastPagePaginationButton.classList.remove('active');
                    // Active le 2eme bouton
                    this.$refs.secondPaginationButton.classList.add('active');
                    this.activeButton = 2;
                } else if (pageNumber == 1) {
                    // Désactive tous les boutons FACTORISER TOUT CA EN UNE SEULE FONCTION QUI ACTIVE/DESACTIVE
                    this.$refs.firstPagePaginationButton.classList.remove('active');
                    this.$refs.firstPaginationButton.classList.remove('active');
                    this.$refs.secondPaginationButton.classList.remove('active');
                    this.$refs.thirdPaginationButton.classList.remove('active');
                    this.$refs.lastPagePaginationButton.classList.remove('active');
                    // Active le 1er bouton
                    this.$refs.firstPaginationButton.classList.add('active');
                    this.activeButton = 1;
                }


            } else {
                window.alert("La valeur entrée est incorrecte")
            }
        },
        setActiveButton(buttonNumber) {
            console.log({"ça marche bien": buttonNumber});
            if (buttonNumber == 1) {
                // Désactive tous les boutons FACTORISER TOUT CA EN UNE SEULE FONCTION QUI ACTIVE/DESACTIVE
                this.$refs.firstPagePaginationButton.classList.remove('active');
                this.$refs.firstPaginationButton.classList.remove('active');
                this.$refs.secondPaginationButton.classList.remove('active');
                this.$refs.thirdPaginationButton.classList.remove('active');
                this.$refs.lastPagePaginationButton.classList.remove('active');
                // Active le 1er bouton
                this.$refs.firstPaginationButton.classList.add('active');
                this.activeButton = 1;
            } else if (buttonNumber == 2) {
                // Désactive tous les boutons
                this.$refs.firstPagePaginationButton.classList.remove('active');
                this.$refs.firstPaginationButton.classList.remove('active');
                this.$refs.secondPaginationButton.classList.remove('active');
                this.$refs.thirdPaginationButton.classList.remove('active');
                this.$refs.lastPagePaginationButton.classList.remove('active');
                // Active le 2eme bouton
                this.$refs.secondPaginationButton.classList.add('active');
                this.activeButton = 2;
            } else if (buttonNumber == 3) {
                // Désactive tous les boutons
                this.$refs.firstPagePaginationButton.classList.remove('active');
                this.$refs.firstPaginationButton.classList.remove('active');
                this.$refs.secondPaginationButton.classList.remove('active');
                this.$refs.thirdPaginationButton.classList.remove('active');
                this.$refs.lastPagePaginationButton.classList.remove('active');
                // Active le 3eme bouton
                this.$refs.thirdPaginationButton.classList.add('active');
                this.activeButton = 3;
            }
        }
    },
    computed: {
        previousPageValue() {
            if (this.activeButton == 3) {
                return this.secondButtonValue;
            } else {
                return this.secondButtonValue - 1;
            }
        },
        nextPageValue() {
            if (this.activeButton == 1) {
                return this.secondButtonValue;
            } else {
                return this.secondButtonValue + 1;
            }
            
        }
    },
    watch: {
        allPubliLength() {
            if (this.allPubliLength > 10) {
                this.activeSecondButton = true;
                if (this.allPubliLength > 20) {
                    this.activeThirdButton = true;
                    if (this.allPubliLength > 30) {
                        this.activeSearchButton = true;
                    } else {
                        this.activeSearchButton = false;
                    }
                } else {
                    this.activeThirdButton = false;
                }
            } else {
                this.activeSecondButton = false;
                this.activeThirdButton = false;
            }
        },
        firstButtonValue() {
            if (this.firstButtonValue > 1 || this.activeButton > 1) {
                this.activePreviousButton = true;
            } else {
                this.activePreviousButton = false;
            }
        },
        activeButton() {
            if (this.firstButtonValue > 1 || this.activeButton > 1) {
                this.activePreviousButton = true;
            } else {
                this.activePreviousButton = false;
            }

            if (this.activeButton == 3) {
                this.activeNextButton = false;
            } else {
                this.activeNextButton = true;
            }
        }
    },
    beforeMount() {
        if (this.secondButtonValue > 1 && this.activeSecondButton == true) {
            this.activeNextButton = true;
        } else {
            this.activeNextButton = false;
        }
    }
}
</script>