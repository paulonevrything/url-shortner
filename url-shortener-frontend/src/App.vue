<template>
  <div id="app">

<!-- Nav Bar -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">URL Shortner</a>
    </nav>

    <ShortenUrl />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import ShortenUrl from './components/ShortenUrl.vue';

@Component({
  components: {
    HelloWorld,
    ShortenUrl
  },
})
export default class App extends Vue { }
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
