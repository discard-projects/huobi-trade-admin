<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" append-to-body width="90%">
    <areas-template :level="level" :parentId="parentId"></areas-template>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
// import AreasTemplate from './_AreasTemplate.vue'
// console.log(AreasTemplate, '999')
export default {
  name: 'DialogSubAreas',
  props: {
    level: {
      type: String,
      default: 'level_province'
    },
    parentId: [Number],
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
    // AreasTemplate
  }
}
</script>
