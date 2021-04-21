<template>
    <div class="panelsContainer">
        <div class="logo" v-show="!overlay">
            <img src="../assets/icons/Logo.png" alt="Logo Groupomania">
        </div>
        <div class="panel" v-show="!overlay">
            <input type="email" name="email" id="emailLogin" placeholder="Adresse e-mail" required><br>
            <input type="password" name="password" id="password" placeholder="Mot de passe" required><br>
            <button type="submit" class="login">Connexion</button><br>
            <a href="#">Mot de passe oublié ?</a><br>
            <button class="signin" @click="overlayToggle()">Créer un compte</button>
        </div>
        <div class="overlay" v-show="overlay">
            <SigninMenu @close-pop-up="overlayToggle()"/>
        </div>
    </div>
</template>

<script>
import SigninMenu from "./SigninMenu.vue"
export default {
    name: 'LoginMenu',
    data() {
        return {
            overlay: false
        }
    },
    methods: {
        overlayToggle() {
            this.overlay = !this.overlay
        }
    },
    props: {
    },
    components: {
        SigninMenu
    }
}
</script>

<style lang="scss">
input {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid rgba(122, 122, 122, 0.5);
    background-color: #FFE8E0;
    border-radius: 10px;
    width: 240px;
    height: 20px;
    font-size: 0.875em;
    &:focus {
        outline: none;
    }
}
.panelsContainer {
    .panel {
        background: #9BBBCC;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        width: 280px;
        height: 328px;
        padding: 10px;
        justify-content: center;
    }
}

button {
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    color: #FFFFFF;
    font-size: 1.25em;
    &.login {
        background-color: $groupomaniaColor;
        margin: 10px 0;
        width: 240px;
        height: 38px;
        line-height: 0px;
        &:hover {
            background-color: darken($groupomaniaColor, 10%);
        }
    }
    &.signin {
        background-color: $blueColor;
        margin-top: 30px;
        width: 200px;
        height: 70px;
        &:hover {
            background-color: darken($blueColor, 10%);
        }
    }
    &:focus {
        outline: none;
    }
    &:hover {
        cursor: pointer;
    }
}
a {
    text-decoration: none;
    color: #360900;
    &:hover {
        text-decoration: underline;
    }
}
.logo {
 justify-content: center;
}
</style>