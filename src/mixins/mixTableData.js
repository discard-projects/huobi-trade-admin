import mixTableDragable from './mixTableDragable'
export default {
  mixins: [mixTableDragable],
  data () {
    return {
      mixTableData: {
        // boolean or function
        dragable: false,
        exportable: false,
        items: [],
        fetching: false,
        opIntro: null,
        dataIntros: [],
        pagination: null,
        queryIntros: [],
        query: {}
      }
    }
  },
  computed: {
    mixTableParams () {
      return Object.assign({
        page: (this.mixTableData.pagination && this.mixTableData.pagination.current_page) || 1,
        per_page: (this.mixTableData.pagination && this.mixTableData.pagination.limit_value) || 25
      }, this.mixTableData.query)
    }
  },
  watch: {
    queryIntros: {
      immediate: true,
      handler () {
        this.mixTableData.queryIntros.forEach(queryIntro => {
          if (!this.mixTableData.query[queryIntro.key]) {
            this.$set(this.mixTableData.query, queryIntro.key, queryIntro.defaultValue || '')
          }
        })
      }
    }
  },
  methods: {
    fetchData () { console.log('default fetchData') },
    _fetchData (promise) {
      this.mixTableData.fetching = true
      return promise.then(({ data }) => {
        this.mixTableData.fetching = false
        this.mixTableData.items = data.items
        this.mixTableData.pagination = data.pagination
        this.mixTableData.dragable && this.$nextTick(() => {
          this.setSortable()
        })
        return data
      }).catch(err => {
        console.error(err)
        this.mixTableData.fetching = false
      })
    }
  },
  created () {
    this.fetchData()
  }
}
