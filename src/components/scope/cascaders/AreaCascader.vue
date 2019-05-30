<template>
  <el-cascader v-model="currentValue" value="id" label="name" :options="items" :props="subProps" clearable change-on-select></el-cascader>
</template>

<script>
export default {
  props: {
    value: [Array]
  },
  data () {
    return {
      items: [],
      subProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      allData: {}
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        if (!nv || !nv.length) {
          this.fetchProvinces()
        } else {
          let parentId = nv[nv.length - 1]
          this.fetchChildren(parentId).then(children => {
            this.allData[parentId].children = children
          })
        }
        this.$emit('input', nv)
      }
    }
  },
  methods: {
    fetchProvinces () {
      this.fetchChildren(undefined, 'level_province').then(items => {
        this.items = items
      })
    },
    async fetchChildren (parentId, category) {
      let params = {per_page: 100}
      if (parentId) { params.parent_id = parentId }
      if (category) { params.q_level_eq = category }
      let {data} = await this.api.getDicAreas(params)
      return data.items.map(item => {
        if (item.level !== 'level_district') {
          item.children = []
        }
        this.allData[item.id] = item
        return item
      })
    }
  },
  created () {
    if (this.currentValue && this.currentValue.length) {
      let id = this.currentValue[this.currentValue.length - 1]
      this.api.getDicAreaValueTree(id).then(({data}) => {
        this.items = data.items
      })
    } else {
      this.fetchProvinces()
    }
  }
}
</script>
