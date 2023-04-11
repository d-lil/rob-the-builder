const loginFormHandler = async (event) => {
   event.preventDefault();
 
   const email = document.querySelector('#email-login').value.trim();
   const password = document.querySelector('#password-login').value.trim();
 
   if (email && password) {
     const response = await fetch('/api/users/login', {
       method: 'POST',
       body: JSON.stringify({ email, password }),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       document.location.replace('/profile');
     } else {
       alert(response.statusText);
     }
   }
 };
 
 const signupFormHandler = async (event) => {
   event.preventDefault();
 
   const name = document.querySelector('#name-signup').value.trim();
   const email = document.querySelector('#email-signup').value.trim();
   const password = document.querySelector('#password-signup').value.trim();
 
   if (name && email && password) {
     const response = await fetch('/api/users', {
       method: 'POST',
       body: JSON.stringify({ name, email, password }),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       document.location.replace('/profile');
     } else {
       alert(response.statusText);
     }
   }
 };
 
 document
   .querySelector('.login-form')
   .addEventListener('submit', loginFormHandler);
 
 document
   .querySelector('.signup-form')
   .addEventListener('submit', signupFormHandler);
 

// const express = require('express');
// const app = express();

// app.get('/login',(req, res) => {
//    res.render('login');
// });

// app.post('/login', (req, res) => {
//    const { email, password } = req.body;
//    if (email === 'email' && password === 'password') {
//    res.redirect('/getquote');
//    } else {
//    res.render('login', { error: 'Invalid email or password' });
//    }
// });