var express = require("express");
var	app = express();
var	bodyParser = require("body-parser");
var mongoose = require("mongoose");
var esri = require("./models/schema.js");
var uri = process.env.URI || "mongodb+srv://sudhanshumohan:hesoyam@cluster0-3z3hj.mongodb.net/hospital_data?retryWrites=true&w=majority";
var port = process.env.PORT || 31000;

mongoose.connect(uri,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true,
	useFindAndModify: false
}).then(()=>{
	console.log("Connected to Database");
}).catch(err =>{
	console.log("ERROR:",err.message);
});

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	esri.find({},function(err,foundObj){
		if(err){
			console.log(err);
		} else {
			res.render("index.ejs",{foundArr:foundObj});
		}
	})
});

app.listen(port, process.env.IP,function(){
    console.log("Server started at port:"+ port);
})

