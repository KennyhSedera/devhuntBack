const path = require('path');
const express = require('express');
const app = express();
const PORT = 3030;
const bodyParser = require('body-parser');
const {sequelize} = require('./models/index');
const etudiantRouter = require('./route/etudiant.route');
const actionRouter = require('./route/action.route');
const anneeunivRouter = require('./route/anneeuniv.route');
const commentaireRouter = require('./route/commentaire.route');
const messageRouter = require('./route/message.route');
const niveauRouter = require('./route/niveau.route');
const parcourRouter = require('./route/parcour.route');
const publicationRouter = require('./route/publication.route');
const matierRouter = require('./route/matier.route');
const domaineRouter = require('./route/domaine.route');
const reponseRouter = require('./route/reponse.route');
const groupeRouter = require('./route/groupe.route');
const GEtudiantRouter = require('./route/reaction.commentaire.route');
const NiveauEtudiantAnneeRouter = require('./route/Niveau_Etudiant_Annee.route');
const dashboardRoute = require('./route/dashboard.route');
const uploadRoute = require('./route/upload.image.route');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


global.__basedir = __dirname

app.set('views', path.join(__dirname,'views'));
var Option = {
    credentials: true,
     origin: '*' // ['http://localhost:8888/', /*'https://frontdevhunt.vercel.app/'*/]
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors(Option));
app.use(morgan('dev'))
app.use(etudiantRouter);
app.use(actionRouter);
app.use(anneeunivRouter);
app.use(commentaireRouter);
app.use(messageRouter);
app.use(niveauRouter);
app.use(parcourRouter);
app.use(publicationRouter);
app.use(matierRouter);
app.use(domaineRouter);
app.use(reponseRouter);
app.use(groupeRouter);
app.use(GEtudiantRouter);
app.use(NiveauEtudiantAnneeRouter);
app.use(dashboardRoute);
app.use(uploadRoute);
app.use(express.static(path.join(__dirname, './ressources/static/assets/')));



sequelize.sync().then(()=> {
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`)
    });
})