<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="600px">
    <inner-form :form="form" :handler="handler"></inner-form>
  </el-dialog>
</template>

<script>
import innerForm from './_form.vue'
export default {
  props: {
    parentId: [Number]
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        adcode: '',
        name: '',
        parent_id: this.parentId
      }
    }
  },
  methods: {
    handler () {
      return this.api.createDicArea(this.form).then(({data}) => {
        this.$root.owner.fetchData()
        this.$ext.unmount(this)
      })
    }
  },
  components: {
    innerForm
  }
}
</script>
