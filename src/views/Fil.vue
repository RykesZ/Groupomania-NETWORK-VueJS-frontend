<template>
    <Header :active="active" @emit-reload-main-thread="reloadMainThread"/>
    <FilContent ref="filContent" @emit-go-to-create-publi="goToCreatePubli" @emit-redirect-modify-publi="redirectModifyPubli" @emit-new-all-publi-length="setNewAllPubliLength" :key="reloadFilContentKey" />
    <Pagination @emit-first-page-value="goToPage" @emit-previous-page-value="goToPage" @emit-first-button-value="goToPage" @emit-second-button-value="goToPage" @emit-third-button-value="goToPage" @emit-search-page-value="goToPage" @emit-next-page-value="goToPage" @emit-last-page-value="goToPage" :firstButtonValue="firstButtonValue" :secondButtonValue="secondButtonValue" :thirdButtonValue="thirdButtonValue" :allPubliLength="allPubliLength"/>
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
        reloadMainThread() {
            this.reloadFilContentKey += 1;
        },
        redirectProfile() {
            this.$router.push({ name: 'Profil' });
        },
        redirectHome() {
            this.$router.push({ name: 'Home' });
        },
        goToCreatePubli() {
            this.$router.push({ name: 'CreatePublication' });
        },
        redirectPubliDetails() {
            this.$router.push({ name: 'PublicationDetails' });
        },
        redirectModifyPubli() {
            this.$router.push({ name: 'ModifyPublication' });
        },
        goToPage(pageNumber) {
            console.log('click');
            if (pageNumber) {
                if (pageNumber > Math.ceil(this.allPubliLength / 10)) {
                    pageNumber = Math.ceil(this.allPubliLength / 10);
                }
                this.$refs.filContent.updateFilContent(pageNumber);
                if (pageNumber == 1) {
                    this.firstButtonValue = pageNumber;
                    this.secondButtonValue = pageNumber + 1;
                    this.thirdButtonValue = pageNumber + 2;
                } else if (pageNumber > 1 && pageNumber < Math.ceil(this.allPubliLength / 10)) {
                    this.firstButtonValue = pageNumber - 1;
                    this.secondButtonValue = pageNumber;
                    this.thirdButtonValue = pageNumber + 1;
                } else if (pageNumber == 'max' && this.allPubliLength > 20) {
                        this.thirdButtonValue = Math.ceil(this.allPubliLength / 10);
                        this.secondButtonValue = this.thirdButtonValue - 1;
                        this.firstButtonValue = this.secondButtonValue - 1;
                } else if (pageNumber > 1 && pageNumber == Math.ceil(this.allPubliLength / 10)) {
                    this.firstButtonValue = pageNumber - 2;
                    this.secondButtonValue = pageNumber - 1;
                    this.thirdButtonValue = pageNumber;
                }
            } else {
                return 1;
            }
            
        },
        setNewAllPubliLength(newLength) {
            this.allPubliLength = newLength;
        }
    }
}
</script>