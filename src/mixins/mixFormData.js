export default {
  props: {
    form: [Object],
    handler: [Function],
    fetching: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploading: false,
      originForm: null
    }
  },
  watch: {
    form: {
      handler (newVal) {
        if (newVal && Object.keys(newVal).length) {
          this.originForm = Object.assign({}, newVal)
        }
      },
      immediate: true
    }
  },
  methods: {
    onReset (formRef) {
      this.$refs[formRef].resetFields()
    },
    onSubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.uploading = true
          this.handler().then(() => {
            this.uploading = false
          }).catch(err => {
            console.error(err)
            this.uploading = false
          })
        }
      })
    }
  }
}
