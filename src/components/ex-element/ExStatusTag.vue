<template>
  <el-tag :type="type || getType(status)" style="white-space: inherit; height: auto;">
    <slot>{{status}}</slot>
  </el-tag>
</template>

<script>
/* eslint-disable */
import { Tag } from 'element-ui'
export default {
  name: 'StatusTag',
  props: {
    status: [String],
    type: [String],
    success: [String, Array],
    warning: [String, Array],
    danger: [String, Array],
    info: [String, Array],
    fail: [String, Array]
  },
  methods: {
    getType (status) {
      if ((typeof this.info === 'string') && status === this.info || (this.info instanceof Array) && this.info.indexOf(status) !== -1 ||
        (typeof this.fail === 'string') && status === this.fail || (this.fail instanceof Array) && this.fail.indexOf(status) !== -1) {
        return 'info'
      } else if ((typeof this.success === 'string') && status === this.success || (this.success instanceof Array) && this.success.indexOf(status) !== -1) {
        return 'success'
      } else if ((typeof this.warning === 'string') && status === this.warning || (this.warning instanceof Array) && this.warning.indexOf(status) !== -1) {
        return 'warning'
      } else if ((typeof this.danger === 'string') && status === this.danger || (this.danger instanceof Array) && this.danger.indexOf(status) !== -1 ||
                 (typeof this.fail === 'string') && status === this.fail || (this.fail instanceof Array) && this.fail.indexOf(status) !== -1) {
        return 'danger'
      }
      return ''
    }
  },
  components: {
    [Tag.name]: Tag
  }
}
</script>
