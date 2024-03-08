const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const pool = require('../db');

const app = express();

// Enable rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

app.use(limiter);

// Send an email
const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    try {
        const urlUsername = req.body.memberUsername;
        const userName = req.body.userName;
        const isLoggedIn = req.body.isLoggedIn;
        var isOwner = false;
        var isAdmin = false;

        pool.query('SELECT * FROM users WHERE LOWER(username) = LOWER(?)', [urlUsername], (error, resultsUsers) => {
            if (error) {
                console.error('Error during users query:', error);
            }
        
            if (resultsUsers.length === 0) {
                return res.status(400).json({ message: 'Invalid username' });
            }
            var viewedSeries = null;
            var toWatchSeries = null;
            if(resultsUsers[0].username.toLowerCase() === userName.toLowerCase() && isLoggedIn){ isOwner = true; }
            if(resultsUsers[0].adminAcces > 0){ isAdmin = true;}
            if(resultsUsers[0].viewed_series){viewedSeries = JSON.parse(resultsUsers[0].viewed_series)}
            if(resultsUsers[0].towatch_series){toWatchSeries = JSON.parse(resultsUsers[0].towatch_series)}
            var reviews = null;
            var continueWatching = '';

            pool.query('SELECT * FROM reviews WHERE LOWER(reviewer_name) = LOWER(?)', [urlUsername], (error, resultsReviews) => {
                if (error) {
                    console.error('Error during reviews query:', error);
                }
                reviews = resultsReviews
                pool.query('SELECT * FROM series', (error, resultsSeries) => {
                    if (error) {
                        console.error('Error during continue watching query:', error);
                    }
                    if(isOwner){
                        pool.query('SELECT * FROM continuewatching WHERE LOWER(user_name) = LOWER(?)', [urlUsername], (error, resultsContinueWatching) => {
                            if (error) {
                                console.error('Error during continue watching query:', error);
                            }
                            continueWatching = resultsContinueWatching
                            return res.json({ resultsUsers: resultsUsers, isOwner: isOwner, isAdmin: isAdmin, viewedSeries: viewedSeries, toWatchSeriesData: toWatchSeries, reviewsData: reviews, continueWatchingData: continueWatching, seriesData: resultsSeries});
                        });
                    }else{
                        return res.json({ resultsUsers: resultsUsers, isOwner: isOwner, isAdmin: isAdmin, viewedSeries: viewedSeries, toWatchSeriesData: toWatchSeries, reviewsData: reviews, seriesData: resultsSeries});
                    }
                });
            });
        });
    } catch (error) {
      console.error('Error during registration:', error);
    }
});

module.exports = router;