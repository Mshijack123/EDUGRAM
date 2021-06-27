const express = require('express')
const mysql = require("mysql")
const app = express()
const upload = require('./uploadMiddleware');
const port =300;
const bodyParser = require('./node_modules/body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
const cors = require('cors');

app.use(cors({origin : 'http://127.0.0.1:5500'}));


app.use(express.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "edugram"
});






app.post('/user',urlencodedParser,(req,res)=>{
      
     // var name = req.body.Name;

     // res.send(name);
     // console.log(name)




      var sql = "INSERT INTO posts (name , topic ,time,date,classlink) VALUES ( ? , ? , ? , ? , ?)";

          
      var name = req.body.Name
      var title =req.body.Title 
      var time= req.body.Time 
       var date = req.body.Date 
       var classlink = req.body.link

    
    con.query(sql,[name,title,time,date,classlink], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send("yes");
    });
  
























})

app.get('/posts',(req,res)=>{





         var sql = "Select * from rty";


         con.query(sql, function (err, result) {
              if (err) throw err;
                console.log("result " + result);
                 res.json(result);
         })





       
})



app.post('/imagepost', upload.single('image'), urlencodedParser, function (req, res) {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    

    console.log(file.filename)

    var image = file.filename;
    var name = req.body.name;

    var sql = "INSERT INTO rty (name , image) VALUES ( ? , ? )";



    con.query(sql,[name,image], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      
    });

      


    res.send("<a href='http://127.0.0.1:5500/front-end/main.html'>Click here</a>");

  
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })