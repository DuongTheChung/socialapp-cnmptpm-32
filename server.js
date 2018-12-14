const express=require('express');
const mongoose=require('mongoose');

//Routes
const user=require('./routes/user.routes');
const auth=require('./routes/auth.routes');
const post=require('./routes/post.routes');

const app = express();

//DB config
const db=require('./config/database').mongoURI;

//Connect mongo
mongoose
    .connect(db)
    .then(()=> console.log('Mongoose connected'))
    .catch(err=>console.log(err));
    

app.get('/',(reg,res)=>res.send('Hello'));


app.use('/api/user',user);
app.use('/api/auth',auth);
app.use('/api/post',post);

const port=process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server running on port ${port}`));