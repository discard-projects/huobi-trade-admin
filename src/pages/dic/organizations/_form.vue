<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form.mobile"></el-input>
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <ex-options-select v-model="form.category" :options="[{label: '工人', value: 'category_worker'}]"></ex-options-select>
    </el-form-item>
    <el-form-item v-if="originForm" label="地区" prop="dic_area_id_with_parents">
      <area-cascader v-model="form.dic_area_id_with_parents"></area-cascader>
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
