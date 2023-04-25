<template>
    <nav class="navbar navbar-expand-lg ">
        <a class="navbar-brand" href="#">WMCLabeler</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link logout-btn" :to="'/'">Home</router-link>
                </li>
                <li v-if="username" class="nav-item">
                    <router-link class="nav-link logout-btn" :to="'/label'">Contribute</router-link>
                </li>
                <!-- <li class="nav-item">
                    <router-link class="nav-link logout-btn" :to="'/add-images'">Add Images</router-link>
                </li> -->
            </ul>
            <ul class="navbar-nav ms-auto">
                <li v-if="!username" class="nav-item">
                    <a class="nav-link log-btn" @click="login" href="https://comelab-server.toolforge.org/login">Login</a>
                </li>
                <li v-else class="nav-item ">
                    <a class="nav-link log-btn" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    name: "NavBar",
    data() {
        return {
            username: null
        };
    },
    methods: {
        logout() {
            console.log('log out')
            this.username = null
        },
        async login() {
            console.log('mounted')
            const response = await axios.get('https://comelab-server.toolforge.org/current-user', {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
            console.log(response)
            if (response.ok) {
                this.username = response.data.username
            }
        }
    },
    async mounted(){
    }
}
</script>
<style>
.navbar {
    background-color: #6690da;
    overflow: hidden;
    margin-bottom: 30px;
}

.navbar a {
    color: white;
    font-size: large;
    text-align: center;
    text-decoration: none;
    margin: 4px;
    font-weight: 700;
}

.navbar a:hover {
    color: white;
    border-bottom: 1px solid black;
}

.log-btn {
    cursor: pointer;
}
</style>