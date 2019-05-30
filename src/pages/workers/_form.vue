<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="form.mobile"></el-input>
    </el-form-item>
    <el-form-item label="薪资/时" prop="hour_salary">
      <el-input-number v-model="form.hour_salary"></el-input-number>
    </el-form-item>
    <el-form-item label="身份证" prop="idcard">
      <el-input v-model="form.idcard"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <ex-options-select v-model="form.category" :options="[{label: '护工', value: 'category_nursing_worker'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <ex-options-select v-model="form.gender" :options="[{label: '男', value: 'gender_male'}, {label: '女', value: 'gender_female'}]"></ex-options-select>
    </el-form-item>
    <el-form-item v-if="originForm && form.dic_area_id_with_parents.length" label="地区" prop="dic_area_id_with_parents">
      <area-cascader v-model="form.dic_area_id_with_parents"></area-cascader>
    </el-form-item>
    <el-form-item label="民族" prop="dic_nation_id">
      <ex-model-select v-model="form.dic_nation_id" api="/dic/nations" labelKey="name"></ex-model-select>
    </el-form-item>
    <el-form-item label="机构" prop="dic_organization_ids">
      <ex-model-select v-model="form.dic_organization_ids" api="/dic/organizations" labelKey="name" multiple></ex-model-select>
    </el-form-item>
    <el-form-item label="标签" prop="dic_label_ids">
      <ex-model-select v-model="form.dic_label_ids" api="/dic/labels" labelKey="name" multiple></ex-model-select>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <ex-upload v-model="form.avatar" :url.sync="form.avatar_link"></ex-upload>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input type="textarea" v-model="form.desc" placeholder="请输入描述信息"></el-input>
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
