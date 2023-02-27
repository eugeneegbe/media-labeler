<template>
  <NavBar />
  <HomePage />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

export default {
  name: 'App',
  components: {
    NavBar,
    HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
