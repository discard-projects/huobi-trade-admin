<template>
  <div class="register-wrap">
    <div class="title">Admin 管理系统 - 注册</div>
    <div class="register">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input type="password" placeholder="请再次输入密码" v-model="form.passwordAgain" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="access_key">
          <el-input v-model="form.access_key" placeholder="请输入 access_key"></el-input>
        </el-form-item>
        <el-form-item prop="secret_key">
          <el-input v-model="form.secret_key" placeholder="请输入 secret_key"></el-input>
        </el-form-item>
        <el-form-item prop="slack_webhook_url">
          <el-input v-model="form.secret_key" placeholder="请输入 slack_webhook_url"></el-input>
        </el-form-item>
        <div class="register-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        passwordAgain: '',
        access_key: '',
        secret_key: '',
        confirmed_at: new Date()
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'change, blur' }
        ],
        password: [
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if (this.form.passwordAgain !== '') {
                  this.$refs.ruleForm.validateField('passwordAgain');
                }
                callback();
              }
            }, trigger: 'blur' }
        ],
        passwordAgain: [
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur' }
        ],
        access_key: [
          { required: true, message: '请输入 access_key', trigger: 'change, blur' }
        ],
        secret_key: [
          { required: true, message: '请输入 secret_key', trigger: 'change, blur' }
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.api.createUser(this.form).then(({data}) => {
            this.$router.push({ name: 'Login' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .register-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #324157;

    .title{
      position: absolute;
      top:45%;
      width:100%;
      margin-top: -230px;
      text-align: center;
      font-size:30px;
      color: #fff;
    }

    .register {
      position: absolute;
      left: 50%;
      top: 48%;
      width: 400px;
      height: 390px;
      padding: 40px;
      border-radius: 5px;
      background: #fff;
      transform: translate(-50%, -50%);

      .register-btn{
        text-align: center;
        margin-top: 45px;
      }
      .register-btn button{
        width:100%;
        height:36px;
      }
    }
  }
</style>
