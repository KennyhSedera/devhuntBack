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
      cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
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
        const urlimg = `http://localhost:3030/uploads/${req.filename}`
    const body = {
        sujet:req.body.sujet,
        approuvate:req.body.approuvate,
        statut_pub:req.body.statut_pub,
        id_etudiant:req.body.id_etudiant,
        id_domaine:req.body.id_domaine,
        imageUrl:urlimg
    }
    const publication = await Publication.create(body)
    
    
    // 2. Find the Classes row
    const matiereRow = await Matiere.findOne({id_matiere:req.body.id_matiere});
    
    // 3. INSERT the association in Enrollments table
    await publication.addMatiere(matiereRow, { through: pubmatiere })
    .then(data=> {
        res.send({
            success:'Publication ajouté avec succèe '
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