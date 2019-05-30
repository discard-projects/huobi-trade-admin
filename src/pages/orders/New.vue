<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="80%">
    <inner-form :form="form" :handler="handler"></inner-form>
  </el-dialog>
</template>

<script>
import innerForm from './_form.vue'
export default {
  data () {
    return {
      dialogVisible: true,
      form: {
        user_id: '',
        worker_id: '',
        contact_name: '',
        contact_mobile: '',
        begin_at: '',
        end_at: '',
        service_person_id: '',
        status: '',
        pay_category: '',
        place_category: '',
        dic_area_id: '',
        dic_area_id_with_parents: [],
        address: ''
      }
    }
  },
  methods: {
    handler () {
      return this.api.createOrder(this.form).then(({data}) => {
        this.$root.owner.fetchData()
        this.$ext.unmount(this)
      })
    }
  },
  components: {
    innerForm
  }
}
</script>
