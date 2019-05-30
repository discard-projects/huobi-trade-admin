<template>
  <div style="margin-top: 15px; display: inline-block;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="paginateMeta.current_page"
      :page-sizes="[25, 50, 100, 200, 500]"
      :page-size="paginateMeta.limit_value"
      :layout="layout"
      :total="paginateMeta.total_count">
    </el-pagination>
  </div>
</template>

<script>
import { Pagination } from 'element-ui'
export default {
  name: 'Pagination',
  props: {
    paginateMeta: {
      type: Object
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  components: {
    'el-pagination': Pagination
  },
  methods: {
    handleSizeChange (val) {
      this.paginateMeta.limit_value = val
      this.handleRouter()
    },
    handleCurrentPageChange (val) {
      this.paginateMeta.current_page = val
      this.handleRouter()
    },
    handleRouter () {
      this.$emit('refetch', this.paginateMeta)
    }
  }
}
</script>
