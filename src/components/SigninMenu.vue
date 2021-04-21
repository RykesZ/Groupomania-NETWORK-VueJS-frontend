<template>
    <div class="panelOverlay">
        <button class="exitCross" @click="closePopUp">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <input type="text" name="prenom" id="prenom" placeholder="Prénom" required><br>
        <input type="text" name="nom" id="nom" placeholder="Nom" required><br>
        <input type="email" name="email" id="emailSignin" placeholder="Adresse e-mail" required><br>
        <input type="password" name="password" id="passwordSignin" placeholder="Mot de passe" required><br>
        <input type="password" name="passwordVerif" id="passwordSigninVerif" placeholder="Ré-entrez le mot de passe" required>
        <p>Date de naissance :</p>
        <div class="dateNaissance">
            <select name="jourNaissance" id="jourNaissance" aria-label="Jour" title="Jour" required>
                <option disabled value="0">Jour</option>
                <option value="1">1</option>
            </select>
            <select name="moisNaissance" id="moisNaissance" aria-label="Mois" title="Mois" required>
                <option disabled value="0">Mois</option>
                <option value="1">Janvier</option>
            </select>
            <select name="annéeNaissance" id="anneeNaissance" aria-label="Année" title="Année" required>
                <option disabled value="0">Année</option>
                <option value="1">1901</option>
            </select>
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
export default {
    name: 'SigninMenu',
    methods: {
        closePopUp() {
            this.$emit('close-pop-up')
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
        select {
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
            &#jourNaissance {
                width: 50px;
            }
            &#moisNaissance {
                width: 100px;
            }
            &#anneeNaisance {
                width: 100px;
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