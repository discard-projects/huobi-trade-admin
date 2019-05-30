<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="600px">
    <ui-json :json="json" style="width: 100%"></ui-json>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
export default {
  props: {
    json: [Object],
    title: {
      default: '详情'
    }
  },
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        this.$ext.unmount(this)
      }
    }
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  components: {
    [Dialog.name]: Dialog
  }
}
</script>
