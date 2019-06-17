<template>
  <el-dialog title="计划交易" :visible.sync="dialogVisible" width="83%" top="5vh">
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
              <el-button size="mini" type="primary" :disabled="!row.enabled" @click="addBalancePlan(row)">纳入</el-button>
              <!--<el-button size="small" type="primary" :disabled="!row.enabled || form.balance_plans && form.balance_plans.map(item => item.trade_symbol_id).indexOf(row.id) !== -1" @click="addTradeSymbol(row)">纳入</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="flex: 1; margin-top: -30px">
        <h3>已纳入</h3>
        <el-form :inline="true" :model="form">
          <div style="max-height: 600px; overflow-y: auto; overflow-x: hidden">
            <el-card v-for="(balancePlan, index) in form.balance_plans" :key="index" style="margin-bottom: 10px">
              <div slot="header" class="clearfisx" style="margin-bottom: 15px">
                <span class="fl">{{balancePlan.trade_symbol.base_currency.toUpperCase()}} / {{balancePlan.trade_symbol.quote_currency.toUpperCase()}}</span>
                <span class="fr" style="color: #999" v-if="balancePlan.rate">{{balancePlan.rate.toFixed(10)}} %</span>
              </div>
              <el-form-item class="el-form-margin" label="区间起点">
                <el-input v-model="balancePlan.range_begin_price" placeholder="区间起点价格"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="区间终点">
                <el-input v-model="balancePlan.range_end_price" placeholder="区间终点价格"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="区间间隔">
                <el-input v-model="balancePlan.interval_price" placeholder="自定义区间间隔"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="标杆价格">
                <el-input v-model="balancePlan.open_price" placeholder="自定义初始价格"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="固定数量">
                <el-input v-model="balancePlan.count" placeholder="自定义固定数量"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="间隔追加数量">
                <el-input v-model="balancePlan.addition_count" placeholder="自定义间隔追加数量" style="width: 150px"></el-input>
              </el-form-item>
              <el-form-item class="el-form-margin" label="启用">
                <el-switch v-model="balancePlan.enabled"></el-switch>
              </el-form-item>
              <el-button class="fr" size="mini" type="danger" @click="deleteBalancePlan(balancePlan)">删除</el-button>
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
      balancePlanAddRate (obj) {
        Object.defineProperties(obj, {
          rate: {
            get () {
              return this.open_price ? (Number(this.open_price) + Number(this.interval_price)) / this.open_price * 100 : ''
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
          this.form.balance_plans.forEach(obj => {
            this.$nextTick(() => {
              this.balancePlanAddRate(obj)
            })
          })
        })
      },
      fetchAllowTradeSymbol () {
        this.api.getTradeSymbols({q_base_currency_eq: this.item.currency}).then(res => {
          this.allowTradeSymbols = res.data.items
        })
      },
      addBalancePlan (tradeSymbol) {
        let obj = {balance_id: this.item.id, range_begin_price: 0, range_end_price: 0, interval_price: 0, open_price: 0, count: 0, addition_count: 0, trade_symbol_id: tradeSymbol.id, enabled: false, trade_symbol: tradeSymbol}
        this.balancePlanAddRate(obj)
        this.form.balance_plans.push(obj)
      },
      deleteBalancePlan (balancePlan) {
        if (balancePlan.id) {
          this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.api.deleteBalancePlan(balancePlan.id).then(res => {
              this.form.balance_plans.splice(this.form.balance_plans.indexOf(balancePlan), 1)
            })
          })
        } else {
          this.form.balance_plans.splice(this.form.balance_plans.indexOf(balancePlan), 1)
        }
      },
      onSubmit () {
        let { balance_plans } = this.form
        return this._handler(this.api.updateBalance(this.item.id, {balance_plans}))
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
