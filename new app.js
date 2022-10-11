//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
 
const mongoose = require("mongoose");

   
   const app = express();
 
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/TODOLIST",{useNewUrlParser:true});

 const itemsSchema = {
  name: String
 };

 const Item = mongoose.model("Item",itemsSchema);


 const item1 = new Item({
 name:"Welcome to your TodoList !"
 });


 const item2 = new Item({
  name:"Hit the + button to add a new item."
  });


  const item3 = new Item({
    name:"<-- Hit this to delete this item."
    });


     const defaultItems = [item1,item2,item3];
   


     app.get("/", function (req, res) {
   
    Item.find({},function(err,foundItems){

             if(foundItems.length===0){
                       Item.insertMany(defaultItems,function(err){
             if(err){
                       console.log(err);
                    }
             else{
                       console.log("Successfully saved the defaultItems to dataBase.!")
                 }
          });
          res.redirect("/");
             }
             else {
              res.render("List", { listTitle : "Today" ,newlistitems: foundItems});
             }
            });
          
          });

 app.post("/",function(req,res){
    let item = req.body.newitem;
    if(req.body.list==="work"){
        workitems.push(item);
        res.redirect("/work");
    }
   else {
    items.push(item);
    res.redirect("/");
   }

 
 });

 app.get("/work",function(req,res){
    res.render("List",{listTitle:"work List",newlistitems:workitems});
 })

 app.post("/work",function(req,res){
    let item = req.body.newitem;
    workitems.push(item);
 res.redirect("/work");
 });

app.listen(3000, function () {
    console.log("server is running on port 3000");
});
