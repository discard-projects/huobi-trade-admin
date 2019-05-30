<template>
  <div>
    <el-select v-model="selectValue" filterable remote clearable @clear="clearDo" :placeholder="placeholder" :multiple="multiple" :remote-method="remoteMethod" :allow-create="allowCreate" :loading="loading" style="width: 90%">
      <el-option v-for="item in items" :key="item.id" :label="item[labelKey]" :value="item[valueKey]"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      require: true
    },
    defaultValue: {
      require: false
    },
    extraParams: {
      default: () => { return {per_age: 100} }
    },
    item: {
      require: false,
      type: Object,
      default: () => { return {} }
    },
    api: {
      require: true
    },
    labelKey: {
      require: true
    },
    labelKeySearch: {
      require: false
    },
    valueKey: {
      default: 'id'
    },
    valueKeySearch: {
      default: 'q_id_in_any'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Search'
    }
  },
  data () {
    return {
      items: [],
      loading: false,
      selectValue: this.value
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.selectValue) {
        this.selectValue = newVal
        this.remoteMethod('', true)
      }
    },
    selectValue (newVal) {
      this.$emit('input', newVal)
      if (!newVal) {
        this.remoteMethod()
      }
    },
    extraParams: {
      handler (nv, ov) {
        let change = false
        Object.keys(nv).forEach(nk => {
          Object.keys(ov).forEach(ok => {
            if (nv[nk] !== ov[ok] && !change) {
              // 存在值改变
              change = true
              this.selectValue = this.defaultValue
              this.remoteMethod('', true)
            }
          })
        })
      },
      deep: true
    }
  },
  methods: {
    clearDo () {
      this.remoteMethod()
    },
    remoteMethod (query, isFirst) {
      if (!isFirst) {
        this.cusAxios.get(this.api, {params: Object.assign({[`q_${this.labelKeySearch || this.labelKey}_cont`]: query}, this.extraParams)}).then(res => {
          this.loading = false
          this.items = res.data.items
        }).catch(() => {
          this.loading = false
        })
      } else {
        let ids = []
        if (this.multiple) {
          ids = this.value
        } else if (this.value) {
          ids.push(this.value)
        }
        let initObj = ids && ids.length ? {[this.valueKeySearch]: ids} : {}
        this.cusAxios.get(this.api, {params: Object.assign(initObj, this.extraParams)}).then(res => {
          if (res.data.items) {
            this.items = res.data.items
          }
        })
      }
    }
  },
  mounted () {
    this.remoteMethod('', true)
  }
}
</script>

<style lang="css">
</style>
