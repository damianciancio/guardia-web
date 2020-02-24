<template>
  <div id="app">
    <Navigation></Navigation>
    <div id="router-container" class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Login from './components/user/login.vue';
import Navigation from './components/navbar/navbar.vue';
import AttentionsList from './components/attentions/AttentionsList.vue';

export default {
  name: 'app',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Login,
    Navigation,
    // eslint-disable-next-line vue/no-unused-components
    AttentionsList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#router-container {
  margin-top: 60px;

}
</style>
