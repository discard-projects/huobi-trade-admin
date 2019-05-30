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
        name: '',
        kinship: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        self_care: '',
        dic_area_id: '',
        dic_disease_ids: [],
        address: '',
        is_default: false
      }
    }
  },
  methods: {
    handler () {
      return this.api.createServicePerson(this.form).then(({data}) => {
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
