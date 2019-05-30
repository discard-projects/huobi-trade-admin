<template>
  <el-switch v-model="currentValue" @change="changeValue" :disabled="changing" :active-text="field"></el-switch>
</template>

<script>
import { Switch } from 'element-ui'
export default {
  props: {
    value: [Boolean],
    api: [String],
    field: [String]
  },
  data () {
    return {
      changing: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
      }
    }
  },
  methods: {
    changeValue (nv) {
      this.$confirm(`确定更改【${this.field}】的状态码?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changing = true
        return this.cusAxios.put(this.api, {field: this.field})
      }).then(({data}) => {
        this.changing = false
        this.currentValue = data.value
      }).catch((err) => {
        console.log(err)
        this.changing = false
        this.currentValue = !nv
      })
    }
  },
  components: {
    [Switch.name]: Switch
  }
}
</script>
