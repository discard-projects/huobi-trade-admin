/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/components/views/Layout/Index'

Vue.use(Router)

Vue.router = new Router({
  routes: [{ path: '', component: Layout, redirect: 'orders', children: [
    {
      path: 'dashboard', name: 'Dashboard', meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }, component: (resolve) => { require(['@/pages/dashboard/Index'], resolve) },
    }, {
      path: 'admins', name: 'Admins', meta: { title: 'Admins', icon: 'admins' }, component: (resolve) => { require(['@/pages/admins/Index'], resolve) },
    }, {
      path: 'roles', name: 'Roles', meta: { title: 'Roles', icon: 'roles' }, component: (resolve) => { require(['@/pages/roles/Index'], resolve) },
    }, {
      path: 'permissions', name: 'Permissions', meta: { title: 'Permissions', icon: 'permissions' }, component: (resolve) => { require(['@/pages/permissions/Index'], resolve) },
    }, {
      path: 'workers', name: 'Workers', meta: { title: 'Workers', icon: 'workers' }, component: (resolve) => { require(['@/pages/workers/Index'], resolve) },
    }, {
      path: 'tradeSymbols', name: 'TradeSymbols', meta: { title: 'TradeSymbols', icon: 'tradeSymbols' }, component: (resolve) => { require(['@/pages/tradeSymbols/Index'], resolve) },
    }, {
      path: 'balances', name: 'Balances', meta: { title: 'Balances', icon: 'balances' }, component: (resolve) => { require(['@/pages/balances/Index'], resolve) },
    }, {
      path: 'orderIntervals', name: 'OrderIntervals', meta: { title: 'OrderIntervals', icon: 'order_intervals' }, component: (resolve) => { require(['@/pages/orderIntervals/Index'], resolve) },
    }, {
      path: 'orderRages', name: 'OrderRages', meta: { title: 'OrderRages', icon: 'order_rages' }, component: (resolve) => { require(['@/pages/orderRages/Index'], resolve) },
    }, {
      path: 'orderPlans', name: 'OrderPlans', meta: { title: 'OrderPlans', icon: 'order_Plans' }, component: (resolve) => { require(['@/pages/orderPlans/Index'], resolve) },
    }, {
      path: 'orderSmarts', name: 'OrderSmarts', meta: { title: 'OrderSmarts', icon: 'order_Smarts' }, component: (resolve) => { require(['@/pages/orderSmarts/Index'], resolve) },
    }, {
      path: 'orders', name: 'Orders', meta: { title: 'Orders', icon: 'orders' }, component: (resolve) => { require(['@/pages/orders/Index'], resolve) },
    }, {
      path: 'dic', name: 'Dic', meta: {title: 'Dic'}, component: (resolve) => { require(['@/pages/dic/Index'], resolve) }, children: [
        { path: 'areas', name: 'DicAreas', meta: {title: 'Areas'}, component: (resolve) => { require(['@/pages/dic/areas/Index'], resolve) } },
        { path: 'hospitals', name: 'DicHospitals', meta: {title: 'Hospitals'}, component: (resolve) => { require(['@/pages/dic/hospitals/Index'], resolve) } },
        { path: 'labels', name: 'DicLabels', meta: {title: 'Labels'}, component: (resolve) => { require(['@/pages/dic/labels/Index'], resolve) } },
        { path: 'diseases', name: 'DicDiseases', meta: {title: 'Diseases'}, component: (resolve) => { require(['@/pages/dic/diseases/Index'], resolve) } },
        { path: 'nations', name: 'DicNations', meta: {title: 'Nations'}, component: (resolve) => { require(['@/pages/dic/nations/Index'], resolve) } },
        { path: 'organizations', name: 'DicOrganizations', meta: {title: 'Organizations'}, component: (resolve) => { require(['@/pages/dic/organizations/Index'], resolve) } }
      ]
    }]
  }, {
    path: '/login', name: 'Login', meta: { title: 'Login', noCache: true }, component: (resolve) => { require(['@/components/views/Login/Index'], resolve) }
  }, {
    path: '/register', name: 'Register', meta: { title: 'Register', noCache: true }, component: (resolve) => { require(['@/components/views/Login/Register'], resolve) }
  }]
})
export default Vue.router
