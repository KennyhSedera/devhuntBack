const util = require('util')
const multer = require('multer')
const maxSize = 10 * 1024 * 1024

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, __basedir + "/ressources/static/assets/uploads/")
    },
    filename: (req,file,cb)=>{
      cb(null,file.originalname)
    }
})
let uploadFile = multer({
    storage:storage,
    limits:{fileSize:maxSize}
}).single("file")

let uploadFileMiddleWare = util.promisify(uploadFile)
module.exports = uploadFileMiddleWare