<template>
<DeletePubli v-if="deletePopUp" @emit-toggle-delete="toggleDelete" @emit-delete-publi="deletePubli"/>
<div class="publication slideRight">
    <div class="headLine">
        <ProfilePicture :filename="imageUrl"/>
        <div class="infoPubli">
            <p class="identity">{{ prenom }} {{ nom }}<span v-if="moderator" class="material-icons moderatorBadge">stars</span></p>
            <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
            <p class="datetime" v-if="datePublication != dateModification || heurePublication != heureModification">Modifié le {{ dateModification }} à {{ heureModification }}</p>
        </div>

        
        
        <button class="publicationOptionsButtonMenu invisibleButton" v-if="userId == autorId || moderatorAuth == true" @click="showPubliOptions">
            <span class="material-icons md-18">more_horiz</span>
            <PublicationOptions v-show="publiOptionsSwitch" @show-publi-options="showPubliOptions" @emit-toggle-delete="toggleDelete" @emit-redirect-modify-publi="redirectModifyPubli"/>
            
        </button>
    </div>

    <p class="textPubli" v-if="textPubli != null && textPubli != undefined && textPubli != 'null'">{{ textPubli }}</p>
    

    <div class="media" v-if="media != null && media != '' && media != undefined && mediaType == 'image'"><img :src="`${media}`" alt="Image de Publication"></div>
    
    <iframe :src="videoLink" frameborder="0" id="videoContent" title="Vidéo de la publication" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="videoLink != null && mediaType == null"></iframe>

    <div class="media" v-if="imageLink != null && videoLink == null && mediaType == null" id="imageContent">
        <img :src="imageLink" alt="Image du lien de publication">
    </div>

    <div class="numberSocials">
        <span ref="thumbUp" class="material-icons md-18">thumb_up</span>
        <span class="numberOfLikes">{{ numberOfLikes }}</span>
        <button class="numberOfComms invisibleButton" @click="showPubliDetails" v-if="commentsAmount > 0 && commentSwitch == false"><span>voir les {{ commentsAmount }} commentaires</span></button>
        <span class="numberOfComms notAButton" v-else-if="commentsAmount <= 0">Aucun commentaire</span>
        <span class="numberOfComms notAButton" v-if="commentsAmount > 0 && commentSwitch == true">{{ commentsAmount }} commentaires</span>
        <!--<span class="numberOfShares">{{ numberOfShares }} partages </span>-->
    </div>

    <div class="actionSocials">
        <LikeButton @emit-like-publi="likePublication" class="socialsPubliButton"/>
        <CommentButton class="socialsPubliButton" @click="showPubliDetails"/>
        <!--<ShareButton class="socialsPubliButton"/>-->
    </div>

    <div v-if="commentSwitch" class="commentsBloc">
        <Comment v-for="comment in commListe" :key="comment" :prenom="comment.firstname" :nom="comment.lastname" :fullDatePublication="comment.date_insertion" :fullDateModification="comment.date_modification" :commentText="comment.text" :imageUrl="comment.imageUrl" :autorId="comment.autorId" :commId="comment.commId" :moderator="comment.moderator" :moderatorAuth="moderatorAuth" @emit-reload-comments="reloadComments"/>
        <CommentBar :filename="imageUrlUser" :pubId="pubId" @emit-reload-comments="reloadComments"/>
    </div>
</div>

</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import LikeButton from "@/components/Buttons/LikeButton.vue"
import CommentButton from "@/components/Buttons/CommentButton.vue"
//import ShareButton from "@/components/Buttons/ShareButton.vue"
import Comment from "@/components/Comment.vue"
import CommentBar from "@/components/Frames/CommentBar.vue"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
import PublicationOptions from "@/components/Frames/PublicationOptions.vue"
import DeletePubli from "@/components/Frames/DeletePubli.vue"
import ApiCommentRoutes from "@/services/ApiCommentRoutes"
export default {
    name: 'Publication',
    emits: ['emit-redirect-modify-publi', 'emit-redirect-publi-details'],
    data() {
        return {
            mediaPresent: false,
            numberOfLikes: 0,
            likersList: [],
            publiOptionsSwitch: false,
            deletePopUp: false,
            commListe: null,
            commentsAmount: 0,
            commentSwitch: false,
            videoLink: null,
            imageLink: null,
        }
    },
    props: {
        prenom: {type: String, default: "Prénom"},
        nom: {type: String, default: "Nom"},
        fullDatePublication: {type: Date},
        fullDateModification: {type: Date},
        textPubli: {type: String, default: "Lorem ipsum "},
        media: {type: String},
        numberOfShares: {type: Number, default: 0},
        imageUrl: {type: String},
        pubId: {type: Number},
        usersLiked: {type: String, default: ''},
        likes: {type: Number, default: 0},
        numberOfComms: {type: Number, default: 0},
        autorId: {type: Number},
        imageUrlUser: {type: String},
        moderator: {type: Boolean, default: false},
        moderatorAuth: {type: Boolean, default: false}
    },
    methods: {
        async likePublication() {
            
            const likeValue = () => {
                console.log(this.likersList);
                console.log(this.userId);
                if (this.likersList.includes(this.userId.toString())) {
                    return 0;
                } else {
                    return 1;
                }
            }
            let like = likeValue();
            const data = {
                pubId: this.pubId,
                like: like
            };
            const authPayload = { userId: this.userId, token: this.token };
            console.log({"likers": this.usersLiked});
            const likeConfirmation = await ApiPubliRoutes.likePublication(data, authPayload);
            if (likeConfirmation.data.message == "publication liked") {
                this.numberOfLikes += 1;
                this.likersList.push(this.userId.toString());
                console.log({"likersList": this.likersList});
            } else if (likeConfirmation.data.message == "publication unliked") {
                console.log({"likersListbefore-1": this.likersList});
                this.numberOfLikes -= 1;
                this.likersList.splice(this.likersList.indexOf(this.userId.toString(), 1));
                console.log({"likersList": this.likersList});
            }
            this.updateLikersList();
        },
        showPubliOptions() {
            this.publiOptionsSwitch = !this.publiOptionsSwitch
        },
        toggleDelete() {
            this.deletePopUp = !this.deletePopUp
            this.publiOptionsSwitch = !this.publiOptionsSwitch
        },
        async deletePubli() {
            const data = {
                pubId: this.pubId
            }
            const authPayload = {
                userId: this.userId,
                token: this.token
            }
            const deleteConfirmation = await ApiPubliRoutes.deletePublication(data, authPayload);
            console.log(deleteConfirmation.data)
            if (deleteConfirmation.data.message == "publication deleted") {
                window.location.reload();
            } else {
                console.log(deleteConfirmation.message);
            }
        },
        async reloadComments(payload) {
            if (payload) {
                this.commentsAmount += payload;
            }

            if (this.commentsAmount > 0) {
                const authPayload = { userId: this.userId, token: this.token };
                const data = { pubId: this.pubId };
                const allComms = await ApiCommentRoutes.getAllComments(data, authPayload);
                this.commListe = await allComms.data.response;
                console.log(this.commListe);
            } else {
                this.commListe = null;
            }

            
        },
        redirectModifyPubli() {
            this.publiOptionsSwitch = !this.publiOptionsSwitch
            this.$store.dispatch('setCurrentPubId', this.pubId);
            this.$emit('emit-redirect-modify-publi');
        },
        showPubliDetails() {
            this.commentSwitch = true;
        },
        urlRegex() {
            if (this.textPubli.match(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/)) {
                this.videoLink = this.textPubli.match(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/);
                console.log({ "videoLink:": this.videoLink });
            }
        },
        updateLikersList() {
            if (this.likersList != null && this.likersList.includes(this.userId.toString())) {
                this.$refs.thumbUp.classList.add('thumbUpActive');
            } else {
                this.$refs.thumbUp.classList.remove('thumbUpActive');
            }
        }
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
        mediaType() {
            const type = this.media.split('.')[1];
            if (type == 'jpg' || type == 'png' || type == 'gif') {
                return 'image';
            } else if (type == 'mp4' || type == 'm4v') {
                return 'video'
            } else {
                return null;
            }
        },
        userId() {
            let userId = JSON.parse(localStorage.getItem('userId'));
            return userId;
        },
        token() {
            let token = JSON.parse(localStorage.getItem('token'));
            return token;
        }
    },
    components: {
        ProfilePicture,
        LikeButton,
        CommentButton,
        //ShareButton,
        Comment,
        CommentBar,
        PublicationOptions,
        DeletePubli
    },
    async beforeMount() {
        // Permet d'intégrer une vidéo youtube à la publication à partir d'un lien dans le texte
        if (this.textPubli.match(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/)) {
                this.videoLink = "https://www.youtube.com/embed/" + this.textPubli.match(/(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/)[1];
        }
        // Permet d'intégrer une image hébergée sur un autre site à la publication à partir d'un lien dans le texte
        if (this.textPubli.match(/(?:https?:\/\/)(.*?)\/(.+?)(?:\/|\?|#|$|\n)\w*.jpg/) || this.textPubli.match(/(?:https?:\/\/)(.*?)\/(.+?)(?:\/|\?|#|$|\n)\w*.png/) || this.textPubli.match(/(?:https?:\/\/)(.*?)\/(.+?)(?:\/|\?|#|$|\n)\w*.gif/)) {
            this.imageLink = this.textPubli.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/)[0];
            console.log({"imagelink": this.imageLink});
        }


        if (this.media != null || this.media != '' || this.media != undefined) {
            this.mediaPresent = true;
        }
        this.numberOfLikes = this.likes;
        console.log(this.usersLiked);
        if (this.usersLiked != null) {
            this.likersList = this.usersLiked.split(',');
            if (this.likersList[0] == '') {
                this.likersList.shift();
            }
        }
        console.log(this.autorId)

        this.commentsAmount = Number(this.numberOfComms);

        if (this.commentsAmount > 0) {
            const authPayload = { userId: this.userId, token: this.token };
            const data = { pubId: this.pubId };
            const allComms = await ApiCommentRoutes.getAllComments(data, authPayload);
            this.commListe = await allComms.data.response;
            console.log(this.commListe);
        }
    },
    mounted() {
        if (this.likersList != null && this.likersList.includes(this.userId.toString())) {
                this.$refs.thumbUp.classList.add('thumbUpActive');
            } else {
                this.$refs.thumbUp.classList.remove('thumbUpActive');
            }
    },
    watch: {
    }
}
</script>