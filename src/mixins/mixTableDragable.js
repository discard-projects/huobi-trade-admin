import Sortable from 'sortablejs'
export default {
  methods: {
    setSortable () {
      const els = document.querySelectorAll('.el-table__body-wrapper > table > tbody')
      const el = els[els.length - 1]
      this.sortable = Sortable.create(el, {
        ghostClass: 'ex-table-sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          let newInex = evt.newIndex
          let oldIndex = evt.oldIndex
          let item = this.mixTableData.items[oldIndex]
          let newPosition = this.mixTableData.items[newInex]['position']
          let oldPosition = this.mixTableData.items[oldIndex]['position']
          // console.log(newInex, oldIndex, '--', newPosition, oldPosition)
          if (this.mixTableData.dragable instanceof Function) {
            this.mixTableData.dragable(item, newPosition, oldPosition)
          }
        }
      })
    }
  }
}
