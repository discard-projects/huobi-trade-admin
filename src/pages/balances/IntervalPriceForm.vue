<template>
  <el-dialog title="固定值交易" :visible.sync="dialogVisible" width="80%" top="5vh">
    <div style="display: flex">
      <div style="margin: -30px 40px 20px 0; width: 400px">
        <h3>可纳入</h3>
        <el-table :data="allowTradeSymbols" style="width: 100%">
          <el-table-column prop="symbol" label="交易对">
            <template slot-scope="{row}">
              {{row.base_currency.toUpperCase()}} / {{row.quote_currency.toUpperCase()}}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="当前价格">
            <template slot-scope="{row}">
              {{row.current_price}}
            </template>
          </el-table-column>
          <el-table-column prop="enabled" label="开启状态">
            <template slot-scope="scope">
              <ex-status-tag type="success" v-if="scope.row.enabled">已开启</ex-status-tag>
              <ex-status-tag type="info" v-else>已关闭</ex-status-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="{row}">
              <el-button size="mini" type="primary" :disabled="!row.enabled" @click="addTradeSymbol(row)">纳入</el-button>
              <!--<el-button size="small" type="primary" :disabled="!row.enabled || form.balance_intervals && form.balance_intervals.map(item => item.trade_symbol_id).indexOf(row.id) !== -1" @click="addTradeSymbol(row)">纳入</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="flex: 1; margin-top: -30px">
        <h3>已纳入</h3>
        <el-form :inline="true" :model="form">
          <div style="max-height: 600px; overflow-y: auto; overflow-x: hidden">
            <el-card v-for="(balanceInterval, index) in form.balance_intervals" :key="index" style="margin-bottom: 10px">
              <div slot="header" class="clearfisx" style="margin-bottom: 15px">
                <span class="fl">{{balanceInterval.trade_symbol_base_currency.toUpperCase()}} / {{balanceInterval.trade_symbol_quote_currency.toUpperCase()}}(需：{{balanceInterval.buy_price * balanceInterval.amount}})</span>
                <span class="fr" style="color: #999" v-if="balanceInterval.rate">{{balanceInterval.rate.toFixed(10)}} % <span style="margin-left: 30px">利润：{{balanceInterval.profit.toFixed(10)}} {{balanceInterval.trade_symbol_quote_currency.toUpperCase()}}</span></span>
              </div>
              <el-form-item class="el-form-margin" label="买入价格">
                <el-input v-model="balanceInterval.buy_price" placeholder="自定义购买价格"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="卖出价格" v-if="!balanceInterval.custom_sell_enabled">
                <el-input v-model="balanceInterval.sell_price" placeholder="自定义卖出价格"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="数量">
                <el-input v-model="balanceInterval.amount" placeholder="自定义购买数量" style="width: 130px"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="是否手动卖出">
                <el-switch v-model="balanceInterval.custom_sell_enabled"></el-switch>
              </el-form-item>
              <el-form-item class="el-form-margin" label="启用">
                <el-switch v-model="balanceInterval.enabled"></el-switch>
              </el-form-item>
              <el-button class="fr" size="mini" type="danger" @click="deleteBalanceInterval(balanceInterval)">删除</el-button>
            </el-card>
          </div>
          <el-form-item style="margin-top: 25px; width: 100%; text-align: right; margin-bottom: -10px">
            <el-button type="primary" size="medium" @click="onSubmit">完 成</el-button>
          </el-form-item>
        </el-form>
      </div>
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
      balanceIntervalAddRate (obj) {
        Object.defineProperties(obj, {
          rate: {
            get () {
              return this.buy_price ? this.sell_price / this.buy_price * 100 : ''
            },
            set (nv) {
              if (+nv == nv) {
                this.sell_price = this.buy_price * nv / 100
              }
            }
          },
          profit: {
            get () {
              return this.buy_price ? (this.sell_price * this.amount * 0.998 - this.buy_price * this.amount) - this.amount * 0.002 * this.buy_price - this.amount * 0.998 * this.sell_price * 0.002 : ''
            }
          }
        })
      },
      fetchData () {
        this._fetchData(this.api.getBalance(this.item.id)).then(res => {
          this.form.balance_intervals.forEach(obj => {
            this.$nextTick(() => {
              this.balanceIntervalAddRate(obj)
            })
          })
        })
      },
      fetchAllowTradeSymbol () {
        this.api.getTradeSymbols({q_base_currency_eq: this.item.currency}).then(res => {
          this.allowTradeSymbols = res.data.items
        })
      },
      addTradeSymbol (tradeSymbol) {
        let obj = {balance_id: this.item.id, trade_symbol_id: tradeSymbol.id, buy_price: 0, sell_price: 0, amount: 0, enabled: false, custom_sell_enabled: false, trade_symbol_base_currency: tradeSymbol.base_currency, trade_symbol_quote_currency: tradeSymbol.quote_currency}
        this.balanceIntervalAddRate(obj)
        this.form.balance_intervals.push(obj)
      },
      deleteBalanceInterval (balanceInterval) {
        if (balanceInterval.id) {
          this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.api.deleteBalanceInterval(balanceInterval.id).then(res => {
              this.form.balance_intervals.splice(this.form.balance_intervals.indexOf(balanceInterval), 1)
            })
          })
        } else {
          this.form.balance_intervals.splice(this.form.balance_intervals.indexOf(balanceInterval), 1)
        }
      },
      onSubmit () {
        let { balance_intervals } = this.form
        return this._handler(this.api.updateBalance(this.item.id, {balance_intervals}))
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
  .el-form-margin {
    margin-bottom: 0 !important;
  }
</style>
