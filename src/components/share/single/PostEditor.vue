<template>
  <div class="post-editor bg-white">
    <quill-editor ref="myTextEditor" v-model="currentValue" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)"></quill-editor>
  </div>
</template>

<script>
/* eslint-disable */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor, Quill} from 'vue-quill-editor'
// import { ImageDrop } from 'quill-image-drop-module'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/ImageExtend', ImageExtend)
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          // imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
              maxWidth: '100%'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          },
          ImageExtend: {
            loading: true,
            name: 'file',
            size: 0.5,
            sizeError: () => { alert('图片大小不能超过300k') },  // 图片超过大小的回调
            action: `${process.env.API_HOST}/uploader/image`,
            response: (res) => {
              return res.link
            }
          }
        }
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal)
      }
    },
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
    onEditorBlur (quill) {
//      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
//      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
//      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
//      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss">
.post-editor {
  min-height: 500px;

  .ql-editor {
    height: 500px;
  }

  .ql-picker {
    line-height: 0;

    .ql-picker-item {
      line-height: 28px;
    }
  }
}
</style>
