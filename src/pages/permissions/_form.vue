<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="路径" prop="api">
      <el-input v-model="form.api"></el-input>
    </el-form-item>
    <el-form-item label="上级归属" prop="parent_id" v-if="originForm">
      <ex-model-select v-model="form.parent_id" :default-value="form.parent_id" api="/permissions" labelKey="string_name_with_parents"></ex-model-select>
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
  mixins: [mixFormData]
}
</script>
