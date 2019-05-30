<template>
  <div class="ex-table">
    <ex-search-bar :searches="tableData.queryIntros" :query="tableData.query" @search="$emit('refetch')">
      <template slot-scope="{search}" v-if="$scopedSlots['search-bar-item']">
        <slot name="search-bar-item" :search="search"></slot>
      </template>
      <div slot="operations">
        <template>
          <slot name="search-bar-operations"></slot>
        </template>
      </div>
    </ex-search-bar>
    <slot name="table">
      <el-table :data="tableData.items" row-key="id" v-loading.body="tableData.fetching" resizable border stripe :show-summary="showSummary" @sort-change="sortChange" @selection-change="handleSelectionChange" class="table-data">
        <template v-if="tableType">
          <el-table-column :type="tableType" v-if="tableType === 'expand'">
            <template slot-scope="{row, $index}">
              <slot name="expand" :row="row" :$index="$index"></slot>
            </template>
          </el-table-column>
          <el-table-column :type="tableType" v-else></el-table-column>
        </template>
        <el-table-column v-for="(intro,index) in tableData.dataIntros" :key="index" :label="intro['label']" :show-overflow-tooltip="intro['showOverflowTooltip']" :width="intro.width" :sortable="intro.sortable ? 'custom' : false" :prop="intro.sortable || intro.filterable || intro.key" :filters="intro.filters" :filter-method="intro.filters && filterChange">
          <template slot-scope="{row, $index}">
            <slot :name="intro.key" :row="row" :$index="$index" :intro="intro">
              <span>{{ intro['valueHandler'] && safeValueHandler(intro['valueHandler'], [row[intro['key']], row, index]) || intro['value'] || row[intro['key']] }}</span>
            </slot>
          </template>
        </el-table-column>
        <el-table-column v-if="tableData.opIntro" :fixed="tableData.opIntro.fixed || 'right'" :label="tableData.opIntro['label']" :width="tableData.opIntro['width']">
          <template slot-scope="{row, $index}">
            <slot name="table-operations" :row="row" :$index="$index" :intro="tableData.opIntro"></slot>
          </template>
        </el-table-column>
      </el-table>
    </slot>
    <ex-pagination :paginate-meta="tableData.pagination" @refetch="$emit('refetch')" v-if="tableData.pagination"></ex-pagination>
    <div class="fr" style="display: inline-block; margin: 10px">
      <el-button @click="exportTableExcel('Selected')" v-if="tableData.exportable && selectedItems.length">Export Selected Data</el-button>
      <el-button @click="exportTableExcel('All')" v-if="tableData.exportable">Export Data</el-button>
    </div>
  </div>
</template>

<script>
import { Table } from 'element-ui'
import ExPagination from './ExPagination.vue'
import ExSearchBar from './ExSearchBar.vue'
import Excel from '@/utils/excel'
export default {
  name: 'ExTable',
  props: {
    tableName: {
      type: String,
      default: 'dataTable'
    },
    tableType: {
      type: String,
      // expand, selection, index
      default: ''
    },
    showSummary: [Boolean],
    tableData: {
      type: Object,
      default: () => { return {} },
      data: {
        type: [Array],
        default: () => { return [] }
      },
      dataIntros: {
        type: [Array],
        require: true
      },
      opIntro: {
        type: [Object]
      },
      pagination: {
        type: [Object]
      },
      queryIntros: {
        type: [Object]
      },
      dragable: [Boolean],
      exportable: [Boolean, String]
    }
  },
  data () {
    return {
      selectedItems: []
    }
  },
  methods: {
    safeValueHandler (handler, args) {
      try { return handler.apply(handler, args) } catch (err) { return args[0] }
    },
    sortChange ({column, prop, order}) {
      if (prop) {
        this.tableData.query.qs_sorts = [`${prop} ${order === 'descending' ? 'desc' : 'asc'}`]
      } else {
        delete this.tableData.query.qs_sorts
      }
      this.$emit('refetch')
    },
    filterChange (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSelectionChange (selectedItems) {
      this.selectedItems = selectedItems
      this.$emit('selection-change', selectedItems)
    },
    exportTableExcel (type) {
      let tableName = typeof this.tableData.exportable === 'string' ? this.tableData.exportable : 'tableData'
      switch (type) {
        case 'All':
          Excel.generateExcel(this.$el.querySelector('.table-data'), tableName)
          break
        case 'Selected':
          // 第一列是checkbox，必须用一个空值占位
          let keys = [null].concat(this.tableData.dataIntros.map(intro => intro.key))
          Excel.generateExcel(this.$el.querySelector('.table-data'), tableName, Excel.formatJson(keys, this.selectedItems))
          break
      }
    }
  },
  components: {
    [Table.name]: Table,
    ExPagination,
    ExSearchBar
  }
}
</script>

<style lang="scss">
  .ex-table-sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>

<!--<ex-table :tableData="mixTableData" @refetch="fetchData">-->
  <!--<template slot="search-bar-item" slot-scope="{search}">-->
    <!--<span>{{search}}</span>-->
  <!--</template>-->
  <!--<div slot="search-bar-operations">-->
    <!--hello-->
  <!--</div>-->
  <!--<template slot="name" slot-scope="{row, $index, intro}">-->
    <!--<el-button type="text" @click="$router.push({name: 'PaymentModeItem', params: {payment_id: row['payment_id'], payment_mode_id: row['id']}})">{{row.name}}</el-button>-->
  <!--</template>-->
  <!--<template slot="table-operations" slot-scope="{row, $index, intro}">-->
  <!--</template>-->
<!--</ex-table>-->

<!--<script>-->
<!--export default {-->
  <!--created () {-->
    <!--this.mixTableData = Object.assign(this.mixTableData, {-->
      <!--dragable (newPosition, oldPosition) {-->
        <!--console.log(newPosition, oldPosition)-->
      <!--},-->
      <!--queryIntros: [{-->
        <!--control: 'input',-->
        <!--key: 'q_name_cont',-->
        <!--placeholder: '姓名'-->
      <!--}, {-->
        <!--control: 'select',-->
        <!--key: 'q_age_cont',-->
        <!--placeholder: '姓名'-->
      <!--}],-->
      <!--dataIntros: [{-->
        <!--label: '#',-->
        <!--key: 'id',-->
        <!--width: 100-->
      <!--}, {-->
        <!--label: '名称',-->
        <!--key: 'name'-->
      <!--}, {-->
        <!--label: '类型',-->
        <!--key: 'payment_type'-->
      <!--}],-->
      <!--opIntro: {-->
        <!--label: '操作',-->
        <!--width: 180-->
      <!--}-->
    <!--})-->
  <!--}-->
<!--}-->
<!--</script>-->
