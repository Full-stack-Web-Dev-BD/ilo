const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const path=require('path');
const users=require('./routes/users');
const morgan = require('morgan');
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');


const app=express();

const port=process.env.PORT || 5000;
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(passport.initialize());

require('./config/passport')(passport);

//DB config
const db=require('./config/keys').mongoURI;

//MongoDB connect
mongoose
.connect(db,{ useNewUrlParser: true,useUnifiedTopology:true })
.then(()=>console.log('MongoDB connected'))
.catch((err)=> console.log(err));


//use routes
app.use('/api/users',users);
app.use('/api/question',questionRouter)
app.use('/api/answer',answerRouter)


if(process.env.NODE_ENV==='production'){
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {  
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});	
}


app.listen(port,()=>{
	console.log('server is running on port: '+port);
})
