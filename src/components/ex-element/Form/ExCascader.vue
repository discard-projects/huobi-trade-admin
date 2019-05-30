<template>
  <el-cascader v-model="currentValue" :value="valueKey" :label="labelKey" :options="items" @active-item-change="handleItemChange" :props="subProps" clearable></el-cascader>
</template>

<script>
export default {
  props: {
    items: [Array],
    value: [Array],
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    subProps: {
      value: {
        type: String,
        default: 'id'
      },
      label: {
        type: String,
        default: 'name'
      },
      children: {
        type: String,
        default: 'children'
      }
    },
    clearable: [Boolean]
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
    handleItemChange (val) {
      this.$emit()
    }
  }
}
</script>
