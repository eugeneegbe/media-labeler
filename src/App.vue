<template>
  <router-view />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
  components: {
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

.tooltip-btn {
    margin-right: 1rem;
    float: left;
    font-size: 1rem;
    border-radius: 6rem !important;
    height: 1.5rem !important;
    width: 1.5rem !important;
    font-weight: bolder;
    background-color: aqua;
    cursor: pointer;
}
</style>
