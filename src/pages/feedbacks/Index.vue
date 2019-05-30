<template>
  <div>
    <ex-table :tableData="mixTableData" @refetch="fetchData">
      <!--<template slot="id" slot-scope="{row, $index, intro}">-->
        <!--<el-button type="text" @click="$refs['footprintRef'].showDialog(row)">{{row.id}}</el-button>-->
      <!--</template>-->
    </ex-table>
  </div>
</template>

<script>
import mixTableData from '@/mixins/mixTableData'
export default {
  mixins: [mixTableData],
  data () {
    return {
      footprints: []
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getFeedbacks(this.mixTableParams))
    }
  },
  created () {
    this.mixTableData = Object.assign(this.mixTableData, {
      // queryIntros: [{
      //   control: 'input',
      //   key: 'q_name_cont',
      //   placeholder: '名称'
      // }],
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 80
      }, {
        label: '提交用户',
        key: 'actor'
      }, {
        label: '联系方式',
        key: 'contact'
      }, {
        label: '描述',
        key: 'desc'
      }, {
        label: '创建时间',
        key: 'created_time'
      }, {
        label: '更新时间',
        key: 'updated_time'
      }]
    })
  }
}
</script>
