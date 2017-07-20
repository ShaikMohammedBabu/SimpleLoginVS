var express = require('express');
var router = express.Router();
var session = require('express-session');

//secret key
router.use(session({
    secret:"It is a secret cookie 1",
    resave:true,
    saveUninitialized : true,
    secure : true
}));

//-----------------
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MongoDatabase3";
var mydb;
var m1,m2;


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    mydb = db;

    //var myobj = { name: "Ajeet Kumar", age: "28", address: "Delhi" };
  /*
   */
});
//------------------------
var o2={},o1={};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',check: false});
});
router.get('/login', function(req, res){
    if(req.session.user_email){
        res.redirect('/')//if session is created then if he opens the other tab with /login then it move to the /
    }
    else{
         res.render('login',{check:false});
    }
});
router.get('/register', function(req, res){
  res.render('register',{check:false});
});

router.get('/logout',function(req,res){
    console.log(req.session.user_email + " session destroyed");
    req.session.destroy();
    res.redirect('/');
})
router.get('/home', function(req, res){
    if(req.session.user_email){
        res.render('home',{user:req.session.user_email,check:'true'});
    }
    else{
        res.redirect('/login');
    }
  
});
router.post('/letmein', function(req, res){
  console.log(req.body);
  o2={
    user_email : req.body.username,
    user_password : req.body.password
  };

   var flag2=0;
    //result=res;//no need
    m1=o2.user_email;
    mydb.collection("Users2").findOne({user_email:o2.user_email,user_password:o2.user_password},function(err,result){
        if(err) throw err;
        else if(result){
            flag2=1;
        }

        if(!flag2){
            res.send({msg:"Sorry User Doesn't Exist", error: true});
        }
        else{
            mydb.collection("Tasks2").find({mail1:m1}).toArray(function(err,result){//this method is no need
                if(err) throw err;
                console.log("user data--->\n" + result);//it prints empty
                req.session.user_email=m1; //creating session to the email of the user                              
                console.log(req.session.user_email + " session created");

               // res.send({uname:req.session.user_email,tasks:result});
               res.send({msg:"Login Successful",error:false});
                //res.render("sample",{uname:req.session.mail,tasks:result});

            });
        }

    });
 // res.send({login:true});
});
router.post('/addmyuser', function(req, res){
  console.log(req.body);
  o1={
    user_firstname : req.body.firstname,
    user_lastname : req.body.lastname,
    user_username : req.body.username,
    user_email : req.body.email,
    user_url : req.body.url,
    user_telephone : req.body.telephone,
    user_password : req.body.password,
    user_mobile : req.body.mobile,
    user_birthday : req.body.birthday,
    user_gender : req.body.gender,
    user_terms : req.body.terms
  };

  var flag=0;

    mydb.collection("Users2").findOne({user_email:o1.user_email},function(err,result){
        if(err) throw err;
        else if(result){
            flag=1;

        }
        if(!flag){res.redirect("/");
            mydb.collection("Users2").insertOne(o1, function(err, res) {
                if (err) throw err;
                console.log("1 record inserted");



            });
        }
        else { res.redirect("/register");console.log(" User Already Exist");}
    });

  //res.send({register:true});
});

module.exports = router;
