const express = require('express');
const app = express();

// render login page
 app.get('/login',(req, res) => {
    res.render('login');
 });

 app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
// check user and password
   if (email === 'email' && password === 'password') {
   res.redirect('/getquote');
   } else {
   res.render('login', { error: 'Invalid email or password' });
    }
});