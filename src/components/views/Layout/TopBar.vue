<template>
  <el-menu class="navbar clearfix" mode="horizontal">
    <hamburger></hamburger>
    <div class="content">
      <breadcrumb class="breadcrumb"></breadcrumb>
    </div>
    <!--右侧-->
    <div class="right-menu">
      <ex-err-log class="errLog-container right-menu-item"></ex-err-log>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ currentUser && currentUser.email }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              dashboard
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display: block;">logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
export default {
  computed: {
    currentUser () {
      return this.$auth.watch.data
    }
  },
  methods: {
    logout () {
      this.$auth.logout({
        makeRequest: true,
        success () {
          console.log('success logout')
        },
        error () {
          console.log('error logout')
        }
      })
    }
  },
  created () {
    if (!this.currentUser) {
      this.$router.push({name: 'Login'})
    }
    //    this.$auth.login({data: {email: '1@mg.com', password: '123123123'}, rememberMe: true}).then(({data}) => {
    //      console.log('1', data)
    //    })
    //    if (!this.currentUser || this.currentUser.email) {
    //      this.$router.push({name: 'Login'})
    //    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 51px;
    padding: 10px;
    line-height: 20px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;

    .content {
      display: inline-block;
      .breadcrumb {
        padding-left: 10px;
        line-height: 28px;
      }
      @include mobile-device {
        display: none;
      }
    }

    .right-menu {
      line-height: 28px;
      overflow: hidden;
      flex: 1;
      text-align: right;
    }
  }
</style>
