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
const loadHomePageRouter = require('./routes/loadHomePage');
const uploadFilesRouter = require('./routes/uploadFiles');
const loadEpisodesPage = require('./routes/loadEpisodesPage');
const addReviewRoute = require('./routes/addReview');
const loadEpisodeRoute = require('./routes/loadEpisode');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/register', registerRouter);
app.use('/api/verify', verifyRouter);
app.use('/api/login', loginRouter);
app.use('/api/forgotPassword', forgotPasswordRouter);
app.use('/api/resetPass', resetPassRouter);
app.use('/api/isLoggedIn', isLoggedInRouter);
app.use('/api/loadHomePage', loadHomePageRouter);
app.use('/api/uploadFiles', uploadFilesRouter);
app.use('/api/loadEpisodesPage', loadEpisodesPage);
app.use('/api/addReview', addReviewRoute);
app.use('/api/loadEpisode', loadEpisodeRoute);


// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
