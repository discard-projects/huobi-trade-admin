<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key">
          <ex-options-select v-model="mixTableData.query[search.key]" :options="[{label: '工作者', value: 'category_worker'}]"></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <el-button size="small" @click="showNewDialog">新增</el-button>
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)">{{row.id}}</el-button>
      </template>
      <template slot="table-operations" slot-scope="{row, $index, intro}">
        <el-button size="mini" @click="showEditDialog(row)">编辑</el-button>
        <el-button size="mini" type="danger" :loading="row['deleting']" @click="destroy(row)">删除</el-button>
      </template>
    </ex-table>
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
      footprints: []
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getServicePeople(this.mixTableParams))
    },
    fetchItemFootprints (item) {
      this.api.getServicePersonFootprints(item.id).then(res => {
        this.footprints = res.data.items
      })
    },
    showNewDialog () {
      this.$ext.mount(New, {onEl: this.$el, data: {owner: this}})
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
            this.api.deleteServicePerson(row.id).then(res => {
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
    },
    updatePosition (item, newPosition) {
      console.log(item, newPosition)
    }
  },
  created () {
    this.mixTableData = Object.assign(this.mixTableData, {
      queryIntros: [{
        control: 'input',
        key: 'q_name_cont',
        placeholder: '名称'
      }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '名称',
        key: 'name'
      }, {
        label: '地区',
        key: 'dic_area_name_with_parents'
      }, {
        label: '地址',
        key: 'address'
      }, {
        label: '创建时间',
        key: 'created_time'
      }, {
        label: '更新时间',
        key: 'updated_time'
      }],
      opIntro: {
        label: '操作',
        width: 180
      }
    })
  }
}
</script>
