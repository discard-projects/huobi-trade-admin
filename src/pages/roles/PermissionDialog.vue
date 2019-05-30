<template>
  <el-dialog title="权限列表" :visible.sync="dialogVisible" width="80%">
    <el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="treeRef">
      <span slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
      </span>
    </el-tree>
    <div style="margin: 40px 20px 0; text-align: right;">
      <el-button type="success" @click="updatePermissions">更新权限</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PermissionIndex from './permissions/Index'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: true,
      treeData: null,
      selectedIds: []
    }
  },
  methods: {
    fetchDataTree () {
      this.api.getPermissionTree({per_page: 99999999999, role_id: this.item.id}).then(res => {
        this.treeData = res.data.items
        this.selectedIds = res.data['leaf_checked_permission_ids']
        this.$nextTick(() => {
          this.$refs['treeRef'].setCheckedKeys(this.selectedIds, false)
        })
      })
    },
    handleCheckChange (data, checked, indeterminate) {
      if (checked) {
        if (this.selectedIds.indexOf(data.id) === -1) {
          this.selectedIds.push(data.id)
        }
      } else {
        this.selectedIds = this.selectedIds.filter(id => id !== data.id)
      }
    },
    updatePermissions () {
      let permissionIds = [...this.$refs['treeRef'].getCheckedKeys(), ...this.$refs['treeRef'].getHalfCheckedKeys()]
      this.api.updateRole(this.item.id, Object.assign({...this.item}, {permission_ids: permissionIds})).then(res => {
        this.$root.owner.fetchData()
        this.$ext.unmount(this)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetchDataTree()
    })
  },
  components: {
    PermissionIndex
  }
}
</script>
