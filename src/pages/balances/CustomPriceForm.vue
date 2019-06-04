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
            <span class="fl">{{balaceTradeSymbol.trade_symbol_base_currency}} / {{balaceTradeSymbol.trade_symbol_quote_currency}}</span>
            <el-input class="fr" v-model="balaceTradeSymbol.rate" style="width: 200px">
              <template slot="append">%</template>
            </el-input>
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
      balanceTradeSymbolAddRate (obj) {
        Object.defineProperty(obj, 'rate', {
          get () {
            return this.cus_buy_price ? this.cus_sell_price / this.cus_buy_price * 100 : ''
          },
          set (nv) {
            if (+nv == nv) {
              this.cus_sell_price = this.cus_buy_price * nv / 100
            }
          }
        })
      },
      fetchData () {
        this._fetchData(this.api.getBalance(this.item.id)).then(res => {
          this.form.balance_trade_symbols.forEach(obj => {
            this.balanceTradeSymbolAddRate(obj)
          })
        })
      },
      fetchAllowTradeSymbol () {
        this.api.getTradeSymbols({q_base_currency_eq: this.item.currency}).then(res => {
          this.allowTradeSymbols = res.data.items
        })
      },
      addTradeSymbol (tradeSymbol) {
        let obj = {balance_id: this.item.id, trade_symbol_id: tradeSymbol.id, cus_buy_price: 0, cus_sell_price: 0, cus_count: 0, cus_enabled: false, trade_symbol_base_currency: tradeSymbol.base_currency, trade_symbol_quote_currency: tradeSymbol.quote_currency}
        this.balanceTradeSymbolAddRate(obj)
        this.form.balance_trade_symbols.push(obj)
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
