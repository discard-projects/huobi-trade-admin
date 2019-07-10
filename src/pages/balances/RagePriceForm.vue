<template>
  <el-dialog title="新币交易" :visible.sync="dialogVisible" width="80%" top="5vh">
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
              <el-button size="mini" type="primary" :disabled="!row.enabled" @click="addTradeSymbol(row)">纳入</el-button>
              <!--<el-button size="small" type="primary" :disabled="!row.enabled || form.balance_rages && form.balance_rages.map(item => item.trade_symbol_id).indexOf(row.id) !== -1" @click="addTradeSymbol(row)">纳入</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="flex: 1; margin-top: -30px">
        <h3>已纳入</h3>
        <el-form :inline="true" :model="form">
          <div style="max-height: 600px; overflow-y: auto; overflow-x: hidden">
            <el-card v-for="(balanceRage, index) in form.balance_rages" :key="index" style="margin-bottom: 10px">
              <div slot="header" class="clearfisx" style="margin-bottom: 15px">
                <span class="fl">{{balanceRage.trade_symbol_base_currency.toUpperCase()}} / {{balanceRage.trade_symbol_quote_currency.toUpperCase()}}</span>
              </div>
              <el-form-item class="el-form-margin" label="开盘价百分比买入">
                <el-input v-model="balanceRage.buy_percent" placeholder="开盘价百分比买入"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="以多少币买入">
                <el-input v-model="balanceRage.coin_amount" placeholder="根据买入币数计算买入数量"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="卖出百分比">
                <el-input v-model="balanceRage.sell_percent" placeholder="买入价上涨多少买入" style="width: 130px"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="启用">
                <el-switch v-model="balanceRage.enabled"></el-switch>
              </el-form-item>
              <el-button class="fr" size="mini" type="danger" @click="deleteBalanceRage(balanceRage)">删除</el-button>
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
      fetchData () {
        this._fetchData(this.api.getBalance(this.item.id))
      },
      fetchAllowTradeSymbol () {
        this.api.getTradeSymbols({q_base_currency_eq: this.item.currency}).then(res => {
          this.allowTradeSymbols = res.data.items
        })
      },
      addTradeSymbol (tradeSymbol) {
        let obj = {balance_id: this.item.id, trade_symbol_id: tradeSymbol.id, buy_percent: 0, sell_percent: 0, coin_amount: 0, enabled: false, trade_symbol_base_currency: tradeSymbol.base_currency, trade_symbol_quote_currency: tradeSymbol.quote_currency}
        this.form.balance_rages.push(obj)
      },
      deleteBalanceRage (balanceRage) {
        if (balanceRage.id) {
          this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.api.deleteBalanceRage(balanceRage.id).then(res => {
              this.form.balance_rages.splice(this.form.balance_rages.indexOf(balanceRage), 1)
            })
          })
        } else {
          this.form.balance_rages.splice(this.form.balance_rages.indexOf(balanceRage), 1)
        }
      },
      onSubmit () {
        let { balance_rages } = this.form
        return this._handler(this.api.updateBalance(this.item.id, {balance_rages}))
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
