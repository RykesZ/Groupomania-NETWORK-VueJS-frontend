module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/styles/sass/utils/_variables.scss";
                `
            }
        }
    }
}