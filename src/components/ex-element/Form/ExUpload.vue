<template>
  <div style="width: 100px; height: 100px;">
    <span style="display: inline-block; width: 100%; height: 100%; position: relative; overflow: hidden; cursor: pointer">
      <template v-if="url">
        <img @click="previewImage" :src="url" alt="" style="max-width: 100%; max-height: 100px; vertical-align: top;">
        <i class="el-icon-close" @click.stop="deleteImage" style="position: absolute; right: 0; top: 0;"></i>
      </template>
      <template v-else>
        <input type="file" @change="changeInput($event)" style="width: 100%; height: 100%; opacity: 0; position: absolute; z-index: 1; cursor: pointer">
        <span style="border: dotted #ccc 2px; display: inline-block">
          <i class="el-icon-plus" :class="{uploading}" style="font-size: 30px; margin: 33px;"></i>
        </span>
      </template>
    </span>
    <el-dialog width="50%" title="图片预览" :visible.sync="previewDialog" append-to-body>
      <div style="text-align: center">
        <img :src="url" alt="" style="max-width: 100%; max-height: 100%;"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Upload } from 'element-ui'
export default {
  props: {
    value: [String, Array],
    url: [String, Array],
    mutiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploading: false,
      previewDialog: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        if (this.mutiple) {
        } else {
          this.$emit('update:url', nv['link'])
          this.$emit('input', nv['signed_id'])
        }
      }
    }
  },
  methods: {
    changeInput (ev) {
      if (ev.target.files.length) {
        let fd = new FormData()
        fd.append('file', ev.target.files[0])
        this.uploading = true
        this.api.uploadImage(fd).then(({data}) => {
          this.uploading = false
          this.currentValue = data
        }).catch(err => {
          console.error(err)
          this.uploading = false
        })
      }
    },
    previewImage () {
      this.previewDialog = true
    },
    deleteImage () {
      this.currentValue = {link: '', signed_id: ''}
    }
  },
  components: {
    [Upload.name]: Upload
  }
}
</script>

<style lang="scss" scoped>
  .el-icon-close {
    padding: 4px;
    color: #c0c3c9;
    &:hover {
      background: rgba(0, 0, 0, 0.6);
      color: map_get($theme, hover)
    }
  }
  .el-icon-plus {
    &.uploading {
      @include animation-rotate;
      animation: animation-rotate 1s linear infinite;
    }
  }
</style>
