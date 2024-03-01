const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const pool = require('../db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

// Enable rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

app.use(limiter);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "cheluakagrasu@gmail.com",
    pass: "wYIrCmMk6hp7d2b8",
  },
});

// Send an email
const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  try {
    const username = req.body.usernameValue
    const email = req.body.emailValue
    const password = req.body.passwordValue
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if(username.length >= 3){
        var validEmail = /\S+@\S+\.\S+/;
        if(email.match(validEmail)){
          var validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,25}$/
          if(password.match(validPassword)){
            pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
              if (error) {
                console.error('Error during query:', error);
                return res.status(500).json({ message: 'Registration failed' });
              }
        
              if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                  if (results[i].username === username) {
                    return res.status(400).json({ message: 'Username is not available' });
                  }
                  if (results[i].email === email) {
                    return res.status(400).json({ message: 'Email is not available' });
                  }
                }
              }
                const token = crypto.randomBytes(20).toString('hex'); 
                const insertQuery = 'INSERT INTO users (username, email, password, verify_token) VALUES (?, ?, ?, ?)';
                pool.query(insertQuery, [username, email, hashedPassword, token]);
                transporter.sendMail({
                  from: 'noreply.animekai@gmail.com',
                  to: email,
                  subject: 'Validare cont AnimeKai.ro',
                  text: `Apăsați următorul link pentru validarea contului dumneavoastră: http://localhost:8080/verify?token=${token}`
                }, (error, info) => {
                  if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending verification email' });
                  }
                  console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'Registration Succesful' });
              });
              
            });
          }else{
            return res.status(400).json({ message: 'Password is not correct' });
          }
        }else{
          return res.status(400).json({ message: 'Email is not correct' });
        }
    }else{
      return res.status(400).json({ message: 'Username is too small' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});

module.exports = router;
