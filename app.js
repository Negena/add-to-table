const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const multer = require("multer");
const ejs = require("ejs");



const app = express();
const upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));



app.set("view engine", 'ejs');


mongoose.connect("mongodb+srv://user1:useronce@todo.ezpvz.mongodb.net/msg", {useNewUrlParser: true,
useUnifiedTopology: true}, function(err){
    if (err) throw err;
    else console.log("db connected");
});

const tables = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   msg: String
});

let Table = mongoose.model("Table", tables );

app.get("/",  (req,res) => {
  Table.find({}, function(err, data){
    if (err) throw err;
    else res.render('index', {data: data})
  })
});

app.post("/msg",(req, res, next) =>{
  const newMsg = new Table({
    _id : new mongoose.Types.ObjectId(),
    name: req.body.name,
    msg: req.body.msg
  })
  newMsg.save(newMsg)
  .then(doc => {
    res.redirect("/")
  })
  .catch(err => {
    throw err
  })
});

app.get('/del/:id', (req,res) => {
  let id = req.params.id;
  Table.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) throw err;
    else {
      res.redirect("/")
    }
  });
});

app.get("/edit/:id", (req,res) => {
  let id = req.params.id;
  Table.findById(req.params.id, function(err, data){
    if (err) throw err ;
    else res.render('edit', {qs: data})
  });
});


app.listen(3000, () => {
  console.log('works...')
});
