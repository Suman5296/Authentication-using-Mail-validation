var nodemailer = require('nodemailer');
const express = require("express");
const bP = require("body-parser");
const hbs = require('hbs');
const path = require('path');
const templatepath = path.join(__dirname,'./templates')
const encoder = bP.urlencoded({ extended: false });  
const port = 5000;
const app = express();

app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatepath);

app.get("/",function(req,res){
    res.render("login");
});
let message = Math.floor(Math.random() * (999999 - 100000) ) + 100000;

app.post("/",encoder,async function(req,res)
{
  let email = req.body.email;
  // console.log(email.value);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'shyam.pankhaniya5@gmail.com',
        pass: 'ubvphiizcurlfxvg'
    }
  });
  
  var mailOptions = {
    from: 'shyam.pankhaniya5@gmail.com',
    // to: 'suman.h.pankhaniya555@gmail.com',
    to: `${email}`,
    subject: 'Sending Email using Node.js',
    text: `${message}`
  };
  
 await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  res.render("checkotp");
})


app.get("/checkotp",(req,res)=>{
    res.render("checkotp");
    console.log("check otp");
})

app.post("/checkotp",async(req,res)=>
{
    let otp = req.body.otp;
    console.log(otp);
    console.log(message);

    if(otp==message)
    {
        res.render("index");
    }
    else{
        res.send("Your OTP is Wrong");
    }
});


app.listen(port,()=>{
  console.log(`file is run on port ${port}`)
});
