const uploadFile = require("../models/images")
const fs = require('fs')

const upload = async (req,res, next) =>{
    try{
        await uploadFile.uploadFileMiddleWare(req,res)
        if(req.file === undefined){
            return res.status(400).send({error:'Fichier vide'})
        }
        next();
    }catch(err){
        console.log(err ||'Le fichier ne peut pas être téléchargé!')
        res.status(500).send({ 
            error:'Le fichier ne peut pas être téléchargé!'
        })
    }
}
const getListFiles = (req,res)=>{
    const directoryPath = __basedir +'\\ressources\\static\\assets\\uploads\\'
    fs.readdir(directoryPath,function(err,files){
        if(err){
            console.log(err)
            res.status(500).send({
                message:'Impossible de lire les fichiers!'
            })
        }
        let fileInfos = []
        files.forEach(file => {
            fileInfos.push({
                name:file,
                url:directoryPath+file
            })
        });
        res.send(fileInfos)
    })
}
const download = (req,res) =>{
    const fileName = req.params.name
    const directoryPath = __basedir + "/ressources/static/assets/uploads"

    res.download(directoryPath+fileName,fileName,(err)=>{
        if (err) {
            res.status(500).send({
                message:"Impossible de télécharger ce fichier"
            })
        }
    })
}

module.exports = {
    upload,
    getListFiles,
    download
} 

