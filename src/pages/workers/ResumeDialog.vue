<template>
  <el-dialog title="表格" :visible.sync="dialogVisible" width="90%">
    <resume-table></resume-table>
  </el-dialog>
</template>

<script>
import ResumeTable from './resumes/Index'
export default {
  data () {
    return {
      dialogVisible: true
    }
  },
  components: {
    ResumeTable
  }
}
</script>
