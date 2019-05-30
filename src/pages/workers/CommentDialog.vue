<template>
  <el-dialog title="评论" :visible.sync="dialogVisible" width="90%">
    <comment-table></comment-table>
  </el-dialog>
</template>

<script>
import CommentTable from './comments/Index'
export default {
  data () {
    return {
      dialogVisible: true
    }
  },
  components: {
    CommentTable
  }
}
</script>
