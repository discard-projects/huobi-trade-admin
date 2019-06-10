<template>
  <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
    <ui-json :json="form"></ui-json>
  </el-dialog>
</template>

<script>
import mixEditData from '@/mixins/mixEditData'
export default {
  mixins: [mixEditData],
  methods: {
    fetchData () {
      return this._fetchData(this.api.getOrderPlan(this.item.id))
    }
  }
}
</script>
