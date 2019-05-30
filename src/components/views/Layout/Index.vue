<template>
  <div class="clearfix" style="height: 100vh">
    <left-bar class="left-nav fl"></left-bar>
    <div class="right-body">
      <top-bar></top-bar>
      <tags-view></tags-view>
      <main-body></main-body>
    </div>
  </div>
</template>

<script>
import LeftBar from './LeftBar.vue'
import TopBar from './TopBar.vue'
import TagsView from './TagsView.vue'
import MainBody from './MainBody.vue'
export default {
  components: {
    LeftBar,
    TopBar,
    TagsView,
    MainBody
  }
}
</script>

<style lang="scss" scoped>
  .left-nav {
    /*width: 201px;*/
    height: 100%;
  }
  .right-body {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
