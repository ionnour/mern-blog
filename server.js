const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
//const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

const routes = require('./routes/api')

//DB conection
const URI = process.env.MDB_URI
mongoose.connect(URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
  console.log('Mongoose is connected!');
});


app.use(express.json());
app.use(express.urlencoded({extended: false }));
//app.use(cors());
//https request logger
app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`server is on ${PORT}`));

