<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" append-to-body width="80%">
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
        begin_at: '',
        end_at: '',
        name: '',
        age: '',
        gender: '',
        dic_area_id: '',
        dic_area_id_with_parents: [],
        content: ''
      }
    }
  },
  methods: {
    handler () {
      this.form.worker_id = this.$root.worker.id
      return this.api.createResume(this.form).then(({data}) => {
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
