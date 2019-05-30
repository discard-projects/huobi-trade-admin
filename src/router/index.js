/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/components/views/Layout/Index'

Vue.use(Router)

Vue.router = new Router({
  routes: [{ path: '', component: Layout, redirect: 'dashboard', children: [
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
      path: 'servicePeople', name: 'ServicePeople', meta: { title: 'ServicePeople', icon: 'service_people' }, component: (resolve) => { require(['@/pages/servicePeople/Index'], resolve) },
    }, {
      path: 'orders', name: 'Orders', meta: { title: 'Orders', icon: 'orders' }, component: (resolve) => { require(['@/pages/orders/Index'], resolve) },
    }, {
      path: 'carousels', name: 'Carousels', meta: { title: 'Carousels', icon: 'carousels' }, component: (resolve) => { require(['@/pages/carousels/Index'], resolve) },
    }, {
      path: 'feedbacks', name: 'Feedbacks', meta: { title: 'Feedbacks', icon: 'feedbacks' }, component: (resolve) => { require(['@/pages/feedbacks/Index'], resolve) },
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
    path: '/login', name: 'Login', meta: { title: 'Login', noCache: true }, component: (resolve) => { require(['@/components/views/Login/Index'], resolve) },
  }]
})
export default Vue.router
