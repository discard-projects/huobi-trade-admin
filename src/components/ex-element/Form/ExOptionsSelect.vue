<template>
  <el-select v-model="selectValue" :disabled="disabled" :placeholder="placeholder" :clearable="clearable">
    <el-option
      v-for="item in options" :key="item[valueKey]"
      :label="item[labelKey] || item[valueKey]"
      :value="item[valueKey]"
      :disabled="item.disabled">
    </el-option>
  </el-select>
</template>

<script>
import {Select, Option} from 'element-ui'
export default {
  name: 'OptionsSelect',
  props: {
    'value': {
      require: false
    },
    'disabled': {
      require: false
    },
    'placeholder': {
      require: false
    },
    'clearable': {
      required: false
    },
    'labelKey': {
      default: 'label'
    },
    'valueKey': {
      default: 'value'
    },
    'options': {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectValue: this.value
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.selectValue) {
        this.selectValue = newVal
      }
    },
    selectValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  }
}
</script>
