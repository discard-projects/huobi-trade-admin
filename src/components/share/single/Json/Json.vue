<template>
  <pre class="_ui-json" v-html="cJson"></pre>
</template>

<script>
export default {
  props: {
    json: {
      required: true
    },
    space: {
      type: Number,
      default: 2
    },
    colored: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cJson () {
      let jsonString = JSON.stringify(this.json, function replacer (key, value) {
        return value
      }, this.space)
      if (this.colored) {
        return this.syntaxHighlight(jsonString)
      }
      return jsonString
    }
  },
  methods: {
    syntaxHighlight (jsonString) {
      let json = jsonString.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/g, function (match) {
        var cls = 'pre-number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'pre-key'
          } else {
            cls = 'pre-string'
          }
        } else if (/true|false/.test(match)) {
          cls = 'pre-boolean'
        } else if (/null/.test(match)) {
          cls = 'pre-null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
      })
    }
  }
}
</script>

<style lang="scss">
  @import "styleMix";
  @include ui-json;
</style>
