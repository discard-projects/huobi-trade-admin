<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="开始时间" prop="begin_at">
      <el-date-picker v-model="form.begin_at" type="date" placeholder="选择开始日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="end_at">
      <el-date-picker v-model="form.end_at" type="date" placeholder="选择结束日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item v-if="originForm && form.dic_area_id_with_parents" label="地区" prop="dic_area_id_with_parents">
      <area-cascader v-model="form.dic_area_id_with_parents"></area-cascader>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <ex-options-select v-model="form.gender" :options="[{label: '男', value: 'gender_male'}, {label: '女', value: 'gender_female'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="form.age"></el-input-number>
    </el-form-item>
    <el-form-item label="描述" prop="content">
      <el-input type="textarea" v-model="form.content" placeholder="请输入描述信息"></el-input>
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
        console.log(111, nv)
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
