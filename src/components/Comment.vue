<template>
    <div class="commentContainer">
        <ProfilePicture :filename="imageUrl"/>
        <div class="commentFrame">
            <div class="infoPubli">
                <p class="identity">{{ prenom }} {{ nom }}</p>
                <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
                <p class="datetime" v-if="datePublication != dateModification && heurePublication != heureModification">Modifié le {{ dateModification }} à {{ heureModification }}</p>
            </div>
            <p class="commentText">{{ commentText }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
export default {
    name: 'Comment',
    props: {
        commentText: String,
        prenom: {type: String, default: "Elle"},
        nom: {type: String, default: "Hughes"},
        fullDatePublication: {type: Date},
        fullDateModification: {type: Date},
        imageUrl: {type: String}
    },
    components: {
        ProfilePicture
    },
    computed: {
        datePublication() {
            const date = this.fullDatePublication.split(' ')[0];
            let YMD = date.split('-');
            switch (YMD[1]) {
                case '01':
                    YMD[1] = "Janvier";
                    break;
                case '02':
                    YMD[1] = "Février";
                    break;
                case '03':
                    YMD[1] = "Mars";
                    break;
                case '04':
                    YMD[1] = "Avril";
                    break;
                case '05':
                    YMD[1] = "Mai";
                    break;
                case '06':
                    YMD[1] = "Juin";
                    break;
                case '07':
                    YMD[1] = "Juillet";
                    break;
                case '08':
                    YMD[1] = "Août";
                    break;
                case '09':
                    YMD[1] = "Septembre";
                    break;
                case '10':
                    YMD[1] = "Octobre";
                    break;
                case '11':
                    YMD[1] = "Novembre";
                    break;
                case '12':
                    YMD[1] = "Décembre";
                    break;
            }
            let DMY = YMD.reverse();
            return DMY.join(' ');
        },
        heurePublication() {
            return this.fullDatePublication.split(' ')[1];
        },
        dateModification() {
            const date = this.fullDateModification.split(' ')[0];
            let YMD = date.split('-');
            switch (YMD[1]) {
                case '01':
                    YMD[1] = "Janvier";
                    break;
                case '02':
                    YMD[1] = "Février";
                    break;
                case '03':
                    YMD[1] = "Mars";
                    break;
                case '04':
                    YMD[1] = "Avril";
                    break;
                case '05':
                    YMD[1] = "Mai";
                    break;
                case '06':
                    YMD[1] = "Juin";
                    break;
                case '07':
                    YMD[1] = "Juillet";
                    break;
                case '08':
                    YMD[1] = "Août";
                    break;
                case '09':
                    YMD[1] = "Septembre";
                    break;
                case '10':
                    YMD[1] = "Octobre";
                    break;
                case '11':
                    YMD[1] = "Novembre";
                    break;
                case '12':
                    YMD[1] = "Décembre";
                    break;
            }
            let DMY = YMD.reverse();
            return DMY.join(' ');
        },
        heureModification() {
            return this.fullDateModification.split(' ')[1];
        },
    }
}
</script>