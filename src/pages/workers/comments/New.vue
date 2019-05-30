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
        user_id: '',
        worker_id: '',
        desc: '',
        nickname: '',
        avatar: '',
        is_anonymous: false
      }
    }
  },
  methods: {
    handler () {
      this.form.worker_id = this.$root.worker.id
      return this.api.createWorkerComment(this.$root.worker.id, this.form).then(({data}) => {
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
