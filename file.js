var express = require("express");
var http = require("http");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");



mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://test:<password>@cluster1-qt7ol.mongodb.net/test?retryWrites=true");

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine" ,"ejs")

app.get("/",(req,res,next)=>{
    res.render("form");

})
//app.use(express.urlencoded())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    phoneNumber:String,
    password:String,
    male:String,
    female:String
})

var User = mongoose.model("User", userSchema);
app.post('/submit',(req,res,next)=>{
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Item saved to database");
        })
        .catch(err => {
            res.status(400).send("item not saved");
        });
    // var firstName = req.body.firstName;
    // var lastName = req.body.lastName;
    // var password = req.body.password;
    // var phoneNum = req.body.phoneNumber;
    // var male = req.body.male;
    // var female = req.body.female;
    // if(male){
    //     var value = "Male"
    // }else if (female){
    //     var value = "female"
    // }
    //     res.render("index", {
    //     firstName : firstName,
    //     lastName : lastName,
    //     phone: phoneNum,
    //     password: password,
    //     gender: value
    // })
    // res.end()
});
// app.get("/submit-form", (req,res)=>{
//     res.render("index", {
//         firstName : firstName,
//         lastName : lastName,
//         phone: phoneNum,
//         password: password,
//         male : male,
//         female: female
//     })
// })
// app.get("/",(req,res)=>{
//     res.send("hellow world")
// })
// app.get("/home",(req,res)=>{
//     res.send("This is my homepage")
// })
app.listen(3000,()=>{
    console.log("server started")
})
