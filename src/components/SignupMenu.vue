<template>
    <div class="panelOverlay">
        <button class="exitCross" @click="closePopUp">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <ChampForm v-for="champ in info" :key="champ" :type="champ.type" :name="champ.name" :id="champ.id" :placeholder="champ.placeholder" :required="champ.required"/>
        <p>Date de naissance :</p>
        <div class="dateNaissance">
            <input type="date" id="dateNaissance" name="dateNaissance" :value="currentDate" min="1901-01-01" :max="currentDate">
        </div>
        <p>Genre :</p>
        <div class="genre">
            <div class="optionGenre">
                <label for="femme">Femme</label>
                <input type="radio" name="genre" id="femme" value="F" required>
            </div>
            <div class="optionGenre">
                <label for="homme">Homme</label>
                <input type="radio" name="genre" id="homme" value="H" required>
            </div>
        </div>
        <button type="submit" class="signup">Je m'inscris !</button>
    </div>
</template>

<script>
import ChampForm from "./ChampForm.vue"
export default {
    name: 'SignupMenu',
    methods: {
        closePopUp() {
            this.$emit('close-pop-up')
        }
    },
    data() {
        return {
            info: [
                {type: "text", name: "prenom", id: "prenom", placeholder: "Prénom", required: true},
                {type: "text", name: "nom", id: "nom", placeholder: "Nom", required: true},
                {type: "email", name: "email", id: "emailSignup", placeholder: "Adresse e-mail", required: true},
                {type: "password", name: "password", id: "passwordSignup", placeholder: "Mot de passe", required: true},
                {type: "password", name: "passwordVerif", id: "passwordSignupVerif", placeholder: "Ré-entrez le mot de passe", required: true}
            ]
        }
    },
    components: {
        ChampForm
    },
    computed: {
        currentDate() {
            return new Date().getDate()
        }
    }
}
</script>

<style lang="scss">
.panelOverlay {
    background: #9BBBCC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 280px;
    height: 543px;
    position: relative;
    padding: 10px;
    padding-top: 30px;
    p {
        margin: 0px;
        margin-left: 10px;
        text-align: left;
    }
    .dateNaissance {
        display: flex;
        #dateNaissance {
            padding: 10px;
            margin: 10px;
            border: 1px solid rgba(122, 122, 122, 0.5);
            background-color: #FFE8E0;
            border-radius: 10px;
            &:focus {
            outline: none;
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
    .genre {
        display: flex;
        text-align: left;
        .optionGenre {
            padding: 10px;
            margin: 10px;
            border: 1px solid rgba(122, 122, 122, 0.5);
            background-color: #FFE8E0;
            border-radius: 10px;
            font-size: 0.875em;
            width: 110px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            input {
                width: auto;
                line-height: 0px;
                margin: 0;
                &:hover {
                    cursor: pointer;
                }
            }
            label {
                display: inline-block;
                padding: 1em;
                &:hover {
                    cursor: pointer;
                }
            }
    }
    }
}
.exitCross {
    position: absolute;
    right: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
        cursor: pointer;
    }
}
button {
    background-color: $blueColor;
    &.signup {
        margin-top: 10px;
        width: 200px;
        height: 50px;
        &:hover {
        background-color: darken($blueColor, 10%);
        cursor: pointer;
    }
    }
}
</style>