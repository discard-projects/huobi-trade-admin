export default {
  uploadFile (file, url) {
    return new Promise((resolve, reject) => {
      let fd = new FormData()
      fd.append(file, file)
      
      
      upload.create((error, blob) => {
        if (error) {
          reject(error)
        } else {
          resolve(blob.signed_id)
        }
      })
    })
  }
}
