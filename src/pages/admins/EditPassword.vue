<template>
  <el-dialog title="更新密码" :visible.sync="dialogVisible" width="80%">
    <el-form ref="form" :model="form" label-width="100px" >
      <!--<el-form-item label="旧密码" prop="old_password" :rules="[$validators.required()]">-->
        <!--<el-input v-model="form.old_password"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="密码" prop="password" :rules="[$validators.required()]">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirmation" :rules="[$validators.required()]">
        <el-input v-model="form.password_confirmation" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="uploading" @click="onSubmit('form')">更新</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      dialogVisible: true,
      uploading: false,
      form: {
        // old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    onSubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.uploading = true
          return this.api.updateAdminPassword(this.item.id, this.form).then(({data}) => {
            this.uploading = false
            this.$root.owner.fetchData()
            this.$ext.unmount(this)
          }).catch(err => {
            console.log(err)
            this.uploading = false
          })
        }
      })
    }
  },
  components: {
  }
}
</script>
