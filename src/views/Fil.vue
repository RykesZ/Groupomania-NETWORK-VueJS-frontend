<template>
    <Header/>
    <FilContent/>
</template>

<script>
import Header from "@/components/Header.vue"
import FilContent from "@/components/FilContent.vue"
export default {
    name: 'Fil',
    components: {
        Header,
        FilContent
    }
}
</script>