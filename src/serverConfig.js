import express from'express'; 
import expressLayouts  from'express-ejs-layouts'; 
import path  from 'path'; 
import {fileURLToPath} from 'url';
import morgan from 'morgan'; 
import flash  from'connect-flash'; 
import session  from'express-session'; 
import passport  from'passport'; 
import MongoStore  from 'connect-mongo'; 
import router from'./routes/index.routes.js'; 
import userRouter from'./routes/usuarios.routes.js'; 
import recetasRouter from'./routes/recetas.routes.js'; 


const __filename = fileURLToPath(import.meta.url); 

const __dirname = path.dirname(__filename); 

import './database.js';
import './config/passport.js';


const app = express(); 


app.use(morgan('dev')); 
app.set('port', process.env.PORT || 3000); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public')); 
app.use('public', express.static(path.join(__dirname, 'public'))); 
app.use(expressLayouts); 

app.set('view engine', '.ejs'); 
app.set('views', path.join(__dirname, 'views/pages')); 
app.set('layout', '../layouts/main'); 



app.use(express.urlencoded({extended: false}));


app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://admin:SYsPLTF3cIPI16pS@cluster0.mh3vj.mongodb.net/recetasapp?retryWrites=true&w=majority"}), 
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("."));
app.use(express.json());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
});

app.use('/', router); 
app.use('/', userRouter); 
app.use('/recetas', recetasRouter); 

export default app; 