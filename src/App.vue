<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      console.log('v 0.6.17.2')
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;
    overflow: hidden;
  }
</style>
