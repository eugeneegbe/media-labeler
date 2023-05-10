<template>
    <NavBar ref="navBar"/>
    <div class="container text-center  mt-5 mb-5">
        <h4>About the Commons labeler tool</h4>
        <hr>
        <p>This tool was developed with funding from Art+Feminism to facilitate an annotation experiment aimed at improving the representation and diversity of images on <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a>.
            The researcher for this project is <a href="#">Mohamed Sadat Abdulai</a>, and the tool was built by <a href="https://meta.wikimedia.org/wiki/User:Eugene233">Eugene</a>.
            We would like to acknowledge all the participants who contributed to this project.</p>
    </div>
</template>

<script>
    import NavBar from './NavBar';

    export default{
        name: 'AboutPage',
        components: {
            NavBar
        },
        data(){
            return{}
        },
        methods: {
        },
        mounted(){}
    }
</script>

<style>

@media only screen and (max-width: 600px) {

}
</style>