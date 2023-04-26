<template>
    <NavBar />
    <p v-bind="this.message" hidden="{this.message}" class="alert alert-info" >{this.message}</p>
    <div class="container text-center  ">
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
                <span class="ml-3 go-btn go">
                    <button v-on:click="saveImages()" type="button" class="btn btn-lg btn-outline-dark mr-5">Save</button>
                </span>
            </div>
        </span>
    </div>
    <br>
    <div v-if="this.categories.length > 1" class="container text-center  mt-5">
        <h2>Below are the categories which have been added</h2>
        <br>
        <table id="productsTable" class="table table-bordered mt-4">
            <thead>
                <tr>
                    <td>No</td>
                    <td>Name</td>
                    <td>Type</td>
                    <span><p>Action</p></span>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{category.id}}</td>
                    <td>{{category.name}}</td>
                    <td>{{category.type}}</td>
                    <button class="btn" v-on:click="this.deleteCategory()">Delete</button>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import axios from 'axios';
    const base_url = 'https://comelab-server.toolforge.org';
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
                    { id: 2, name: 'culture' },
                    { id: 3, name: 'cloth' }
                ],
                categories: [{
                    id: '',
                    name: '',
                    type: ''
                }]
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
            setMessage(message){
                this.message = message
            },
            async fetchCategories(){
                    let response = await axios.get(base_url + '/categories');
                    if (response.status == 200) {
                        this.categories = response.data
                    } else {
                        this.$route.push({ name: 'HomePage' });
                        console.log('could not fetch categories')
                    }
                },
            deleteCategory(){

            }
        },
        mounted(){
            this.fetchCategories();
        }
    }
</script>

<style>
.category-text input{
    width: 500px;
    line-height: 2rem;
    float: left;
    margin-top: 0.5rem;
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
    margin-left: 4.5rem;
    display: inline-flex;
    
}

.go-btn p{
    margin-top: 0rem!important;
    margin-right: 10px!important;
}
.go{
    font-size: 4rem !important;
    position: relative;
}

</style>