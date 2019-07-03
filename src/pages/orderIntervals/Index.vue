<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key" v-if="search.key == 'q_balance_interval_id_eq'">
          <ex-model-select v-model="mixTableData.query[search.key]" api="/v1/balance_intervals" clearable labelKey="full_coin_name" placeholder="交易对"></ex-model-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <template slot="category" slot-scope="{row}">
        <ex-status-tag type="success" v-if="row.category == 'category_buy'">买入</ex-status-tag>
        <ex-status-tag type="danger" v-if="row.category == 'category_sell'">卖出</ex-status-tag>
      </template>
      <template slot="status" slot-scope="{row}">
        <ex-status-tag type="success" v-if="row.status == 'status_created'">已创建</ex-status-tag>
        <ex-status-tag v-else-if="row.status == 'status_trading'">交易中</ex-status-tag>
        <ex-status-tag v-else-if="row.status == 'status_traded'">交易完成</ex-status-tag>
        <ex-status-tag type="info" v-else-if="row.status == 'status_closed'">已关闭</ex-status-tag>
        <ex-status-tag type="info" v-else-if="row.status == 'status_canceled'">已取消</ex-status-tag>
      </template>
      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)" icon="el-icon-time"></el-button>
        <el-button type="text" @click="showDetailDialog(row)">{{row.id}}</el-button>
      </template>
    </ex-table>
  </div>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
import Show from './Show.vue'

export default {
  mixins: [mixTableData],
  data () {
    return {
      footprints: []
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getOrderIntervals(this.mixTableParams))
    },
    fetchItemFootprints (item) {
      this.api.getOrderIntervalFootprints(item.id).then(res => {
        this.footprints = res.data.items
      })
    },
    showDetailDialog (item) {
      this.$ext.mount(Show, {onEl: this.$el, props: {item}, data: {owner: this}})
    }
  },
  created () {
    this.mixTableData = Object.assign(this.mixTableData, {
      queryIntros: [{
        control: 'custom',
        key: 'q_balance_interval_id_eq'
      }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 110
      }, {
        label: '交易对',
        key: 'full_coin_name'
      }, {
        label: '价格',
        key: 'price'
      }, {
        label: '数量',
        key: 'amount'
      }, {
        label: '类型',
        key: 'category'
      }, {
        label: '状态',
        key: 'status'
      }, {
        label: '创建时间',
        key: 'created_time'
      }, {
        label: '更新时间',
        key: 'updated_time'
      }]
    })
  }
}
</script>
