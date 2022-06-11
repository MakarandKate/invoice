import express from "express";
import fs from 'fs';
import * as path from 'path';
import * as expressHbs from 'express-handlebars';

const expressApp = express();

const hbs = expressHbs.create({
    helpers: {
        fileMTime:(path:string)=>{
            var mtime = Math.floor(Math.random() * 1000);;
            try{
                var stats = fs.statSync(__dirname.replace(/\/app/g,'/public')+path);
                mtime = (new Date(stats.mtime)).getTime();
            }catch(e){
    
            }
            return mtime;
        }
    },
    defaultLayout: 'layout',
    partialsDir: [path.join(__dirname, 'views/partials')],
    layoutsDir: path.join(__dirname, 'views/layouts'),
    extname: '.hbs',
});

expressApp.set('views', path.join(__dirname, 'views'));
expressApp.engine('.hbs', hbs.engine);
expressApp.set('view engine', '.hbs');

expressApp.get('/',(req,res)=>{
    res.render("./index");
});

expressApp.use(
    express.static(
        path.join(__dirname), 
        {
            maxAge: 0
        }
    )
)

expressApp.listen(3000,()=>{
    console.log("App started @ http://localhost:3000")
})