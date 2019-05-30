<template>
  <el-dialog title="编辑" :visible.sync="dialogVisible" width="80%">
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
      return this._fetchData(this.api.getDicHospital(this.item.id))
    },
    handler () {
      return this._handler(this.api.updateDicHospital(this.item.id, this.form))
    }
  },
  components: {
    innerForm
  }
}
</script>
