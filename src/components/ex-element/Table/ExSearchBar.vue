<template>
  <div v-if="searches && searches.length" class="wrap search-bar-component">
    <el-form ref="searchBarFormRef" :inline="true" @submit.native.prevent="search">
      <el-form-item v-for="search in searches" :label="search.label" :key="search.key" v-if="!search.control || search.control=='input'">
        <el-input v-model="query[search.key]" :placeholder="search.placeholder" clearable></el-input>
      </el-form-item>
      <slot :search="search" v-else></slot>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" native-type="submit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="operations" v-if="$slots.operations">
      <slot name="operations"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['searches', 'query'],
  methods: {
    search () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss">
  .wrap.search-bar-component {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0;
    padding: 0;

    .el-form {
      .el-form-item {
        margin: 15px 0 15px 15px;
      }
    }
  }
  .scope-content {
    display: inline-block;
  }
  .operations {
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
    border-left: 1px dashed lightgrey;

    &:empty {
      width: 0;
      height: 0;
      padding: 0 !important;
    }
  }
</style>
