<template>
  <div id="app">
    <MainNav />
    <router-view/>
  </div>
</template>

<script>
import MainNav from '@/components/navigation/MainNav'

export default {
  components: {
    MainNav
  }
}
</script>

<style>
@import './styles/app.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
