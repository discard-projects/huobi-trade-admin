<template>
  <el-dialog title="历史记录" :visible.sync="dialogVisible" append-to-body width="80%">
    <el-table :data="footprints" border style="width: 100%">
      <el-table-column label="操作人" width="120px">
        <template slot-scope="{row}">
          {{row.actor && row.actor.email}}
        </template>
      </el-table-column>
      <el-table-column label="before">
        <template slot-scope="{row}">
          <ui-json :json="row.before"></ui-json>
        </template>
      </el-table-column>
      <el-table-column label="after">
        <template slot-scope="{row}">
          <ui-json :json="row.after"></ui-json>
        </template>
      </el-table-column>
      <el-table-column label="动作" prop="action" width="80px"></el-table-column>
      <el-table-column label="操作时间" prop="created_time" width="160px"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import UiJson from '../share/single/Json/Json.vue'
export default {
  props: {
    footprints: {
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        this.$emit('update:footprints', [])
      }
    }
  },
  methods: {
    showDialog (item) {
      this.dialogVisible = true
      this.$emit('fetchItemFootprints', item)
    }
  },
  components: {
    UiJson
  }
}
</script>
