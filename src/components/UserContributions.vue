<template>
    <NavBar />
    <h2> All registered ontributions</h2>
    <hr>
    <br>

    <div class="container text-center  mt-5">
        <table id="productsTable" class="table table-bordered mt-4">
            <thead>
                <tr>
                    <td>No</td>
                    <td>User</td>
                    <td>Type</td>
                    <td>Filename</td>
                    <td>Date</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contribution in contributions" :key="contribution.id">
                    <td>{{contribution.id}}</td>
                    <td>{{contribution.username}}</td>
                    <td>{{contribution.type}}</td>
                    <td>{{contribution.filename}}</td>
                    <td>{{contribution.created_at}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import axios from 'axios';
    const base_url = 'https://comelab-server.toolforge.org';

    export default{
        name: 'AddImage',
        components: {
            NavBar
        },
        data(){
            return{
                contributions: [{
                    "accuracy": null,
                    "clarity": "",
                    "created_at": "",
                    "depict_accuracy": "",
                    "filename": "",
                    "id": 1,
                    "identity_type": "",
                    "region": null,
                    "region_alt": null,
                    "representation": null,
                    "subject_relevance": "",
                    "type": "",
                    "username": ""
                }]
            }
        },
        methods: {
            async fetchContributions(){
                    let response = await axios.get(base_url + '/contributions');
                    if (response.status == 200) {
                        this.contributions = response.data
                        console.log(response.data)
                    } else {
                        this.$route.push({ name: 'HomePage' });
                        console.log('could not fetch categories')
                    }
                },
        },
        mounted(){
            this.fetchContributions();
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