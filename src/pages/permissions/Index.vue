<template>
  <div style="margin: 15px">
    <el-button type="primary" @click="showNewDialog" style="margin-bottom: 15px">新增</el-button>
    <el-tree :data="treeData" default-expand-all node-key="id" ref="treeRef">
      <span slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <div style="display: inline-block;">
          <el-button size="mini" type="text" @click="showNewDialog(data)">新增</el-button>
          <el-button size="mini" type="text" @click="showEditDialog(data)">编辑</el-button>
          <el-button size="mini" type="text" @click="destroy(data)" style="color: #f44">删除</el-button>
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
import New from './New.vue'
import Edit from './Edit.vue'
export default {
  mixins: [mixTableData],
  data () {
    return {
      footprints: [],
      treeData: null
    }
  },
  methods: {
    fetchData () {
      this.api.getPermissionTree({per_page: 99999999999}).then(res => {
        this.treeData = res.data.items
      })
    },
    showNewDialog (item) {
      this.$ext.mount(New, {onEl: this.$el, data: {owner: this}, props: {item}})
    },
    fetchItemFootprints (item) {
      this.api.getPermissionFootprints(item.id).then(res => {
        this.footprints = res.data.items
      })
    },
    showEditDialog (item) {
      this.$ext.mount(Edit, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    destroy (row) {
      this.$confirm('确定要删除该条信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            this.$set(row, 'deleting', true)
            this.api.deletePermission(row.id).then(res => {
              this.$set(row, 'deleting', false)
              this.$message.success('删除成功了！')
              this.fetchData()
            }).catch(err => {
              console.error(err)
              this.$message.error('删除报错了！')
              this.$set(row, 'deleting', false)
            })
          }
        }
      })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
