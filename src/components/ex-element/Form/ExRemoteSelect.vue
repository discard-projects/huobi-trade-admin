<template>
  <el-select v-model="currentValue" :multiple="multiple" :disabled="disabled" remote filterable clearable :placeholder="placeholder" :remote-method="fetchData" :loading="fetching">
    <el-option v-for="item in items" :key="item[valueKey]" :label="item[labelKey]" :value="item[valueKey]"></el-option>
  </el-select>
</template>

<script>
import { Select } from 'element-ui'
export default {
  props: {
    value: [String, Array, Number],
    api: [String],
    params: [Object],
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    multiple: {
      type: [Boolean],
      default: false
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    placeholder: {
      type: String,
      default: 'Pls Input Search Key'
    }
  },
  data () {
    return {
      items: [],
      fetching: false
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
  watch: {
    currentValue: {
      handler () {
        this.fetchData()
      },
      immediate: true
    }
  },
  methods: {
    fetchData (keyword) {
      this.fetching = true
      let params = {}
      if (this.currentValue) {
        params[this.valueKey] = this.currentValue
      }
      this.cusAxios.get(this.api, {params: Object.assign(params, {[this.labelKey]: keyword})}).then(({data}) => {
        this.fetching = false
        this.items = data.items
      }).catch(err => {
        console.error(err)
        this.fetching = false
      })
    }
  },
  components: {
    [Select.name]: Select
  }
}
</script>
