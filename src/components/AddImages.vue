<template>
    <NavBar />
    <p v-bind="this.message" hidden="{this.message}" class="alert alert-info" >{this.message}</p>
    <div class="container text-center  mt-5 mb-5">
        <span>
            <h5 style="float:left">Enter a Wikimedia Commons Category </h5>
            <h5 style="">Select a type</h5>
        </span>
        <span>
            <div class="bb-4 category-text">
                <input class="" v-model="this.category" type="text" placeholder="Category:African Foods" />
                <select v-model="this.selected_category_type" class="cat-type">
                <option v-for="option in this.category_types_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                    </option>
                </select>
            </div>
        </span>
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
    const base_url = 'https://comelab-server.toolforge.org/';
    // const base_url = 'http://localhost:5000/'

    export default{
        name: 'AddImage',
        components: {
            NavBar
        },
        data(){
            return{
                category: null,
                message: null,
                selected_category_type: null,
                category_types_options: [
                    { id: 1, name: 'gender' },
                    { id: 2, name: 'food' },
                    { id: 3, name: 'culture' }
                ]
            }
        },
        methods: {
            saveImages(){
                axios.post(base_url + '/categories/add',{
                    'category': this.category,
                    'type': this.selected_category_type
                })
                .then(
                    function(response){
                        if (response.status == 200 ) {
                            this.clearAllData();
                            alert('Category has been added');
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
            },
            initialState(){
                return {
                    category: null,
                    message: null,
                    selected_category_type: null
                }
            },
            clearAllData() {
                Object.assign(this.$data.gender_data, this.initialState());
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
    float: left;
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
    position: relative;
    right: 3rem;
}
</style>