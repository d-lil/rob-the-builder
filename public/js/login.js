const express = require('express');
const app = express();

app.get('/login',(req, res) => {
   res.render('login');
});

app.post('/login', (req, res) => {
   const { email, password } = req.body;
   if (email === 'email' && password === 'password') {
   res.redirect('/getquote');
   } else {
   res.render('login', { error: 'Invalid email or password' });
   }
});