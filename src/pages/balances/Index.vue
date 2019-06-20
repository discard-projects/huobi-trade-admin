<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key" v-if="search.key=='q_balance_trade_symbols_cus_enabled_or_balance_plans_enabled_or_balance_smarts_enabled_in_any'">
          <ex-options-select v-model="mixTableData.query[search.key]" multiple :options="[{label: '已开启', value: true}, {label: '未开启', value: false}]" placeholder="请选择交易是否已开启"></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <!--折叠table-->
      <!--<template slot="expand" slot-scope="{row, $index, intro}">-->
        <!--<el-table :data="row.balance_trade_symbols" style="width: 100%">-->
          <!--<el-table-column prop="id" label="#"></el-table-column>-->
          <!--<el-table-column prop="trade_symbol" label="trade_symbol" width="400">-->
            <!--<template slot-scope="{row}">-->
              <!--<ui-json :json="row.trade_symbol"></ui-json>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="cus_buy_price" label="购买价格"></el-table-column>-->
          <!--<el-table-column prop="cus_sell_price" label="卖出价格"></el-table-column>-->
          <!--<el-table-column prop="cus_count" label="个数"></el-table-column>-->
          <!--<el-table-column prop="enabled" label="enabled">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.cus_enabled ? 'true' : ''}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</template>-->

      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)">{{row.id}}</el-button>
      </template>
      <template slot="enabled_items" slot-scope="{row}">
        <ui-json :json="row.enabled_items"></ui-json>
      </template>
      <template slot="currency" slot-scope="{row}">
        {{row.currency.toUpperCase()}}
      </template>
      <template slot="table-operations" slot-scope="{row, $index, intro}">
        <el-popover placement="top-start" width="200" trigger="hover" content="设置买入和卖出的固定价格，循环往复">
          <el-button slot="reference" size="small" @click="showCustomPriceFormDialog(row)">固定值交易</el-button>
        </el-popover>
        <el-popover placement="top-start" width="410" trigger="hover"
                    content="多节点交易，从标杆价格至区间终点所有节点的数据一次性以标杆价格分开挂单。低于标杆价格则数量递增，反之高于则递减。
                    到达某一节点价格，如果该节点已买入，则以该节点价格卖出低节点持有数量（可卖出的所有节点）；
                    如果未买入，则将持有的低于当前节点最近一个节点的数量卖给当前节点，并将其他可卖出节点卖出；如未持有低于当前节点最近一个节点则以当前节点价格挂单买入。">
          <el-button slot="reference" size="small" @click="showPlanPriceFormDialog(row)">计划交易</el-button>
        </el-popover>
        <el-popover placement="top-start" width="400" trigger="hover"
                    content="以起始价格买入起始数量，如下跌规定间隔价格，则以两倍数量买入上一次买入数量；
                    当持有数量的平均价格达到规定盈利百分比则挂单卖出使其剩余 起始数量的一半，并以当前价格虚拟买入剩余数量且重新开始周期">
          <el-button slot="reference" size="small" @click="showSmartPriceFormDialog(row)">智能交易</el-button>
        </el-popover>
      </template>
    </ex-table>
  </div>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
import CustomPriceForm from './CustomPriceForm.vue'
import PlanPriceForm from './PlanPriceForm.vue'
import SmartPriceForm from './SmartPriceForm.vue'
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
    showPlanPriceFormDialog (item) {
      this.$ext.mount(PlanPriceForm, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    showSmartPriceFormDialog (item) {
      this.$ext.mount(SmartPriceForm, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    fetchItemFootprints (item) {
      this.api.getBalanceFootprints(item.id).then(res => {
        this.footprints = res.data.items
      })
    },
    getBalanceTradeSymbols (item) {
      this.api.getBalanceTradeSymbols(item.id).then(res => {
        this.footprints = res.data.items
      })
    }
  },
  created () {
    this.mixTableData = Object.assign(this.mixTableData, {
      query: {
        q_balance_trade_symbols_cus_enabled_or_balance_plans_enabled_or_balance_smarts_enabled_in_any: [true, false]
      },
      queryIntros: [{
        control: 'input',
        key: 'q_currency_cont'
      }, {
        control: 'custom',
        key: 'q_balance_trade_symbols_cus_enabled_or_balance_plans_enabled_or_balance_smarts_enabled_in_any'
      }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '目标币种',
        key: 'currency'
      }, /*{
        label: '已设定交易货币',
        valueHandler (key, row, index) {
          return `[ ${row.balance_trade_symbols.map(item => item.trade_symbol.quote_currency.toUpperCase()).join(', ')} ], [ ${row.balance_plans.map(item => item.trade_symbol.quote_currency.toUpperCase()).join(', ')} ] , [ ${row.balance_smarts.map(item => item.trade_symbol.quote_currency.toUpperCase()).join(', ')} ]`
        },
        width: 300
      }, */{
        label: '纳入信息',
        key: 'enabled_items',
        width: 350
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
        key: 'created_time',
        width: 135
      }, {
        label: '更新时间',
        key: 'updated_time',
        width: 135
      }],
      opIntro: {
        label: '操作',
        width: 325
      }
    })
  }
}
</script>
