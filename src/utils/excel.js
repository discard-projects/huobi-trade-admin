import XLSX from 'xlsx'
export default {
  formatJson (keys, values) {
    return values.map(v => keys.map(k => v[k]))
  },
  generateExcel (elTableDom, excelName = 'data', data = []) {
    // let wsHeader = XLSX.utils.table_to_sheet(elTableDom.querySelector('.el-table__header-wrapper > table'))
    // let wbBody = XLSX.utils.table_to_book(elTableDom.querySelector('.el-table__body-wrapper > table'), {raw: true})
    // // let headerJson = XLSX.utils.sheet_to_json(wsHeader, {header: 1})
    // // XLSX.utils.sheet_add_json(wbBody.Sheets.Sheet1, headerJson, {origin: -1, skipHeader:true})
    // XLSX.utils.book_append_sheet(wbBody, wsHeader)
    // XLSX.writeFile(wbBody, `${excelName}.xlsx`)
    let book = XLSX.utils.table_to_book(elTableDom.querySelector('.el-table__header-wrapper > table'))
    let headerJson = data
    if (!headerJson || !headerJson.length) {
      let wsBody = XLSX.utils.table_to_sheet(elTableDom.querySelector('.el-table__body-wrapper > table'), {raw: true})
      headerJson = JSON.parse(JSON.stringify(XLSX.utils.sheet_to_json(wsBody, {header: 1})))
    }
    console.log(headerJson)
    XLSX.utils.sheet_add_json(book.Sheets['Sheet1'], headerJson, {origin: 'A2', skipHeader: true})
    XLSX.writeFile(book, `${excelName}.xlsx`)
  }
}
