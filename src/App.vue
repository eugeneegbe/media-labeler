<template>
  <router-view />
  <FlashMessage :position="'right bottom'"></FlashMessage>
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
    float: left;
    font-size: 1rem;
    border-radius: 6rem !important;
    height: 1.5rem !important;
    width: 1.5rem !important;
    font-weight: bolder;
    background-color: aqua;
    cursor: pointer;
    margin-left: 1rem !important;
}

@media only screen and (max-width: 600px) {
    .category-text input {
        width: 22rem;
        margin-bottom: 1rem;
    }
    .type-select{
        float: left;
        margin-bottom: 2rem;
    }
    .cat-type{
        width:  22rem;
        float: left;
    }

    /* .container{
        margin-top: 22rem;
    } */
    .next-image-btn,
    .previous-image-btn{
      display: none;
    }

    html,body {
      height:100%;
    }

    .mobile-navigator{
      display: block;
      bottom: 0;
      width: 100%;
      position: absolute;
      height: 100px;
      background-color: #6690da;
    }
    .container{
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0px;
      padding: 3px;
      width: 100vw;
      height: calc(100vh - 68px);
    }

    .mobile-navigator button{
      font-size: large;
    }
}
</style>
