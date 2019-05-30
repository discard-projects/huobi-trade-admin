<template>
  <div class="login-wrap">
    <div class="title">Admin 管理系统</div>
    <div class="login">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="form.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
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
        email: 'swfeiyang@gmail.com',
        password: 'mars1234',
        remember_me: true
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'change,blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$auth.login({data: this.form, rememberMe: false}).then(({data}) => {
            console.log('1', data)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .login-wrap{
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

    .login {
      position: absolute;
      left: 50%;
      top: 40%;
      width:400px;
      height:240px;
      padding:40px;
      border-radius: 5px;
      background: #fff;
      transform: translate(-50%, -50%);

      .login-btn{
        text-align: center;
      }
      .login-btn button{
        width:100%;
        height:36px;
      }
    }
  }
</style>
