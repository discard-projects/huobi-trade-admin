<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <template slot="search-bar-item" slot-scope="{search}">
        <el-form-item :label="search.label" :key="search.key">
          <ex-options-select v-model="mixTableData.query[search.key]" :clearable="true" :options="[{label: '全部', value: ''}, {label: '已设置手动下单', value: true}, {label: '未设置手动下单', value: false}]"></ex-options-select>
        </el-form-item>
      </template>
      <div slot="search-bar-operations">
        <el-button size="small" @click="showNewDialog">新增</el-button>
        <footprint ref="footprintRef" @fetchItemFootprints="fetchItemFootprints" :footprints.sync="footprints"></footprint>
      </div>
      <template slot="id" slot-scope="{row, $index, intro}">
        <el-button type="text" @click="$refs['footprintRef'].showDialog(row)">{{row.id}}</el-button>
      </template>
      <template slot="currency" slot-scope="{row}">
        {{row.currency.toUpperCase()}}
      </template>
      <template slot="table-operations" slot-scope="{row, $index, intro}">
        <el-button size="mini" @click="getBalancesTradeSymbols(row)">获取</el-button>
        <el-button size="mini" @click="showEditDialog(row)">编辑</el-button>
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
      this._fetchData(this.api.getBalances(this.mixTableParams))
    },
    showNewDialog () {
      this.$ext.mount(New, {onEl: this.$el, data: {owner: this}})
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
    },
    showEditDialog (item) {
      this.$ext.mount(Edit, {onEl: this.$el, props: {item}, data: {owner: this}})
    },
    updatePosition (item, newPosition) {
      console.log(item, newPosition)
    }
  },
  created () {
    this.mixTableData = Object.assign(this.mixTableData, {
      queryIntros: [{
        control: 'input',
        key: 'q_currency_cont',
        placeholder: '目标币种'
      }, {
        control: 'custom',
        key: 'q_balance_trade_symbols_cus_enabled_in_any',
        default: '',
        placeholder: '自选'
      }],
      dragable: (item, newPosition, oldPosition) => {
        this.api.updateCarouselPosition(item.id, {position: newPosition}).then(res => {
          this.fetchData()
        }).catch(err => {
          console.error(err)
          this.fetchData()
        })
      },
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '目标币种',
        key: 'currency'
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
