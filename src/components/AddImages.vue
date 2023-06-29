<template>
    <NavBar />
    <p v-bind="this.message" hidden="{this.message}" class="alert alert-info" >{this.message}</p>
    <div class="container text-center">
        <span>
            <div class="type-select">
                    <h5>Select a type</h5>
                    <select v-model="this.selected_category_type" class="cat-type">
                    <option v-for="option in this.category_types_options" v-bind:value="option.name" v-bind:key="option.id">
                        {{ option.name }}
                        </option>
                    </select>
                </div>
            <div class="category-text">
                <div>
                    <h5>Enter a Wikimedia Commons categories</h5>
                    <textarea class="" v-model="this.categories_input" type="text" placeholder="Ex: Category:African Foods, Category:Asian Clothes" />
                </div>
            </div>
            <button v-on:click="saveImages()" type="button" class="btn btn-lg btn-outline-dark mr-5 save">Save</button>
        </span>
    </div>

    <div v-if="this.categories.length > 0" class="categories-table-display text-center">
        <h5 >Below are the categories which have been added</h5>
        <table id="productsTable" class="table table-bordered mt-4">
            <thead>
                <tr>
                    <td>No</td>
                    <td>Name</td>
                    <td>Type</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{category.id}}</td>
                    <td>{{category.name}}</td>
                    <td>{{category.type}}</td>
                    <td><button class="btn btn-md btn-danger" v-on:click="this.deleteCategory()">Delete</button></td>
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
                categories_input: null,
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
                    'categories': this.categories_input,
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
                        this.$flashMessage.show({
                        html: '<div style="padding: 20px;font-weight:">'+
                                '<h4 style="font-weight: bolder">Something Went Wrong!</h4> <hr>'+
                                '<p style="color: red; font-size:1.3rem">'+ response.response.data.message +'</p>'+
                            '</div>'
                        });
                    }else{
                        this.$flashMessage.show({
                        html: '<div style="padding: 20px;font-weight:">'+
                                '<h4 style="font-weight: bolder">Something Went Wrong!</h4> <hr>'+
                                '<p style="color: red; font-size:1.3rem">'+ response.message+'</p>'+
                            '</div>'
                    });
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
.category-text textarea{
    width: 40rem;
    line-height: 2rem;
}

.type-select{
    float: left;
}

.go:hover{
    border-bottom: 1px solid black;
    cursor: pointer;
}

.go-btn{
    margin-left: 3.5rem;
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
.container{
    margin-top: 2.5rem;
}

.save{
    float: left;
    margin-left: 2rem;
}

.categories-table-display{
    margin-top: 7rem;
}
@media only screen and (max-width: 600px) {
    h5{
        float: left;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    .category-text textarea{
        width: 23rem;
        float: left;
    }
    .cat-type{
        width: 23rem;
        margin-left: 0px;
    }
    .save{
        margin-left: 0px;
        margin-top: 2rem;
    }
    .categories-table-display{
    margin-top: 2rem;
    }
}
</style>