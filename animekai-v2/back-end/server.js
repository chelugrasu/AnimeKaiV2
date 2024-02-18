// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const isLoggedInRouter = require('./routes/isLoggedIn'); // Rename isLoggedIn to avoid confusion
const verifyRouter = require('./routes/verify');
const forgotPasswordRouter = require('./routes/forgotPassword');
const resetPassRouter = require('./routes/resetPass');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/register', registerRouter);
app.use('/api/verify', verifyRouter);
app.use('/api/login', loginRouter);
app.use('/api/forgotPassword', forgotPasswordRouter);
app.use('/api/resetPass', resetPassRouter);
app.use('/api/isLoggedIn', isLoggedInRouter);

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
