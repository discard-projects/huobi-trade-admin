<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      console.log('v6.05.3')
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;
    overflow: hidden;
  }
</style>
