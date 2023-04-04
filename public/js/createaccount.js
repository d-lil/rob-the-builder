const express = require('express');
const app = express();

// render create account page
 app.get('/createaccount',(req, res) => {
    res.render('createaccount');
 });

 app.post('/createaccount', (req, res) => {
    const { email, password, confirmpassword, name, address } = req.body;

// check if passwords match

// check if email is already in use


});