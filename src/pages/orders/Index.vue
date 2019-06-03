<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key">
          <ex-options-select v-model="mixTableData.query[search.key]" :clearable="true" :options="[{label: 'app内交易', value: 'kind_app'}, {label: '自动下单', value: 'kind_auto'}, {label: '自定义价格', value: 'kind_custom_price'}]"></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)" icon="el-icon-time"></el-button>
        <el-button type="text" @click="showDetailDialog(row)">{{row.id}}</el-button>
      </template>
      <!--<template slot="status" slot-scope="{row}">-->
        <!--<ex-status-tag :status="`${row.status}`" danger="0">{{row.status ? '通过' : '不通过'}}</ex-status-tag>-->
      <!--</template>-->
      <template slot="symbol" slot-scope="{row}">
        <!--{{row.symbol.toUpperCase()}}-->
        {{row.symbol_base_currency.toUpperCase()}} / {{row.symbol_quote_currency.toUpperCase()}}
      </template>
      <template slot="ctype" slot-scope="{row}">
        <ex-status-tag type="success" v-if="row.ctype == 'buy-limit'">买入</ex-status-tag>
        <ex-status-tag type="danger" v-if="row.ctype == 'sell-limit'">卖出</ex-status-tag>
      </template>
      <template slot="state" slot-scope="{row}">
        <ex-status-tag type="success" v-if="row.state == 'submitted'">已提交</ex-status-tag>
        <ex-status-tag type="info" v-else-if="row.state == 'partial-filled'">部分成交</ex-status-tag>
        <ex-status-tag type="info" v-else-if="row.state == 'partial-canceled'">部分成交撤销</ex-status-tag>
        <ex-status-tag type="success" v-else-if="row.state == 'filled'">完全成交</ex-status-tag>
        <ex-status-tag type="warning" v-else-if="row.state == 'canceled'">已撤销</ex-status-tag>
      </template>
      <template slot="table-operations" slot-scope="{row, $index, intro}">
        <el-button style="margin: 5px" size="mini" @click="showEditDialog(row)">撤单</el-button>
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
      }
    },
    created () {
      this.mixTableData = Object.assign(this.mixTableData, {
        queryIntros: [{
          control: 'input',
          key: 'symbol',
          placeholder: 'symbol'
        }, {
          control: 'custom',
          key: 'q_kind_eq',
          placeholder: '交易种类'
        }],
        dataIntros: [{
          label: '#',
          key: 'id',
          width: 130
        }, {
          label: '交易种类',
          key: 'kind',
          width: 140
        }, {
          label: '币种',
          key: 'symbol',
          width: 100
        }, {
          label: '买入/卖出',
          key: 'ctype',
          width: 80
        }, {
          label: '交易状态',
          key: 'status',
          width: 120
        }, {
          label: '三方交易状态',
          key: 'state',
          width: 120
        }, {
          label: '数量',
          key: 'amount'
        }, {
          label: '价格',
          key: 'price'
        }, {
          label: '已成交量',
          key: 'field_amount'
        }, {
          label: '已成交金额',
          key: 'field_cash_amount'
        }, {
          label: '已成交手续费',
          key: 'field_fees',
          width: 100
        }, {
          label: '创建时间',
          key: 'created_time',
          width: 140
        }, {
          label: '更新时间',
          key: 'updated_time',
          width: 140
        }]/*,
      opIntro: {
        label: '操作',
        width: 200
      }*/
      })
    }
  }
</script>
