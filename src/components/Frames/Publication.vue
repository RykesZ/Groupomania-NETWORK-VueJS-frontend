<template>
<div class="publication">
    <div class="headLine">
        <ProfilePicture :filename="imageUrl"/>
        <div class="infoPubli">
            <p class="identity">{{ prenom }} {{ nom }}</p>
            <p class="datetime">Publié le {{ datePublication }} à {{ heurePublication }}</p>
        </div>

        <PublicationOptions v-show="publiOptionsSwitch" @show-publi-options="showPubliOptions" @emit-toggle-delete="toggleDelete"/>
        <DeletePubli v-if="deletePopUp" @emit-toggle-delete="toggleDelete" @emit-delete-publi="deletePubli"/>
        
        <button class="publicationOptions invisibleButton" v-if="userId == autorId" @click="showPubliOptions"><span class="material-icons md-18">more_horiz</span></button>
    </div>

    

    <p class="textPubli" v-if="textPubli != null && textPubli != undefined && textPubli != 'null'">{{ textPubli }}</p>
    <div class="media" v-if="media != null && media != '' && media != undefined && mediaType == 'image'"><img :src="`${media}`" alt="Image de Publication"></div>
    <div class="media" v-if="media != null && media != '' && media != undefined && mediaType == 'video'"><video controls autoplay muted> <source :src="`${media}`" type="video/mp4">Sorry, your browser doesn't support embedded videos.</video></div>
    <div class="numberSocials">
        <span class="material-icons md-18">thumb_up</span>
        <span class="numberOfLikes">{{ numberOfLikes }}</span>
        <button class="numberOfComms invisibleButton" @click="showComments" v-if="numberOfComms > 0"><span>voir les {{ numberOfComms }} commentaires</span></button>
        <span class="numberOfComms notAButton" v-else>Aucun commentaire</span>
        <span class="numberOfShares">{{ numberOfShares }} partages </span>
    </div>
    <div class="actionSocials">
        <LikeButton @emit-like-publi="likePublication"/>
        <CommentButton/>
        <ShareButton/>
    </div>
    <div v-show="commentSwitch" class="commentsBloc">
        <Comment v-for="commentator in commentators" :key="commentator" :prenom="commentator.prenom" :nom="commentator.nom" :datePublication="commentator.datePublication" :heurePublication="commentator.heurePublication" :commentText="commentator.commentText"/>
        <CommentBar/>
    </div>
</div>

</template>

<script>
import ProfilePicture from "@/components/icons/ProfilePicture.vue"
import LikeButton from "@/components/Buttons/LikeButton.vue"
import CommentButton from "@/components/Buttons/CommentButton.vue"
import ShareButton from "@/components/Buttons/ShareButton.vue"
import Comment from "@/components/Comment.vue"
import CommentBar from "@/components/Frames/CommentBar.vue"
import ApiPubliRoutes from "@/services/ApiPubliRoutes"
import PublicationOptions from "@/components/Frames/PublicationOptions.vue"
import DeletePubli from "@/components/Frames/DeletePubli.vue"
export default {
    name: 'Publication',
    data() {
        return {
            commentSwitch: false,
            commentators: [
                {prenom: "Prénom", nom: "Nom", datePublication: "26/04/2021", heurePublication: "09:42", commentText: "Ipsum"},
            ],
            mediaPresent: false,
            numberOfLikes: 0,
            likersList: [],
            publiOptionsSwitch: false,
            deletePopUp: false,
            noScroll: false
        }
    },
    props: {
        prenom: {type: String, default: "Prénom"},
        nom: {type: String, default: "Nom"},
        fullDatePublication: {type: Date},
        textPubli: {type: String, default: "Lorem ipsum "},
        media: {type: String},
        numberOfShares: {type: Number, default: 0},
        imageUrl: {type: String},
        pubId: {type: Number},
        usersLiked: {type: String, default: ''},
        likes: {type: Number, default: 0},
        comments: {type: Array},
        autorId: {type: Number}
    },
    methods: {
        showComments() {
            this.commentSwitch = !this.commentSwitch
        },
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
        },
        showPubliOptions() {
            this.publiOptionsSwitch = !this.publiOptionsSwitch
            this.noScroll = !this.noScroll
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
        mediaType() {
            const type = this.media.split('.')[1];
            if (type == 'jpg' || type == 'png') {
                return 'image';
            } else if (type == 'mp4' || type == 'm4v') {
                return 'video'
            } else {
                return null;
            }
        },
        numberOfComms() {
            try {
                return this.comments.length;
            } catch {
                return 0;
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
        ShareButton,
        Comment,
        CommentBar,
        PublicationOptions,
        DeletePubli
    },
    beforeMount() {
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
    },
    watch: {
        noScroll() {
            document.querySelector('body').style.overflow = this.noScroll ? 'hidden' : 'scroll'
        },
        
    }
}
</script>