const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/api/exercises',exercisesRouter);
app.use('/api/users',usersRouter);

app.use(express.static('../build'));

app.listen(port,()=>{
    console.log('Server is running at port :'+port);
});