<template>
    <div class="pagination">
        <!-- |< -->
        <button ref="firstPagePaginationButton" class="paginationButton" @click="$emit('emit-first-page-value', 1), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">first_page</span></button>
        <!-- < -->
        <button v-if="appearPreviousButton" ref="previousPagePaginationButton" class="paginationButton" @click="$emit('emit-previous-page-value', previousPageValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">navigate_before</span></button>
        <!-- 1 -->
        <button ref="firstPaginationButton" class="paginationButton active" @click="$emit('emit-first-button-value', firstButtonValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span>{{ firstButtonValue }}</span></button>
        <!-- 2 -->
        <button v-if="appearSecondButton" ref="secondPaginationButton" class="paginationButton" @click="$emit('emit-second-button-value', secondButtonValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span>{{ secondButtonValue }}</span></button>
        <!-- 3 -->
        <button v-if="appearThirdButton" ref="thirdPaginationButton" class="paginationButton" @click="$emit('emit-third-button-value', thirdButtonValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span>{{ thirdButtonValue }}</span></button>
        <!-- ... -->
        <button v-if="appearSearchButton" class="paginationButton" @click="searchPage"><span>...</span></button>
        <!-- > -->
        <button v-if="appearNextButton" ref="nextPagePaginationButton" class="paginationButton" @click="$emit('emit-next-page-value', nextPageValue), changeActiveButton($event), $emit('emit-scroll-to-top')"><span class="material-icons">navigate_next</span></button>
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
            appearPreviousButton: false,
            appearSecondButton: false,
            appearThirdButton: false,
            appearSearchButton: false,
            appearNextButton: false,
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
            if ((event.target == this.$refs.firstPaginationButton && this.firstButtonValue == 1) || event.target == this.$refs.firstPagePaginationButton || (event.target == this.$refs.previousPagePaginationButton && this.activeButton == 2 && this.secondButtonValue == 2)) {
                //console.log("active button 1")
                this.setActiveButton(1);
            } else if ((event.target == this.$refs.nextPagePaginationButton && this.activeButton == 1) || (event.target == this.$refs.previousPagePaginationButton && this.activeButton == 3) || ((event.target == this.$refs.thirdPaginationButton || event.target == this.$refs.nextPagePaginationButton) && this.thirdButtonValue != Math.ceil(this.allPubliLength / 10)) || (event.target == this.$refs.lastPagePaginationButton && !this.appearThirdButton)) {
                //console.log("active button 2")
                this.setActiveButton(2);
            } else if (event.target == this.$refs.lastPagePaginationButton || (event.target == this.$refs.nextPagePaginationButton && this.thirdButtonValue == Math.ceil(this.allPubliLength / 10)) || (event.target == this.$refs.thirdPaginationButton && this.thirdButtonValue == Math.ceil(this.allPubliLength / 10))) {
                //console.log("active button 3")
                this.setActiveButton(3);
            } 
        },
        searchPage() {
            let pageNumber = prompt("Entrez le numéro de la page à laquelle vous souhaitez accéder :");
            if ((pageNumber != null || pageNumber != "") && pageNumber.match(/^[0-9]+$/) ) {
                this.$emit('emit-search-page-value', pageNumber);
                this.$emit('emit-scroll-to-top');

                if (pageNumber == Math.ceil(this.allPubliLength / 10) || pageNumber > Math.ceil(this.allPubliLength / 10)) {
                    this.setActiveButton(3);
                } else if (pageNumber < Math.ceil(this.allPubliLength / 10) && pageNumber > 1) {
                    this.setActiveButton(2);
                } else if (pageNumber == 1) {
                    this.setActiveButton(1);
                }


            } else {
                window.alert("La valeur entrée est incorrecte")
            }
        },
        setActiveButton(buttonNumber) {
            //console.log({"ça marche bien": buttonNumber});
            if (buttonNumber == 1) {
                // Désactive tous les boutons FACTORISER TOUT CA EN UNE SEULE FONCTION QUI ACTIVE/DESACTIVE
                this.$refs.firstPaginationButton.classList.remove('active');
                if (this.appearSecondButton) {
                    this.$refs.secondPaginationButton.classList.remove('active');
                }
                if (this.appearThirdButton) {
                    this.$refs.thirdPaginationButton.classList.remove('active');
                }
                // Active le 1er bouton
                this.$refs.firstPaginationButton.classList.add('active');
                this.activeButton = 1;
            } else if (buttonNumber == 2) {
                // Désactive tous les boutons
                this.$refs.firstPaginationButton.classList.remove('active');
                if (this.appearSecondButton) {
                    this.$refs.secondPaginationButton.classList.remove('active');
                }
                if (this.appearThirdButton) {
                    this.$refs.thirdPaginationButton.classList.remove('active');
                }
                // Active le 2eme bouton
                this.$refs.secondPaginationButton.classList.add('active');
                this.activeButton = 2;
            } else if (buttonNumber == 3) {
                // Désactive tous les boutons
                this.$refs.firstPaginationButton.classList.remove('active');
                if (this.appearSecondButton) {
                    this.$refs.secondPaginationButton.classList.remove('active');
                }
                if (this.appearThirdButton) {
                    this.$refs.thirdPaginationButton.classList.remove('active');
                }
                // Active le 3eme bouton
                this.$refs.thirdPaginationButton.classList.add('active');
                this.activeButton = 3;
            }
        },
        testAppearNextButton() {
            if (this.appearSecondButton == true && (this.activeButton == 2 || this.activeButton == 1)) {
                this.appearNextButton = true;
            } else {
                this.appearNextButton = false;
            }
        },
        testAppearPreviousButton() {
            if (this.firstButtonValue > 1 || this.activeButton > 1) {
                this.appearPreviousButton = true;
            } else {
                this.appearPreviousButton = false;
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
                this.appearSecondButton = true;
                if (this.allPubliLength > 20) {
                    this.appearThirdButton = true;
                    if (this.allPubliLength > 30) {
                        this.appearSearchButton = true;
                    } else {
                        this.appearSearchButton = false;
                    }
                } else {
                    this.appearThirdButton = false;
                }
            } else {
                this.appearSecondButton = false;
                this.appearThirdButton = false;
            }

            this.testAppearNextButton();
            this.testAppearPreviousButton();
            
        },
        firstButtonValue() {
            this.testAppearNextButton();
            this.testAppearPreviousButton();
        },
        activeButton() {
            this.testAppearNextButton();
            this.testAppearPreviousButton();
        }
    },
    /*beforeMount() {
        if (this.secondButtonValue > 1 && this.appearSecondButton == true) {
            this.appearNextButton = true;
        } else {
            this.appearNextButton = false;
        }
    }*/
}
</script>