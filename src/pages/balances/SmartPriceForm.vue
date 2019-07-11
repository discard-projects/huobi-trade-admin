<template>
  <el-dialog title="智能交易" :visible.sync="dialogVisible" width="83%" top="5vh">
    <div style="display: flex">
      <div style="margin: -30px 40px 20px 0; width: 400px">
        <h3>可纳入</h3>
        <el-table :data="allowTradeSymbols" style="width: 100%">
          <el-table-column prop="symbol" label="交易对">
            <template slot-scope="{row}">
              {{row.base_currency.toUpperCase()}} / {{row.quote_currency.toUpperCase()}}
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
              <el-button size="mini" type="primary" :disabled="!row.enabled" @click="addBalanceSmart(row)">纳入</el-button>
              <!--<el-button size="small" type="primary" :disabled="!row.enabled || form.balance_smarts && form.balance_smarts.map(item => item.trade_symbol_id).indexOf(row.id) !== -1" @click="addTradeSymbol(row)">纳入</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="flex: 1; margin-top: -30px">
        <h3>已纳入</h3>
        <el-form :inline="true" :model="form">
          <div style="max-height: 600px; overflow-y: auto; overflow-x: hidden">
            <el-card v-for="(balanceSmart, index) in form.balance_smarts" :key="form.balance_smarts.length - index" style="margin-bottom: 10px">
              <div slot="header" class="clearfisx" style="margin-bottom: 15px">
                <span class="fl">{{balanceSmart.trade_symbol.base_currency.toUpperCase()}} / {{balanceSmart.trade_symbol.quote_currency.toUpperCase()}}</span>
                <span class="fr" style="color: #999" v-if="balanceSmart.profit">约收益【{{balanceSmart.trade_symbol.quote_currency.toUpperCase()}} {{balanceSmart.profit.toFixed(10)}}】</span>
              </div>
              <el-form-item class="el-form-margin" label="起始买入价格">
                <el-input v-model="balanceSmart.open_price" placeholder="起始买入价格"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="起始买入数量">
                <el-input v-model="balanceSmart.amount" placeholder="起始买入数量"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="下跌买入百分比">
                <el-input v-model="balanceSmart.buy_percent" placeholder="如: 3 代表下跌 3%买入"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="下跌买入比率">
                <el-input v-model="balanceSmart.rate_amount" placeholder="1.1代表上次买入个数的1.1倍"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="最大买入量">
                <el-input v-model="balanceSmart.max_amount" placeholder="最大买入量"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="盈利百分比">
                <el-input v-model="balanceSmart.sell_percent" type="number" placeholder="如：3 代表盈利 3% 卖出"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="启用">
                <el-switch v-model="balanceSmart.enabled"></el-switch>
              </el-form-item>
              <el-button class="fr" size="mini" type="danger" @click="deleteBalanceSmart(balanceSmart)">删除</el-button>
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
      balanceSmartAddRate (obj) {
        Object.defineProperties(obj, {
          profit: {
            get () {
              return this.open_price ?  this.open_price * this.amount * (this.sell_percent * 0.01 - 0.004) : ''
            },
            set (nv) {
              if (+nv == nv) {
                // this.cus_sell_price = this.cus_buy_price * nv / 100
              }
            }
          }
        })
      },
      fetchData () {
        this._fetchData(this.api.getBalancePlans(this.item.id)).then(res => {
          this.form.balance_smarts.forEach(obj => {
            this.$nextTick(() => {
              this.balanceSmartAddRate(obj)
            })
          })
        })
      },
      fetchAllowTradeSymbol () {
        this.api.getTradeSymbols({q_base_currency_eq: this.item.currency}).then(res => {
          this.allowTradeSymbols = res.data.items
        })
      },
      addBalanceSmart (tradeSymbol) {
        let obj = {balance_id: this.item.id, open_price: 0, amount: 0, rate_amount: 0, max_amount: 0, buy_percent: 0, sell_percent: 0, trade_symbol_id: tradeSymbol.id, enabled: false, trade_symbol: tradeSymbol}
        this.balanceSmartAddRate(obj)
        this.form.balance_smarts.unshift(obj)
      },
      deleteBalanceSmart (balanceSmart) {
        if (balanceSmart.id) {
          this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.api.deleteBalanceSmart(balanceSmart.id).then(res => {
              this.form.balance_smarts.splice(this.form.balance_smarts.indexOf(balanceSmart), 1)
            })
          })
        } else {
          this.form.balance_smarts.splice(this.form.balance_smarts.indexOf(balanceSmart), 1)
        }
      },
      onSubmit () {
        let { balance_smarts } = this.form
        return this._handler(this.api.updateBalance(this.item.id, {balance_smarts}))
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
    margin-bottom: 5px !important;
  }
</style>
