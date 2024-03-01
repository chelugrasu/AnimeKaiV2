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
    const episodeID = req.body.episodeID;
    if(episodeID){
      pool.query('SELECT * FROM episodes WHERE episode_id = ?', [episodeID], (error, resultsEpisode) => {
        if (error) {
          console.error('Error during query:', error);
        }
  
        if (resultsEpisode.length > 0) {
          pool.query('SELECT * FROM series WHERE url_slug = ?', [resultsEpisode[0].series_slug], (error, resultsSeries) => {
            if (error) {
              console.error('Error during query:', error);
            }
            pool.query('SELECT * FROM episodes WHERE series_slug = ?', [resultsEpisode[0].series_slug], (error, resultsEpisodes) => {
                if (error) {
                  console.error('Error during query:', error);
                }
                
                res.json({episodeData: resultsEpisode, seriesData: resultsSeries, episodesData: resultsEpisodes})
              });
          });
        }
      });
    }else{
        return res.status(400).json({ message: 'No series in the URL' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});

module.exports = router;
