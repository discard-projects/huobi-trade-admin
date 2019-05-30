<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key">
          <ex-options-select v-model="mixTableData.query[search.key]" :options="statusOptions" clearable></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <el-button size="small" @click="showNewDialog">新增</el-button>
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)" icon="el-icon-time"></el-button>
        <el-button type="text" @click="showDetailDialog(row)">{{row.id}}</el-button>
      </template>
      <template slot="service_person" slot-scope="{row, $index, intro}">
        <ui-json :json="row.service_person"></ui-json>
      </template>
      <template slot="status" slot-scope="{row, $index, intro}">
        <ui-json :json="row.status"></ui-json>
      </template>
      <template slot="pay_category" slot-scope="{row, $index, intro}">
        <ui-json :json="row.pay_category"></ui-json>
      </template>
      <template slot="table-operations" slot-scope="{row, $index, intro}">
        <el-button style="margin: 5px" v-if="row.status === 'status_created'" type="primary" size="mini" @click="updateOrderStatus(row, 'status_pending')">接单</el-button>
        <el-button style="margin: 5px" v-if="row.status === 'status_pending'" type="primary" size="mini" @click="updateOrderStatus(row, 'status_processing')">已处理</el-button>
        <el-button style="margin: 5px" v-if="row.status === 'status_processing'" type="primary" size="mini" @click="updateOrderStatus(row, 'status_successful')">已完成</el-button>
        <el-button style="margin: 5px" type="warning" size="mini"  @click="updateOrderStatus(row, 'status_failed')" v-if="['status_created', 'status_pending', 'status_processing'].indexOf(row.status) !== -1">设置失败</el-button>
        <el-button style="margin: 5px" size="mini" @click="showEditDialog(row)">编辑</el-button>
        <el-button style="margin: 5px" size="mini" type="danger" :loading="row['deleting']" @click="destroy(row)">删除</el-button>
      </template>
    </ex-table>
  </div>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
import New from './New.vue'
import Edit from './Edit.vue'
import Show from './Show.vue'
export default {
  mixins: [mixTableData],
  data () {
    return {
      footprints: [],
      json: null,
      statusOptions: [{value: 'status_created'}, {value: 'status_pending'}, {value: 'status_processing'}, {value: 'status_successful'}, {value: 'status_failed'}, {value: 'status_expired'}, {value: 'status_canceled'}, {value: 'status_closed'}]
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getOrders(this.mixTableParams))
    },
    fetchItemFootprints (item) {
      this.api.getOrderFootprints(item.id).then(res => {
        this.footprints = res.data.items
      })
    },
    showNewDialog () {
      this.$ext.mount(New, {onEl: this.$el, data: {owner: this}})
    },
    showEditDialog (item) {
      this.$ext.mount(Edit, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    showDetailDialog (item) {
      this.$ext.mount(Show, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    updateOrderStatus (order, status) {
      this.$confirm('确定更改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.api.updateOrderStatus(order.id, status).then(res => {
          this.fetchData()
        })
      })
    },
    destroy (row) {
      this.$confirm('确定要删除该条信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            this.$set(row, 'deleting', true)
            this.api.deleteOrder(row.id).then(res => {
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
        key: 'q_contact_name_cont',
        placeholder: '联系人姓名'
      }, {
        control: 'input',
        key: 'q_contact_mobile_cont',
        placeholder: '联系人电话'
      }, {
        control: 'custom',
        key: 'q_status_eq'
      }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '联系人',
        key: 'contact_name'
      }, {
        label: '联系方式',
        key: 'contact_mobile'
      }, {
        label: '开始日期',
        key: 'begin_at'
      }, {
        label: '结束日期',
        key: 'end_at'
      }, {
        label: '服务对象',
        key: 'service_person'
      }, {
        label: '状态',
        key: 'status'
      }, {
        label: '支付方式',
        key: 'pay_category'
      }, {
        label: '总金额',
        key: 'total_amount'
      }, {
        label: '折扣金额',
        key: 'discount_amount'
      }, {
        label: '真实金额',
        key: 'real_amount'
      }, {
        label: '已支付金额',
        key: 'pay_amount'
      }, {
        label: '创建时间',
        key: 'created_time'
      }, {
        label: '更新时间',
        key: 'updated_time'
      }],
      opIntro: {
        label: '操作',
        width: 200
      }
    })
  }
}
</script>
