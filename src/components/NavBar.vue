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
                <li class="nav-item">
                    <router-link class="nav-link logout-btn" :to="'/contributions'">Contributions</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link logout-btn" :to="'/about'">About</router-link>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto">
                <li v-if="username == 'Anonymous'" class="nav-item">
                    <a class="nav-link log-btn" @click="login" href="https://comelab-server.toolforge.org/login">Login</a>
                </li>
                <li v-else class="nav-item ">
                    <a class="nav-link log-btn" @click="logout">Logout</a>
                </li>
                <li class="username">
                    <a class="nav-link log-btn">{{ this.username }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>


export default {
    name: "NavBar",
    data() {
        return {
            username: 'Anonymous'
        };
    },
    methods: {
        logout() {
            console.log('log out')
            this.username = 'Anonymous'
        },
    },
    mounted(){
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
.username {
    text-decoration: none;
    font-size: larger;
}
</style>