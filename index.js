const express=require('express');
const hbs=require('hbs');
const path=require('path');
require('./src/db/connection');
const User=require('./src/models/Model');

const PORT=process.env.PORT||3000;

const app=express();

app.use(express.json());
app.set('view engine','hbs');
const staticPath=path.join(__dirname,'./public');


app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
const templatePath=path.join(__dirname,'./template/views');
const partialsPath=path.join(__dirname,'./template/partials');
const bootstrapCSSPath=path.join(__dirname,'./node_modules/bootstrap/dist/css');
const bootstrapJSPath=path.join(__dirname,'./node_modules/bootstrap/dist/js');
const bootstrapJqueryPath=path.join(__dirname,'./node_modules/jquery');
app.use('/css',express.static(bootstrapCSSPath));
app.use('/js',express.static(bootstrapJSPath));
app.use('/jq',express.static(bootstrapJqueryPath));
app.set('views',templatePath);
hbs.registerPartials(partialsPath);



app.get('/',(req,res)=>{

    res.render('index');
})

app.post('/contact',async(req,res)=>{

    try{
        const userData= await new User(req.body);
        const savedUserData=await userData.save();
        res.status(201).render('index');
        // res.send("Saved data successfully");
    }
    catch(error){
      res.status(500).send(error);
    }
})

app.listen(PORT,()=>{
    console.log("server is lisening at port",PORT);
})
