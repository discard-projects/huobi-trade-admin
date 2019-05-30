<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="[$validators.required()]"  v-if="!form.id">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role_ids">
      <ex-model-select v-model="form.role_ids" api="/roles" labelKey="name" multiple></ex-model-select>
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
