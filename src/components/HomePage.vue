<template>
    <NavBar ref="navBar"/>
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
        <div class="category-select">
            <p class="">Select A Category</p>
            <select v-model="this.category" class="cat-type">
                <option v-for="option in this.category_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
        </div>
        <br/>
        <router-link v-if="this.category" :to="'/label/'+this.track+'/'+this.category + '/' + this.current_user" class="btn go">
        <span class="go-btn">
            <button class="btn btn-md btn-primary">Next</button>   
        </span>
    </router-link>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import axios from 'axios';

    const base_url = 'https://comelab-server.toolforge.org/';

    export default{
        name: 'HomePage',
        components: {
            NavBar
        },
        data(){
            return{
                track: null,
                category: null,
                category_options: [],
                current_user: 'Anonymous'
            }
        },
        methods: {
            selectGender(){
                this.track = 'gender'
                this.checkSelectedFields();
            },
            selectCulture(){
                this.track = 'culture';
                this.checkSelectedFields();

            },
            selectCloth(){
                this.track = 'cloth';
                this.checkSelectedFields();
            },
            async fetchCategories(track){
                let response = await axios.get(base_url + '/categories?type='+ track);
                console.log(response)
                if (response.status == 200) {
                    this.category_options = response.data
                } else {
                    console.log('could not get categories');
                }
            },
            checkSelectedFields(){
                if(this.track){
                   this.fetchCategories(this.track) 
                }else{
                    alert('select a track to proceed');
                }
            }
        },
        mounted(){
            if(this.$route.query.username){
                this.current_user = this.$route.query.username;
                this.$refs.navBar.username = this.current_user
            }
        }
    }
</script>

<style>
.select-track{
    display: inline-block;
    margin-top: 20px;
    height: 0.5rem;
}
.select-track button{
    position: relative;
    font-size: 30px;
}

.select-track .next{
    float: left;
    font-size: 50px;
    margin-top: 300px;
}
.go{
    font-size: 30px;
}
.go:hover{
    border-bottom: 1px solid black;
}

.select-track button{
    margin: 1.5rem;
}

.go-btn{
    margin: auto;
    display: inline-flex;
}

.go-btn p{
    margin-top: 0rem!important;
    margin-right: 10px!important;
}
.cat-type{
    height: 2.5rem;
    margin-left: 2rem;
    width: 30rem;
    background: transparent;
    border: 0.5px solid;
    border-block-end-style: double;
    border-style: revert-layer;
}

@media only screen and (max-width: 600px) {
    .select-track{
        display: inline-grid;
        margin-bottom: 13rem;
    }
    .select-track button{
        margin: 0.5rem;
    }
    .category-select{
        margin-top: 10px !important;
    }
    .cat-type{
        width: 20rem;
    }
}
</style>