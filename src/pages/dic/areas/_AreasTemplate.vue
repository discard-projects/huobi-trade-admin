<template>
  <ex-table :tableData="mixTableData" @refetch="fetchData">
    <div slot="search-bar-operations">
      <el-button size="small" @click="showNewDialog">新增</el-button>
    </div>
    <template slot="name" slot-scope="{row, $index, intro}">
      <el-button type="text" @click="showSubAreas(row)">{{row.name}}</el-button>
    </template>
    <template slot="table-operations" slot-scope="{row, $index, intro}">
      <el-button size="mini" @click="showEditDialog(row)">编辑</el-button>
      <el-button size="mini" type="danger" :loading="row['deleting']" @click="destroy(row)">删除</el-button>
    </template>
  </ex-table>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
import DialogSubAreas from './DialogSubAreas'
import New from './New.vue'
import Edit from './Edit.vue'

export default {
  name: 'AreasTemplate',
  mixins: [mixTableData],
  props: {
    level: {
      type: String,
      default: 'level_province'
    },
    parentId: {
      type: [Number],
      default: 1
    }
  },
  methods: {
    fetchData () {
      return this._fetchData(this.api.getDicAreas(Object.assign({q_level_eq: this.level, parent_id: this.parentId}, this.mixTableParams)))
    },
    showSubAreas (row) {
      let newLevel = ''
      if (this.level === 'level_province') {
        newLevel = 'level_city'
      } else if (this.level === 'level_city') {
        newLevel = 'level_district'
      }
      this.$ext.mount(DialogSubAreas, {props: {level: newLevel, parentId: row.id}})
    },
    showNewDialog () {
      this.$ext.mount(New, {data: {$route: this.$route, owner: this}, props: {parentId: this.parentId}})
    },
    showEditDialog (item) {
      this.$ext.mount(Edit, {data: {owner: this}, props: {item}})
    },
    destroy (row) {
      this.$confirm('确定要删除该条信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            this.$set(row, 'deleting', true)
            this.api.deleteDicArea(row.id).then(res => {
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
    this.mixTableData = Object.assign(this.mixTableData, {
      // exportable: 'orders',
      queryIntros: [{
        control: 'input',
        key: 'q_name_cont',
        placeholder: this.level
      }],
      dragable: (item, newPosition, oldPosition) => {
        this.api.updateDicAreaPosition(item.id, {position: newPosition}).then(res => {
          this.fetchData()
        }).catch(err => {
          console.error(err)
          this.fetchData()
        })
      },
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 100
      }, {
        label: '省份',
        key: 'name'
      }, {
        label: 'AdCode',
        key: 'adcode'
      }, {
        label: '级别',
        key: 'level'
      }, {
        label: '经度',
        key: 'lng'
      }, {
        label: '纬度',
        key: 'lat'
      }, {
        label: '创建时间',
        key: 'created_time',
        sortable: 'created_at',
        width: 160
      }, {
        label: '更新时间',
        key: 'updated_time',
        width: 160
      }],
      opIntro: {
        label: '操作',
        width: 180
      }
    })
  }
}
</script>
