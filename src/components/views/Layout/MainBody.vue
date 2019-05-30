<template>
  <div class="main-body">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return []
    },
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-body {
    flex: 1;
    overflow: auto;
  }
</style>
