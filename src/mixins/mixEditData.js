export default {
  props: ['item'],
  data () {
    return {
      form: {},
      dialogVisible: true,
      fetching: false
    }
  },
  methods: {
    _fetchData (promise) {
      this.fetching = true
      return promise.then(({data}) => {
        this.form = data.item
        this.fetching = false
        return data
      }).catch(err => {
        this.fetching = false
        console.error(err)
      })
    },
    fetchData () {},
    _handler (promise) {
      return promise.then(({data}) => {
        this.$root && this.$root.owner && this.$root.owner.fetchData && this.$root.owner.fetchData()
        this.$ext.unmount(this)
        return data
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.fetchData()
  }
}
