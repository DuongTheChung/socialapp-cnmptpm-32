const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const User=require('./Api/routes/user.toutes');
const Post = require('./Api/routes/post.routes');
const Auth= require ('./Api/routes/auth.routes');
const Tran=require('./Api/routes/transaction.routes');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

const db = require("./Api/config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use('/api/users',User);
app.use('/api/auth',Auth);
app.use('/api/posts',Post);
app.use('/api/transaction',Tran);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


  
const port = process.env.PORT || 5000;
  
app.listen(port, () => console.log(`Server running on port ${port}`));