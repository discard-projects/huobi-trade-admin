<template>
  <el-breadcrumb separator="/" class="breadcrumb fl">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index" :to="{ name: item.name, params: $route.params }">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    levelList () {
      return this.$route.matched.filter(item => item.name)
    }
  }
}
</script>
