<template>
    <Header/>
    <PublicationBar/>
    <Publication/>
</template>

<script>
import Header from "@/components/Header.vue"
import PublicationBar from "@/components/Frames/PublicationBar.vue"
import Publication from "@/components/Frames/Publication.vue"
export default {
    name: 'Fil',
    components: {
        Header,
        PublicationBar,
        Publication
    }
}
</script>