const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {sequelize} = require('./model/index');
const route = require('./route/route');
const cors = require('cors');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const PORT = 8080;


app.set('views', path.join(__dirname,'views'));
var Option = {
    credentials: true,
    origin:  ['http://localhost:8081', 'http://localhost:8082']
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());

app.use(cors(Option));
app.use(morgan('dev'))
app.use(route);
// app.use('/Images', express.static('./Images'))



sequelize.sync().then(()=> {
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`)
    });
})