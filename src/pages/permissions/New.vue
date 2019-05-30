<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="80%">
    <inner-form :form="form" :handler="handler"></inner-form>
  </el-dialog>
</template>

<script>
import innerForm from './_form.vue'
export default {
  props: {
    item: {
      required: false
    }
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        name: '',
        api: '',
        parent_id: ''
      }
    }
  },
  watch: {
    item: {
      handler (nv) {
        if (nv) {
          this.form.parent_id = nv.id
        }
      },
      immediate: true
    }
  },
  methods: {
    handler () {
      return this.api.createPermission(this.form).then(({data}) => {
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
