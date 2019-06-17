<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key" v-if="search.key == 'q_balance_plan_id_eq'">
          <ex-model-select v-model="mixTableData.query[search.key]" api="/v1/balance_plans" clearable labelKey="full_coin_name" placeholder="交易对"></ex-model-select>
        </el-form-item>
        <el-form-item :label="search.label" :key="search.key" v-if="search.key == 'q_status_in_any'">
          <ex-options-select v-model="mixTableData.query[search.key]" :clearable="false"
                             :options="[{label: '买入中', value: 'status_buying'}, {label: '已买入', value: 'status_buyed'},
                             {label: '已卖出', value: 'status_selled'}, {label: '卖出中', value: 'status_selling'},
                             {label: '已关闭', value: 'status_close'}]" multiple placeholder="状态"></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <template slot="status" slot-scope="{row}">
        <ex-status-tag type="success" v-if="row.status == 'status_buying'">买入中</ex-status-tag>
        <ex-status-tag v-else-if="row.status == 'status_buyed'">已买入</ex-status-tag>
        <ex-status-tag v-else-if="row.status == 'status_selled'">已卖出</ex-status-tag>
        <ex-status-tag type="danger" v-else-if="row.status == 'status_selling'">卖出中</ex-status-tag>
        <ex-status-tag type="info" v-else-if="row.status == 'status_close'">已关闭</ex-status-tag>
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
      this._fetchData(this.api.getOrderPlans(this.mixTableParams))
    },
    fetchItemFootprints (item) {
      this.api.getOrderPlanFootprints(item.id).then(res => {
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
        key: 'q_balance_plan_id_eq'
      }, {
        control: 'custom',
        key: 'q_status_in_any'
      }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '交易对',
        key: 'full_coin_name'
      }, {
        label: '买入价格',
        key: 'buy_price'
      }, {
        label: '买入数量',
        key: 'buy_count'
      }, {
        label: '卖出价格',
        key: 'sell_price'
      }, {
        label: '卖出数量',
        key: 'sell_count'
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
