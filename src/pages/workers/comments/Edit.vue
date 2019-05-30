<template>
  <el-dialog title="编辑" :visible.sync="dialogVisible" append-to-body width="80%">
    <inner-form :form="form" :handler="handler" :fetching="fetching"></inner-form>
  </el-dialog>
</template>

<script>
import innerForm from './_form.vue'
import mixEditData from '@/mixins/mixEditData'
export default {
  mixins: [mixEditData],
  methods: {
    fetchData () {
      return this._fetchData(this.api.getWorkerComment(this.$root.worker.id, this.item.id)).then(data => {
        this.$set(this.form, 'worker_id', data.item.commentable_id)
      })
    },
    handler () {
      return this._handler(this.api.updateWorkerComment(this.$root.worker.id, this.item.id, this.form))
    }
  },
  components: {
    innerForm
  }
}
</script>
