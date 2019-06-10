<template>
  <el-menu class="menu" :class="{opened: sidebar.opened}" :collapse-transition="false" :default-active="$route.meta && $route.meta.groupName || $route.name" :collapse="!sidebar.opened" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" mode="vertical">
    <template v-for="(route, index) in routes">
      <template v-if="route.children">
        <el-submenu :index="route.name" :key="route.name" v-if="false">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ route.name }}</span>
          </template>
          <template v-for="childRoute in route.children">
            <router-link :to="{name: childRoute.name}" :key="childRoute.name">
              <el-menu-item :index="childRoute.name">
                <i class="el-icon-location"></i>
                <span slot="title">{{childRoute.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <router-link :to="{name: route.name}" :key="index" v-if="['Orders', 'OrderPlans', 'Balances', 'TradeSymbols'].indexOf(route.name) != -1">
          <el-menu-item :index="route.name">
            <i class="el-icon-menu"></i>
            <span slot="title">{{route.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    routes () {
      let routes = []
      try {
        routes = this.$router.options.routes[0].children || []
      } catch (err) {
        routes = []
      }
      return routes
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu {
    height: 100%;
    overflow-y: auto;
    &.opened {
      width: 220px;
    }
  }
</style>
