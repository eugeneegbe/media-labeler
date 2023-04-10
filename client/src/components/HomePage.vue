<template>
    <NavBar />
    <div class="container text-center  mt-5 mb-5">
        <h1 class="mb-4 ">Hi, Welcome to the Commons Labeler Tool</h1>
        <h4 class="mb-4 ">Select track</h4>
        <div class="bb-4 select-track">
            <button v-on:click="selectGender()" type="button" class="btn btn-lg btn-outline-info mr-5">Gender</button>
            <button  v-on:click="selectCulture()" type="button" class="btn btn-lg btn-outline-primary">Food/Culture</button>
            <button v-on:click="selectCloth()" type="button" class="btn btn-lg btn-outline-dark mr-5">Cloth/Dress</button>
        </div>
    </div>
    <div v-if="this.track">
        <router-link :to="'/label/'+this.track" class="btn go">
        <span class="go-btn">
            <p class="mt-3">Next</p> 
            <font-awesome-icon class="arrow" icon="fa fa-chevron-right" />
        </span>
    </router-link>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    export default{
        name: 'HomePage',
        components: {
            NavBar
        },
        data(){
            return{
                track: null
            }
        },
        methods: {
            selectGender(){
                this.track = 'gender' 
            },
            selectCulture(){
                this.track = 'culture'
            },
            selectCloth(){
                this.track = 'cloth' 
            }
        },
        mounted(){
        }
    }
</script>

<style>
.select-track{
    display: inline-block;
    margin-top: 20px;
}
.select-track button{
    position: relative;
    float: left;
    font-size: 50px;
    margin: 20px;
}
.go{
    font-size: 30px;
}
.go:hover{
    border-bottom: 1px solid black;
}

.go-btn{
    margin: auto;
    display: inline-flex;
}

.go-btn p{
    margin-top: 0rem!important;
    margin-right: 10px!important;
}
</style>