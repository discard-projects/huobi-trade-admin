import Vue from 'vue'
import axios from 'axios'
import VueAuth from '@websanova/vue-auth'
import { Message } from 'element-ui'
import UiLoadingBar from '@/components/share/single/LoadingBar'
Vue.use(UiLoadingBar)
let loadingBar = UiLoadingBar.new()
const cusAxios = axios.create({
  baseURL: process.env.API_HOST,
  timeout: 60 * 1000
})
// cusAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Add a request interceptor
cusAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loadingBar.start()
  return config
}, function (error) {
  // Do something with request error
  loadingBar.close()
  return Promise.reject(error)
})

// Add a response interceptor
cusAxios.interceptors.response.use(function (response) {
  // Do something with response data
  loadingBar.finish()
  if (response.data.msg) {
    Message({ showClose: true, message: response.data.msg, type: 'success' })
  }
  return response
}, function (error) {
  // Do something with response error
  loadingBar.error()
  // alert(error);
  if (error.response) {
    if (error.response.data && error.response.data.msg) {
      Message({ showClose: true, message: error.response.data.msg, type: 'error' })
    } else if (error.response.data && error.response.data.errors) {
      Message({ showClose: true, message: error.response.data.errors, type: 'error' })
    }
    if (error.response.status === 401) {
      Vue.router.push('/login')
    }
  }
  return Promise.reject(error)
})

Vue.axios = cusAxios
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/devise.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  authType: 'devise',
  loginData: { url: process.env.API_HOST + '/auth/sign_in', method: 'POST', redirect: '/' },
  logoutData: { url: process.env.API_HOST + '/auth/sign_out', method: 'DELETE', redirect: '/login' },
  refreshData: { url: process.env.API_HOST + '/auth/validate_token', method: 'GET', enabled: true, interval: 30, atInit: true },
  fetchData: { url: process.env.API_HOST + '/auth/validate_token', method: 'GET', enabled: true }
})

let api = {
  // 注册用户
  createUser (data) { return cusAxios.post(`v1/user`, data) },
  // dic areas
  getDicAreas (params) { return cusAxios.get('dic/areas', {params}) },
  getDicArea (id, params) { return cusAxios.get(`dic/areas/${id}`, {params}) },
  getDicAreaValueTree (id) { return cusAxios.get(`dic/areas/${id}/value_tree`) },
  updateDicArea (id, data) { return cusAxios.put(`dic/areas/${id}`, data) },
  createDicArea (data) { return cusAxios.post(`dic/areas`, data) },
  deleteDicArea: (id) => cusAxios.delete(`dic/areas/${id}`),
  updateDicAreaPosition (id, data) { return cusAxios.put(`dic/areas/${id}/update_position`, data) },
  // dic hospitals
  getDicHospitals (params) { return cusAxios.get('dic/hospitals', {params}) },
  getDicHospital (id, params) { return cusAxios.get(`dic/hospitals/${id}`, {params}) },
  updateDicHospital (id, data) { return cusAxios.put(`dic/hospitals/${id}`, data) },
  createDicHospital (data) { return cusAxios.post(`dic/hospitals`, data) },
  deleteDicHospital: (id) => cusAxios.delete(`dic/hospitals/${id}`),
  // dic hospitals
  getDicLabels (params) { return cusAxios.get('dic/labels', {params}) },
  getDicLabel (id, params) { return cusAxios.get(`dic/labels/${id}`, {params}) },
  updateDicLabel (id, data) { return cusAxios.put(`dic/labels/${id}`, data) },
  createDicLabel (data) { return cusAxios.post(`dic/labels`, data) },
  deleteDicLabel: (id) => cusAxios.delete(`dic/labels/${id}`),
  // dic diseases
  getDicDiseases (params) { return cusAxios.get('dic/diseases', {params}) },
  getDicDisease (id, params) { return cusAxios.get(`dic/diseases/${id}`, {params}) },
  updateDicDisease (id, data) { return cusAxios.put(`dic/diseases/${id}`, data) },
  createDicDisease (data) { return cusAxios.post(`dic/diseases`, data) },
  deleteDicDisease: (id) => cusAxios.delete(`dic/diseases/${id}`),
  updateDicDiseasePosition (id, data) { return cusAxios.put(`dic/diseases/${id}/update_position`, data) },
  // dic organizations
  getDicOrganizations (params) { return cusAxios.get('dic/organizations', {params}) },
  getDicOrganization (id, params) { return cusAxios.get(`dic/organizations/${id}`, {params}) },
  updateDicOrganization (id, data) { return cusAxios.put(`dic/organizations/${id}`, data) },
  createDicOrganization (data) { return cusAxios.post(`dic/organizations`, data) },
  deleteDicOrganization: (id) => cusAxios.delete(`dic/organizations/${id}`),
  updateDicOrganizationPosition (id, data) { return cusAxios.put(`dic/organizations/${id}/update_position`, data) },
  // dic nations
  getDicNations (params) { return cusAxios.get('dic/nations', {params}) },
  getDicNation (id, params) { return cusAxios.get(`dic/nations/${id}`, {params}) },
  updateDicNation (id, data) { return cusAxios.put(`dic/nations/${id}`, data) },
  createDicNation (data) { return cusAxios.post(`dic/nations`, data) },
  deleteDicNation: (id) => cusAxios.delete(`dic/nations/${id}`),
  updateDicNationPosition (id, data) { return cusAxios.put(`dic/nations/${id}/update_position`, data) },
  // admins
  getAdmins (params) { return cusAxios.get('admins', {params}) },
  getAdminFootprints: (adminId, commentId) => cusAxios.get(`admins/${adminId}/footprints`),
  getAdmin (id, params) { return cusAxios.get(`admins/${id}`, {params}) },
  updateAdmin (id, data) { return cusAxios.put(`admins/${id}`, data) },
  updateAdminPassword (id, data) { return cusAxios.put(`admins/${id}/password`, data) },
  createAdmin (data) { return cusAxios.post(`admins`, data) },
  updateAdminPosition (id, data) { return cusAxios.put(`admins/${id}/update_position`, data) },
  deleteAdmin: (id) => cusAxios.delete(`admins/${id}`),
  // workers
  getWorkers (params) { return cusAxios.get('workers', {params}) },
  getWorkerFootprints: (id) => cusAxios.get(`workers/${id}/footprints`),
  getWorker (id, params) { return cusAxios.get(`workers/${id}`, {params}) },
  updateWorker (id, data) { return cusAxios.put(`workers/${id}`, data) },
  createWorker (data) { return cusAxios.post(`workers`, data) },
  deleteWorker: (id) => cusAxios.delete(`workers/${id}`),
  // resumes
  getResumes (params) { return cusAxios.get('resumes', {params}) },
  getResumeFootprints: (id) => cusAxios.get(`resumes/${id}/footprints`),
  getResume (id, params) { return cusAxios.get(`resumes/${id}`, {params}) },
  updateResume (id, data) { return cusAxios.put(`resumes/${id}`, data) },
  createResume (data) { return cusAxios.post(`resumes`, data) },
  deleteResume: (id) => cusAxios.delete(`resumes/${id}`),
  // WorkerComments
  getWorkerComments (workerId, params) { return cusAxios.get(`workers/${workerId}/comments`, {params}) },
  getWorkerCommentFootprints: (workerId, commentId) => cusAxios.get(`workers/${workerId}/comments/${commentId}/footprints`),
  getWorkerComment (workerId, id) { return cusAxios.get(`workers/${workerId}/comments/${id}`) },
  updateWorkerComment (workerId, id, data) { return cusAxios.put(`workers/${workerId}/comments/${id}`, data) },
  createWorkerComment (workerId, data) { return cusAxios.post(`workers/${workerId}/comments`, data) },
  deleteWorkerComment: (workerId, id) => cusAxios.delete(`workers/${workerId}/comments/${id}`),
  // service people
  getServicePeople (params) { return cusAxios.get('service_people', {params}) },
  getServicePersonFootprints: (id) => cusAxios.get(`service_people/${id}/footprints`),
  getServicePerson (id, params) { return cusAxios.get(`service_people/${id}`, {params}) },
  updateServicePerson (id, data) { return cusAxios.put(`service_people/${id}`, data) },
  createServicePerson (data) { return cusAxios.post(`service_people`, data) },
  deleteServicePerson: (id) => cusAxios.delete(`service_people/${id}`),
  // orders
  getOrders (params) { return cusAxios.get('v1/orders', {params}) },
  getOrderFootprints: (id) => cusAxios.get(`v1/orders/${id}/footprints`),
  getOrder (id, params) { return cusAxios.get(`v1/orders/${id}`, {params}) },
  updateOrder (id, data) { return cusAxios.put(`v1/orders/${id}`, data) },
  updateOrderStatus: (orderId, status) => cusAxios.put(`v1/orders/${orderId}/change_status`, {status}),
  createOrder (data) { return cusAxios.post(`v1/orders`, data) },
  deleteOrder: (id) => cusAxios.delete(`v1/orders/${id}`),
  // balances
  getBalances (params) { return cusAxios.get('v1/balances', {params}) },
  getBalancesTradeSymbols (id, params) { return cusAxios.get(`v1/balances/${id}/balance_trade_symbols`, {params}) },

  getCarouselFootprints: (id) => cusAxios.get(`carousels/${id}/footprints`),
  getCarousel (id, params) { return cusAxios.get(`carousels/${id}`, {params}) },
  updateCarousel (id, data) { return cusAxios.put(`carousels/${id}`, data) },
  createCarousel (data) { return cusAxios.post(`carousels`, data) },
  deleteCarousel: (id) => cusAxios.delete(`carousels/${id}`),
  updateCarouselPosition (id, data) { return cusAxios.put(`carousels/${id}/update_position`, data) },
  // roles
  getRoles (params) { return cusAxios.get('roles', {params}) },
  getRoleFootprints: (id) => cusAxios.get(`roles/${id}/footprints`),
  getRole (id, params) { return cusAxios.get(`roles/${id}`, {params}) },
  updateRole (id, data) { return cusAxios.put(`roles/${id}`, data) },
  createRole (data) { return cusAxios.post(`roles`, data) },
  deleteRole: (id) => cusAxios.delete(`roles/${id}`),
  // permissions
  getPermissions (params) { return cusAxios.get('permissions', {params}) },
  getPermissionTree (params) { return cusAxios.get('permissions/index_roots', {params}) },
  getPermissionFootprints: (id) => cusAxios.get(`permissions/${id}/footprints`),
  getPermission (id, params) { return cusAxios.get(`permissions/${id}`, {params}) },
  updatePermission (id, data) { return cusAxios.put(`permissions/${id}`, data) },
  createPermission (data) { return cusAxios.post(`permissions`, data) },
  deletePermission: (id) => cusAxios.delete(`permissions/${id}`),
  // TradeSymbols
  getTradeSymbols (params) { return cusAxios.get('v1/trade_symbols', {params}) },
  updateTradeSymbols (id, data) { return cusAxios.put(`v1/trade_symbols/${id}/toggle_switch`, data) },
  // Upload Image
  uploadImage (fd) { return cusAxios.post('uploader/image', fd) }
}

export default {
  install (Vue, options) {
    Object.defineProperties(Vue.prototype, {
      axios: {
        get () {
          return axios
        }
      },
      cusAxios: {
        get () {
          return cusAxios
        }
      },
      api: {
        get () {
          return api
        }
      }
    })
  }
}
