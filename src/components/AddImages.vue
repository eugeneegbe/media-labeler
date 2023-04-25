<template>
    <NavBar />
    <p v-bind="this.message" hidden="{this.message}" class="alert alert-info" >{this.message}</p>
    <div class="container text-center  mt-5 mb-5">
        <h1 class="mb-4 ">Enter a Wikimedia Commons Category</h1>
        <div class="bb-4 category-text">
            <input class="" v-model="this.category" type="text" placeholder="Category:African Foods" />
        </div>
    </div>
    <div class="">  
        <span class="go-btn go">
            <button v-on:click="saveImages()" type="button" class="btn btn-lg btn-outline-dark mr-5">Save</button>
        </span>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import axios from 'axios';
    const base_url = 'http://127.0.0.1:5000';

    export default{
        name: 'AddImage',
        components: {
            NavBar
        },
        data(){
            return{
                category: null,
                message: null
            }
        },
        methods: {
            saveImages(){
                axios.post(base_url + '/categories/add', {'category': this.category})
                .then(
                    function(response){
                        if (response.status == 'success' ) {
                            this.$route.push({ name: 'HomePage' });
                        }
                    }
                ).catch(function(response){
                    if (response.response){
                        alert('Error\n\n' + response.response.data.message)
                    }else{
                        alert(response.message)
                    }
                });
            }
        },
        setMessage(message){
            this.message = message
        },
        mounted(){
        }
    }
</script>

<style>
.category-text input{
    width: 500px;
    line-height: 2rem;
}

.arrow{
    font-size:  40px;
    margin-top: 10px;
}
.next{
    float: left;
    font-size: 40px;
    margin-top: 300px;
}

.go:hover{
    border-bottom: 1px solid black;
    cursor: pointer;
}

.go-btn{
    margin: auto;
    display: inline-flex;
    
}

.go-btn p{
    margin-top: 0rem!important;
    margin-right: 10px!important;
}
.go{
    font-size: 30px;
}
</style>