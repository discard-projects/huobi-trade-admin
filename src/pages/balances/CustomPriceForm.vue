<template>
  <el-dialog title="自定义价格" :visible.sync="dialogVisible" width="80%">
    <div>
      <h3>可纳入</h3>
      <el-table :data="allowTradeSymbols" style="width: 100%">
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="base_currency" label="base_currency"></el-table-column>
        <el-table-column prop="quote_currency" label="quote_currency"></el-table-column>
        <el-table-column prop="symbol" label="symbol"></el-table-column>
        <el-table-column prop="enabled" label="enabled">
          <template slot-scope="scope">
            <span>{{scope.row.enabled ? 'true' : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button type="text" size="small" :disabled="!row.enabled || form.balance_trade_symbols && form.balance_trade_symbols.map(item => item.trade_symbol_id).indexOf(row.id) !== -1" @click="addTradeSymbol(row)">纳入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <h3>已纳入</h3>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-card v-for="(balaceTradeSymbol,index) in form.balance_trade_symbols" :key="index">
          <div slot="header" class="clearfix">
            <span>{{balaceTradeSymbol.trade_symbol_base_currency}} / {{balaceTradeSymbol.trade_symbol_quote_currency}}</span>
          </div>
          <el-form-item label="买入价格">
            <el-input v-model="balaceTradeSymbol.cus_buy_price" placeholder="自定义购买价格"></el-input>
          </el-form-item>
          <el-form-item label="卖出价格">
            <el-input v-model="balaceTradeSymbol.cus_sell_price" placeholder="自定义卖出价格"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="balaceTradeSymbol.cus_count" placeholder="自定义购买数量"></el-input>
          </el-form-item>
          <el-form-item label="启用">
            <el-switch v-model="balaceTradeSymbol.cus_enabled"></el-switch>
          </el-form-item>
        </el-card>
        <el-form-item style="margin-top: 15px">
          <el-button type="primary" @click="onSubmit">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import innerForm from './_form.vue'
  import mixEditData from '@/mixins/mixEditData'
  export default {
    mixins: [mixEditData],
    data () {
      return {
        allowTradeSymbols: []
      }
    },
    methods: {
      fetchData () {
        return this._fetchData(this.api.getBalance(this.item.id))
      },
      handler () {
        return this._handler(this.api.updateCarousel(this.item.id, this.form))
      },
      fetchAllowTradeSymbol () {
        this.api.getTradeSymbols({q_base_currency_eq: this.item.currency}).then(res => {
          this.allowTradeSymbols = res.data.items
        })
      },
      addTradeSymbol (tradeSymbol) {
        this.form.balance_trade_symbols.push({balance_id: this.item.id, trade_symbol_id: tradeSymbol.id, cus_buy_price: 0, cus_sell_price: 0, cus_count: 0, cus_enabled: false})
      },
      onSubmit () {
        return this._handler(this.api.updateBalance(this.item.id, this.form))
      }
    },
    mounted () {
      this.fetchAllowTradeSymbol()
    },
    components: {
      innerForm
    }
  }
</script>

<style lang="scss" scoped>
  h3 {
    line-height: 50px;
  }
</style>
