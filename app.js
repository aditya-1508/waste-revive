const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');


async function main() {

    await mongoose.connect("mongodb://127.0.0.1:27017/cgcfcdDB", {
      useNewUrlParser: true,
    });
    const material_schema = mongoose.Schema({
      img: String,
      type: String,
      quantity: Number,
      unit: String,
      condition: String,
      aleternative: String,
      content: String
    });
    const form_schema = mongoose.Schema({
      company_name: String,
      location: String,
      category: String,
      type: String,
      phone: Number,
      email: String,
      licence_no: String
    });
    const login_schema = mongoose.Schema({
      username: String,
      password: String
    });
    const details = mongoose.model("company_info", form_schema);
    const login_entry = mongoose.model("login_info", login_schema);
    const material_entry = mongoose.model("material_details", material_schema);
    app.get("/register", function(req, res) {
      res.render("register");
    });


    app.post("/register", function(req, res) {
      var companyName = req.body.companyName;
      var loc = req.body.location;
      var cat = req.body.category;
      var indus = req.body.Industry;
      var mob = req.body.phone;
      var mail = req.body.email;
      var lic = req.body.licenceNo;
      console.log(lic);
      res.send(cat);
      const one = new details({
        company_name: companyName,
        location: loc,
        category: cat,
        type: indus,
        phone: mob,
        email: mail,
        licence_no: lic

      });
      details.create(one).then((data) => {
        console.log('entered successfully');
      });
      res.redirect("/shop");

    });

    app.get("/login", function(req, res) {
      res.render("login");
    });
    app.post("/login", function(req, res) {
      var username1 = req.body.username;
      var password = req.body.password;
      const one = new details({
        username: username1,
        password: password
      });
      login_entry.find({
        username: username1
      }).then((data) => {

        console.log(data[0].password);
        if (password === data[0].password) {
          res.redirect("shop");
        } else {
          res.redirect("/login");
        }
      });


    });
    app.get("/user_register", function(req, res) {
      res.render("user_register");
    });
    app.post("/user_register", function(req, res) {
      var username1 = req.body.username;
      var password = req.body.password;
      const one = new login_entry({
        username: username1,
        password: password
      });
      login_entry.create(one).then((data) => {
        console.log("entered succesfully");
      });
      res.redirect("/login");
    });
    app.get("/",function(req,res){
      res.render("index");
    })


    app.get("/shop", function(req, res) {
          var content = [];
          material_entry.find().then((data) => {
            content = data;
            console.log(content);
            man();
          });

          function man() {
            res.render("shop", {
              data_received: content,
              datum:"aditya"
            });
           }
          });
           app.post("/shop", function(req, res) {
             var content = [];
             material_entry.find().then((data) => {
               content = data;
               console.log(content);
               man();
             });

             function man() {
               res.render("shop", {
                 data_received: content,
                 datum:"aditya"
               });
              }
          });
        }
        main();

        app.listen(3000, function() {
          console.log('server started at port 3000');
        });
