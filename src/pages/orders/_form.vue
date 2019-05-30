<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="用户" prop="user_id">
      <ex-model-select v-model="form.user_id" api="/users" labelKey="name" labelKeySearch="mobile"></ex-model-select>
    </el-form-item>
    <el-form-item label="护工" prop="worker_id">
      <ex-model-select v-model="form.worker_id" api="/workers" labelKey="name" labelKeySearch="mobile"></ex-model-select>
    </el-form-item>
    <el-form-item label="联系人" prop="contact_name">
      <el-input v-model="form.contact_name"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="contact_mobile">
      <el-input v-model="form.contact_mobile"></el-input>
    </el-form-item>
    <el-form-item label="开始时间" prop="begin_at">
      <el-date-picker v-model="form.begin_at" type="date" placeholder="选择开始日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="end_at">
      <el-date-picker v-model="form.end_at" type="date" placeholder="选择结束日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="服务对象" prop="service_person_id">
      <ex-model-select v-model="form.service_person_id" api="/service_people" labelKey="name"></ex-model-select>
    </el-form-item>
    <el-form-item label="支付类型" prop="pay_category">
      <ex-options-select v-model="form.pay_category" :options="[{label: '支付定金', value: 'pay_category_down'}, {label: '全额支付', value: 'pay_category_full'}]"></ex-options-select>
    </el-form-item>
    <el-form-item label="护理地点" prop="place_category">
      <ex-options-select v-model="form.place_category" :options="[{label: '医院护理', value: 'place_category_hospital'}, {label: '居家护理', value: 'place_category_home'}]"></ex-options-select>
    </el-form-item>
    <el-form-item v-if="originForm" label="地区" prop="dic_area_id_with_parents">
      <area-cascader v-model="form.dic_area_id_with_parents"></area-cascader>
    </el-form-item>
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
