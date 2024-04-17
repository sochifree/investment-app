const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const reg = require('./folder/routes/reg')
const login = require('./folder/routes/login')
const invest = require('./folder/routes/invest')
const balance = require('./folder/routes/balance')

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect('mongodb+srv://sochimahenri:invest@invest.bljzm45.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/reg', reg);
app.use('/login', login);
app.use('/invest', invest);
app.use('/balance', balance);

app.get('/', (req, res)=>{
    console.log('running');
    res.status(200)
});

app.listen(port, ()=>{
    console.log(`speak Lord, your servant is listening on ${port}`)
});
