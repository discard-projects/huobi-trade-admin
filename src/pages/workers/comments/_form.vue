<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="评论者" prop="user_id">
      <ex-model-select v-model="form.user_id" api="/users" labelKey="name" placeholder="评论者"></ex-model-select>
    </el-form-item>
    <el-form-item label="工作者" prop="worker_id">
      <ex-model-select v-model="form.worker_id" api="/workers" labelKey="name" placeholder="评论对象"></ex-model-select>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input type="textarea" v-model="form.desc" placeholder="请输入描述信息"></el-input>
    </el-form-item>
    <el-form-item label="虚拟昵称" prop="nickname">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="虚拟头像" prop="avatar">
      <ex-upload v-model="form.avatar" :url.sync="form.avatar_link"></ex-upload>
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
  watch: {
    'form.dic_area_id_with_parents': {
      handler (nv) {
        if (nv && nv.length) {
          this.form.dic_area_id = nv[nv.length - 1]
        } else {
          this.form.dic_area_id = null
        }
      },
      deep: true
    }
  }
}
</script>
