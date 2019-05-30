<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="拼音" prop="pinyin">
      <el-input v-model="form.pinyin"></el-input>
    </el-form-item>
    <el-form-item label="地区">
      <ex-model-select v-model="form.dic_area_id" api="/dic/areas" labelKey="name"></ex-model-select>
    </el-form-item>
    <el-form-item label="经度" prop="lng">
      <el-input v-model="form.lng"></el-input>
    </el-form-item>
    <el-form-item label="纬度" prop="lat">
      <el-input v-model="form.lat"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input type="textarea" v-model="form.address" placeholder="添加描述"></el-input>
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
