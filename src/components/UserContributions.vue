<template>
    <NavBar />
    <div v-if="this.contributions.length > 0">
        <h2> All registered contributions</h2>
        <hr>
        <br>
        <a class="download btn btn-primary btn-md mt-3 mb-2" :href="'https://comelab-server.toolforge.org/contributions/download'"> Download </a>
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
    </div>
    <div v-else>
        <h2>There are no contributions avaible</h2>
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
                    } else {
                        this.$flashMessage.show({
                        html: '<div style="padding: 20px;font-weight:">'+
                                '<h4 style="font-weight: bolder">Something Went Wrong!</h4> <hr>'+
                                '<p style="color: red; font-size:1.3rem">Contributions are not loaded please reload</p>'+
                            '</div>'
                        });
                        this.$route.push({ name: 'HomePage' });
                    }
                },
        },
        mounted(){
            this.fetchContributions();
        }
    }
</script>

<style>
.download{
    float: right;
    margin-right: 4.5rem;
}

</style>