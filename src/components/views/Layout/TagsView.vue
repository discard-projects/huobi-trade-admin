<template>
  <div class="view">
    <router-link v-for="view in visitedViews" :key="view.path" :to="{path: view.path}" class="el-tag el-tag--info el-tag--small" :class="{'el-tag--success': $route.path == view.path}" style="margin: 8px 4px">
      {{view.name}}
      <span class='el-tag__close el-icon-close' @click.prevent.stop='closeSelectedView(view)'></span>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    '$route': {
      handler (nv) {
        if (nv.name) {
          this.$store.dispatch('tagsView.addVisitedView', nv)
        }
      },
      immediate: true
    }
  },
  methods: {
    closeSelectedView (view) {
      this.$store.dispatch('tagsView.removeVisitedView', view)
    }
  }
}
</script>

<style lang="scss" scoped>
  .view {
    background: #fff;
  }
</style>
