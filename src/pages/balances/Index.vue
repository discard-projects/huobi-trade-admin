<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData" tableType="expand">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key">
          <ex-options-select v-model="mixTableData.query[search.key]" :clearable="true" :options="[{label: '已开启', value: true}, {label: '未开启', value: false}]" placeholder="请选择交易是否已开启"></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <!--折叠table-->
      <template slot="expand" slot-scope="{row, $index, intro}">
        <el-table :data="row.balance_trade_symbols" style="width: 100%">
          <el-table-column prop="id" label="#"></el-table-column>
          <el-table-column prop="trade_symbol" label="trade_symbol" width="250">
            <template slot-scope="{row}">
              <ui-json :json="row.trade_symbol" style="width: 220px"></ui-json>
            </template>
          </el-table-column>
          <el-table-column prop="cus_buy_price" label="购买价格"></el-table-column>
          <el-table-column prop="cus_sell_price" label="卖出价格"></el-table-column>
          <el-table-column prop="cus_count" label="个数"></el-table-column>
          <el-table-column prop="enabled" label="enabled">
            <template slot-scope="scope">
              <span>{{scope.row.cus_enabled ? 'true' : ''}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)">{{row.id}}</el-button>
      </template>
      <template slot="currency" slot-scope="{row}">
        {{row.currency.toUpperCase()}}
      </template>
      <template slot="table-operations" slot-scope="{row, $index, intro}">
        <el-button size="mini" @click="showCustomPriceFormDialog(row)">设置自动交易</el-button>
        <!--<el-button size="mini" @click="showEditDialog(row)">编辑</el-button>-->
      </template>
    </ex-table>
  </div>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
import CustomPriceForm from './CustomPriceForm.vue'
export default {
  mixins: [mixTableData],
  data () {
    return {
      footprints: []
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getBalances(this.mixTableParams))
    },
    showCustomPriceFormDialog (item) {
      this.$ext.mount(CustomPriceForm, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    fetchItemFootprints (item) {
      this.api.getCarouselFootprints(item.id).then(res => {
        this.footprints = res.data.items
      })
    },
    getBalancesTradeSymbols (item) {
      this.api.getBalancesTradeSymbols(item.id).then(res => {
        this.footprints = res.data.items
      })
    }
  },
  created () {
    this.mixTableData = Object.assign(this.mixTableData, {
      query: {
        q_balance_trade_symbols_cus_enabled_in_any: true
      },
      queryIntros: [{
        control: 'input',
        key: 'q_currency_cont',
        placeholder: '目标币种'
      }, {
        control: 'custom',
        key: 'q_balance_trade_symbols_cus_enabled_in_any'
      }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '目标币种',
        key: 'currency'
      }, {
        label: '已设定交易货币',
        valueHandler (key, row, index) {
          return row.balance_trade_symbols.map(item => item.trade_symbol.quote_currency.toUpperCase()).join(', ')
        }
      }, {
        label: '冻结',
        key: 'frozen_balance',
        sortable: 'frozen_balance'
      }, {
        label: '可用',
        key: 'trade_balance',
        sortable: 'trade_balance'
      }, {
        label: '总计',
        key: 'total_balance'
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
