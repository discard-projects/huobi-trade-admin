<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      console.log('v 6.6.1')
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;
    overflow: hidden;
  }
</style>
