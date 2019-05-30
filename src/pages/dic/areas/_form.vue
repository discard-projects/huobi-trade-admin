<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="上级归属" prop="parent_id" v-if="originForm">
      <ex-model-select v-model="form.parent_id" :default-value="originForm.parent_id" api="/dic/areas" :extraParams="{q_level_eq: parentLevel}" labelKey="name"></ex-model-select>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="AdCode" prop="adcode">
      <el-input v-model="form.adcode"></el-input>
    </el-form-item>
    <el-form-item label="Level">
      <ex-options-select v-model="form.level" :options="[{label: '省级', value: 'level_province'}, {label: '市级', value: 'level_city'}, {label: '县级', value: 'level_district'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="经度" prop="lng">
      <el-input v-model="form.lng"></el-input>
    </el-form-item>
    <el-form-item label="纬度" prop="lat">
      <el-input v-model="form.lat"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="uploading" :disabled="fetching" @click="onSubmit('form')">{{ form.id ? '更新' : '创建' }}</el-button>
      <el-button @click="onReset('form')" v-if="!form.id">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import mixFormData from '@/mixins/mixFormData'
export default {
  mixins: [mixFormData],
  computed: {
    parentLevel () {
      if (this.form.level === 'level_district') {
        return 'level_city'
      } else if (this.form.level === 'level_city') {
        return 'level_province'
      } else if (this.form.level === 'level_province') {
        return 'level_country'
      }
    }
  }
}
</script>
