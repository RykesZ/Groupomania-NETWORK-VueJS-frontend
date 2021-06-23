<template>
    <Header :active="active" @emit-reload-main-thread="reloadMainThread"/>
    <FilContent ref="filContent" @emit-go-to-create-publi="goToCreatePubli" @emit-redirect-modify-publi="redirectModifyPubli" @emit-new-all-publi-length="setNewAllPubliLength" :key="reloadFilContentKey" />
    <Pagination ref="pagination" @emit-first-page-value="goToPage" @emit-previous-page-value="goToPage" @emit-first-button-value="goToPage" @emit-second-button-value="goToPage" @emit-third-button-value="goToPage" @emit-search-page-value="goToPage" @emit-next-page-value="goToPage" @emit-last-page-value="goToPage" @emit-scroll-to-top="scrollToTop" :firstButtonValue="firstButtonValue" :secondButtonValue="secondButtonValue" :thirdButtonValue="thirdButtonValue" :allPubliLength="allPubliLength"/>
</template>

<script>
import Header from "@/components/Header.vue"
import FilContent from "@/components/FilContent.vue"
import Pagination from "@/components/Frames/Pagination.vue"
export default {
    name: 'Fil',
    components: {
        Header,
        FilContent,
        Pagination
    },
    data() {
        return {
            reloadFilContentKey: 0,
            firstButtonValue: 1,
            secondButtonValue: 2,
            thirdButtonValue: 3,
            allPubliLength: null
        }
    },
    computed: {
        active() {
            return "Thread"
        }
    },
    methods: {
        // Retourne à la page 1
        reloadMainThread() {
            //this.reloadFilContentKey += 1;
            this.goToPage(1);
            this.$refs.pagination.setActiveButton(1);
            this.scrollToTop();
        },
        // Envoie vers la page de profil utilisateur
        redirectProfile() {
            this.$router.push({ name: 'Profil' });
        },
        // Déconnecte l'utilisateur
        redirectHome() {
            this.$router.push({ name: 'Home' });
        },
        // Envoie vers la page de création de publication
        goToCreatePubli() {
            this.$router.push({ name: 'CreatePublication' });
        },
        // Envoie vers la page contenant uniquement la publication visée
        redirectPubliDetails() {
            this.$router.push({ name: 'PublicationDetails' });
        },
        // Envoie vers la page de modification de publication
        redirectModifyPubli() {
            this.$router.push({ name: 'ModifyPublication' });
        },
        // Charge la page du fil de publications, indiquée par son numéro
        goToPage(pageNumber) {
            //console.log('click');
            if (pageNumber) {
                if (pageNumber > Math.ceil(this.allPubliLength / 10)) {
                    pageNumber = Math.ceil(this.allPubliLength / 10);
                }
                this.$refs.filContent.updateFilContent(pageNumber);

                this.updatePaginationButtonsValue(pageNumber);
                
            } else {
                this.$refs.filContent.updateFilContent(1);
                this.updatePaginationButtonsValue(pageNumber);
            }
            
        },
        // Change la numérotation de la pagination en fonction de la page actuelle
        updatePaginationButtonsValue(pageNumber) {
            if (pageNumber == 1) {
                //console.log("1ere possibilité");
                this.firstButtonValue = Number(pageNumber);
                this.secondButtonValue = Number(pageNumber) + 1;
                this.thirdButtonValue = Number(pageNumber) + 2;
            } else if (pageNumber > 1 && pageNumber < Math.ceil(this.allPubliLength / 10) /*&& !(pageNumber == 2 && this.secondButtonValue == 2)*/) {
                //console.log("2eme possibilité");
                this.firstButtonValue = Number(pageNumber) - 1;
                this.secondButtonValue = Number(pageNumber);
                this.thirdButtonValue = Number(pageNumber) + 1;
            } else if (pageNumber == 'max' && this.allPubliLength > 20) {
                //console.log("3eme possibilité");
                this.thirdButtonValue = Math.ceil(this.allPubliLength / 10);
                this.secondButtonValue = this.thirdButtonValue - 1;
                this.firstButtonValue = this.secondButtonValue - 1;
            } else if (pageNumber > 1 && pageNumber == Math.ceil(this.allPubliLength / 10) && this.allPubliLength > 20) {
                //console.log("4eme possibilité");
                this.firstButtonValue = Number(pageNumber) - 2;
                this.secondButtonValue = Number(pageNumber) - 1;
                this.thirdButtonValue = Number(pageNumber);
            }
        },
        setNewAllPubliLength(newLength) {
            this.allPubliLength = newLength;
        },
        scrollToTop() {
            window.scrollTo(0,0);
        }
    },
    beforeMount() {
        this.scrollToTop();
    }
}
</script>