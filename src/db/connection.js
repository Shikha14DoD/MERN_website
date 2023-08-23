const mongoose=require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/myWebsite',{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    console.log("Connection successfully established");
})
.catch((e)=>{
    console.log("Exception occured while connecting to db:",e);
});
