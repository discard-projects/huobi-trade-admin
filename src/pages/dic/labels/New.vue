<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="80%">
    <inner-form :form="form" :handler="handler"></inner-form>
  </el-dialog>
</template>

<script>
import innerForm from './_form.vue'
export default {
  data () {
    return {
      dialogVisible: true,
      form: {
        name: '',
        category: ''
      }
    }
  },
  methods: {
    handler () {
      return this.api.createDicLabel(this.form).then(({data}) => {
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
