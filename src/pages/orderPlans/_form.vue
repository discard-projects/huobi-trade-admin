<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="用户" prop="user_id">
      <ex-model-select v-model="form.user_id" api="/users" labelKey="name" labelKeySearch="mobile"></ex-model-select>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="关系" prop="kinship">
      <ex-options-select v-model="form.kinship" :options="[{value: '父母'}, {value: '祖父母'}, {value: '夫妻'}, {value: '子女'}, {value: '本人'}, {value: '其他'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <ex-options-select v-model="form.gender" :options="[{label: '男', value: 'gender_male'}, {label: '女', value: 'gender_female'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="自理能力" prop="self_care">
      <ex-options-select v-model="form.self_care" :options="[{label: '完全自理', value: 'self_care_free'}, {label: '半自理', value: 'self_care_half'}, {label: '不能自理', value: 'self_care_poor'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="疾病" prop="dic_disease_ids">
      <ex-model-select v-model="form.dic_disease_ids" api="/dic/diseases" labelKey="name" multiple></ex-model-select>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="form.age"></el-input-number>
    </el-form-item>
    <el-form-item label="高度(CM)" prop="height">
      <el-input-number v-model="form.height"></el-input-number>
    </el-form-item>
    <el-form-item label="体重(KG)" prop="weight">
      <el-input-number v-model="form.weight"></el-input-number>
    </el-form-item>
    <!--<el-form-item label="地区" prop="dic_area_id">-->
      <!--<ex-model-select v-model="form.dic_area_id" api="/dic/areas" labelKey="name"></ex-model-select>-->
    <!--</el-form-item>-->
    <el-form-item v-if="originForm" label="地区" prop="dic_area_id_with_parents">
      <area-cascader v-model="form.dic_area_id_with_parents"></area-cascader>
    </el-form-item>
    <!--<el-form-item label="民族" prop="dic_nation_id">-->
      <!--<ex-model-select v-model="form.dic_nation_id" api="/dic/nations" labelKey="name"></ex-model-select>-->
    <!--</el-form-item>-->
    <el-form-item label="地址" prop="address">
      <el-input type="textarea" v-model="form.address" placeholder="如: 仓兴街 18号"></el-input>
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
