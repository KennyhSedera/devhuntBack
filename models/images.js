const util = require('util')
const multer = require('multer')
const path = require('path')
const maxSize = 10 * 1024 * 1024
const {Publication, Matiere, pubmatiere} = require('../models/index')

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, __basedir + "/ressources/static/assets/uploads/")
    },
    filename: (req,file,cb)=>{
      cb(null, file.originalname)
    }
})
let uploadFile = multer({
    storage:storage,
    limits:{fileSize:maxSize}
}).single("file")

let uploadFileMiddleWare = util.promisify(uploadFile)

module.exports = {
    uploadFileMiddleWare,
    async register(req, res){
    const publication = await Publication.create(req.body)
    
    
    // 2. Find the Classes row
    const matiereRow = await Matiere.findOne({id_matiere: req.body.id_matiere});
    thenc
    // 3. INSERT the association in Enrollments table
    await publication.addMatiere(matiereRow, { through: pubmatiere })
    .then(data=> {
        res.send({
            success:data
        })
    }) 
    .catch(err=>{
    res.status(500).send({
            error:
            err.message||"Une erreur se produite lors de l'ajout de ce Publication "
        })
    });

    }
}