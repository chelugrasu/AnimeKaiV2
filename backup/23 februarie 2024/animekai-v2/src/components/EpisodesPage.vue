<template>
    <div class="background">
        <div class="headerPhoto"><img class="headerPhoto" :src="getSeries('getHeaderImageUrl',series[0])" loading="lazy"><div class="coverHeaderPhoto"></div></div>
        <img class="posterPhoto" :src="getSeries('getPosterImageUrl',series[0])" loading="lazy">
        <p class="seriesTitle">{{ getSeries('getTitle', series[0]) }}</p>
        <div class="Details">
              <p>{{ getSeries('getGenres', series[0]) }}</p>
              <div class='smallLine'></div>
              <div class="rating" style="margin-left: 1.5vh;">
                <font-awesome-icon v-for="star in 5" :key="star" class="star" :style="{ color: getSeries('getStarColor', series[0], star) }" :icon="['fas', 'star']" size="sm" />
              </div>
              <div class='smallLine'></div>
              <div class="releaseYear" style="margin-left: 1.5vh;">{{ getSeries('getReleaseYear', series[0]) }}</div>
              <div class='smallLine'></div>
        </div>
        <div class="episodesButton" id="addListButton" @click='getVideoIdFromDiv("")'>
            <font-awesome-icon :icon="['fas', 'square-plus']" style="padding-right: 8px; margin-top: -1px; width: 18px; height: 18px;" />
            <p>Adauga în lista de vizionare</p>
        </div>
        <div class="episodesButton" id="shareButton">
            <font-awesome-icon :icon="['fas', 'share-from-square']" style="padding-right: 8px; margin-top: -1px; width: 18px; height: 18px;" />
            <p>Distribuie</p>
        </div>
        <div class="aboveMiddlePart">
          <div class="middlePart">
            <div class="description-container">
              <p>{{ getSeries('getDescription', series[0]) }}</p>
            </div>
            <div class="readMore">Read more</div>

            <div>
              <div :class="{seasonSelector : true, seasonSelectorActive: seasonSelectorActive}" @click="toggleSeasonSelector">
                <p>{{ getSeason(this.season,activeSeasonIndex) }}</p>
                <font-awesome-icon :class="{rotateArrow: seasonSelectorActive}" style="position: relative; right: -45px; transition: 0.3s ease;" :icon="['fas', 'chevron-down']" />
              </div>
              <div :class="{seasonsContainer: true, showSeasonsContainer: seasonSelectorActive}">
                <div
                  v-for="(season, index) in seasons"
                  :key="index"
                  :class="{ seasonContainer: true, activeSeason: activeSeasonIndex === index }"
                  @click="setActiveSeason(index)"
                >
                  <p>{{ getSeasonTitle(season) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="episodesList">
            <div v-for="(episode, index) in episodes" :key="index" class="episode" >
              <div class='episodeVideo'>
              <div style="position: relative; padding-top: 56.25%;"><iframe :src="`https://iframe.mediadelivery.net/embed/${getId(getVideoIdFromDiv(episode.video_url))}?autoplay=false`"  loading="lazy" style="border: none; border-radius: 4.65px; position: absolute; top: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>                
              </div>
              <p class="episodeTitle">{{ episode.episode_title }}</p>
            </div>
        </div>
        </div>

    </div>
  </template>
  
  <script>

export default {
  name: 'EpisodesPage',
  data() {
    return {
      seasonSelectorActive: false,
      activeSeasonIndex: 0,
      seasons: [],
      series: [],
      episodes: []
    };
  },
  methods: {
    getSeries(type, series, star){
      if(series){
        if(type === 'getStarColor'){
          return star <= series.rating ? 'yellow' : 'gray'; // Adjust colors as needed
        }else if(type === 'getReleaseYear'){
          return new Date(series.release_date).getFullYear();
        }else if(type === 'getHeaderImageUrl'){
          const headerPhoto = `${series.header_photo}.jpg`;
          let imageUrl;

          try {
            imageUrl = require(`@/assets/headerPhotos/${headerPhoto}`);
          } catch (error) {
            console.error('File does not exist:', error);
            // Fallback to a default image if the specified photo does not exist
            imageUrl = require(`@/assets/headerPhotos/photoInexistent-headerPhoto.jpg`);
          }
          return imageUrl;
        }else if(type ==='getPosterImageUrl'){
          const posterPhoto = `${series.poster_photo}.jpg`;
          let imageUrl;

          try {
            imageUrl = require(`@/assets/posterPhotos/${posterPhoto}`);
          } catch (error) {
            console.error('File does not exist:', error);
            // Fallback to a default image if the specified photo does not exist
            imageUrl = require(`@/assets/headerPhotos/photoInexistent-headerPhoto.jpg`);
          }

          return imageUrl;
        }else if(type ==='getGenres'){
            try {
            const genres = JSON.parse(series.genre);
            if (typeof genres !== 'object') {
              throw new Error('Genres is not an object');
            }
            return Object.values(genres).join(', ');
          } catch (error) {
            console.error('Error parsing genres:', error);
            return ''; // Return an empty string or handle the error as needed
          }
        }else if(type === 'getTitle'){
          return series.title
        }else if(type === 'getDescription'){
          return series.description
        }
      }
    },
    toggleSeasonSelector() {
      this.seasonSelectorActive = !this.seasonSelectorActive;
    },

    setActiveSeason(index) {
      this.activeSeasonIndex = index;
      this.toggleSeasonSelector(); // Optional: Close the season selector after selecting a season
    },
    getVideoIdFromDiv(divContent) {
      /* eslint-disable-next-line no-useless-escape */
      const regex = /\/embed\/([^\/?#]+\/[^\/?#]+)\??/;
      const match = divContent.match(regex);
      if (match) {
        return match[1]; // Return the captured video ID
      } else {
        return null; // Return null if no match found
      }
    },
    getId(videoId) {
      return videoId
    },
    getSeason(seasons, index){
      if(seasons){
        console.log(seasons)
        const season = seasons[index]
        const seasonTitle = season.title
        return seasonTitle
      }
    },
    getSeasonTitle(season){
      if(season){
        return season.title
      }
    }
  },
  async created() {
    // Access the dynamic segment from the route parameters
    const seriesName = this.$route.params.episodesPage;
    // Check if the dynamic segment matches the desired series name
    if (seriesName) {
        try{
            const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/loadEpisodesPage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seriesName })
            });
            if (response.ok) {
              const data = await response.json();
              const seriesData = data.seriesData
              const episodesData = data.episodesData
              this.episodes = episodesData
              this.series = seriesData
              const seasons = JSON.parse(seriesData[0].seasons);
              this.seasons = Object.entries(seasons).map(([title, season]) => ({ title, season }));

            }
        } catch(error){
            console.error('Error fetching data:', error);
        }
    }
  },
}
  </script>
  
  <style scoped>
.background {
    position: fixed; /* Use fixed position to cover the entire viewport */
    top: 0;
    left: 0;
    width: 100%; /* Set width to cover the entire viewport */
    bottom: 0; /* Position the background at the bottom of the viewport */
    overflow: auto; /* Enable scrolling if content exceeds viewport height */
    background-image: 
    radial-gradient(circle at center, rgba(255,255,255,.005) 0, rgba(255,255,255,0.005) 1px, transparent 1px),
    linear-gradient(to right, rgba(255,255,255, 0.01) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255, 0.01) 1px, transparent 1px);
    background-size: 50px 50px;
    background-color: #141414;
}


  .headerPhoto{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 83vh;
    width: 100%;
    object-fit: cover;
    object-position: center center;
    /* background-image: url(../assets/headerPhotos/solo-leveling-headerPhoto.jpg); */
  }
  .coverHeaderPhoto{
    position: relative;
    left: 0vh;
    top: 0vh;
    width: 100%;
    height: 100%;
    background: rgb(20,20,20);
    background: linear-gradient(0deg, rgba(20,20,20,1) 1%, rgba(0,0,0,0) 100%);
  }

  .posterPhoto{
    position: absolute;
    top: 590px;
    left: 350px;
    width: 262px;
    height: 392px;
    object-fit: cover;
    object-position: center center;
    outline: 0.2px solid rgba(255,255,255,0.1);
  }
  
  .seriesTitle{
    position: absolute;
    top: 605px;
    left: 670px;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 65px;
  }
  .Details{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 19px;
    color: rgba(255,255,255,.8);
    position: absolute;
    top: 750px;
    left: 670px;
    display: flex; /* Use flexbox */
    align-items: center; /* Align items vertically */
  }
  .smallLine {
  width: 1.5px;
  height: 21px;
  border-radius: 150px;
  background-color: rgb(128, 128, 128, 0.5);
  margin-left: 16px; /* Adjust spacing between text and line */
}
.star{
  margin-right: 4px;
}

.episodesButton{
    position: absolute;
    background-color: transparent;
    border-radius: 4.65px;
    outline: 2px solid rgba(255,255,255, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 15px;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
}

#addListButton{
    top: 830px;
    left: 670px;
    width: 240px;
    height: 60px;
}
#shareButton{
    top: 830px;
    left: 930px;
    width: 140px;
    height: 60px;
}
.episodesButton:hover{
    background-color: rgba(20,20,20,.5);
    outline: 2px solid var(--primary-color);
    color: var(--primary-color);
    filter: drop-shadow(0px 0px 5px var(--primary-color));
}

.aboveMiddlePart{
  position: absolute;
  display: flex;
  flex-direction: column; /* Align items in a column */
  top: 900px;
  left: 670px;
}

.middlePart {
  display: flex;
  flex-direction: column; /* Align items in a column */
  border-bottom: 1px solid rgb(255,255,255,.1);
  padding-bottom: 30px;
}

.description-container {  
  color: white;
  width: 850px;
  height: auto;
  line-height: 1.7;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: white;
  margin-bottom: 10px;
}

.readMore {
  width: 85px;
  height: 30px;
  margin-top: 0px;
  color: var(--primary-color);
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 17px;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: 0.3s ease;
  cursor: pointer;
}

.readMore:hover{
  transform: translateY(-5px) scale(1.1);
}

.seasonSelector{
  display: flex;
  margin-top: 10px;
  width: 220px;
  height: 60px;
  background-color: rgba(40,40,40, 0.5);
  color: white;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  border-radius: 4.65px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.3s ease;
  user-select: none;
}

.seasonSelector:hover:not(.showSeasonsContainer){
  border: 2px solid white;
  filter: drop-shadow(0px 0px 5px rgb(175, 175, 175));
}


.seasonSelectorActive{
  filter: drop-shadow(0px 0px 5px var(--primary-color));
}
.rotateArrow{
  transform: rotate(180deg);
}


.seasonsContainer{
  position: absolute;
  transition: 0.3s ease;
  clip-path: inset(0 0 100% 0);
  width: 220px;
  max-height: 372px;
  height: auto;
  overflow-y: scroll;
  z-index: 1000;
  background-color: rgb(20, 20, 20, .9);
}

.showSeasonsContainer{
  clip-path: inset(-5% -5% -5% -5%);
}

.seasonContainer{
  position: relative;
  top: 0px;
  left: 5px;
  width: 204px;
  height: auto;
  background-color: rgba(40,40,40,0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4.65px;
  margin-top: 10px;
  filter: drop-shadow(0px 0px 3px rgb(175, 175, 175));
  transition: 0.3s ease;
}

.seasonContainer:hover{
  filter: drop-shadow(0px 0px 5px var(--primary-color));
}


.season{
  width: 100%;
  height: 30px;
  flex-grow: 0; /* Prevent items from growing */
  text-align: center;
}

.activeSeason{
  transform: scale(1.05);
  filter: drop-shadow(0px 0px 5px var(--primary-color));
}


.episode{
  width: 100%;
  height: 300px;
  border-bottom: 1px solid rgb(255,255,255,.1);
  display: flex;
  align-items: center;
}

.episodeVideo{
  position: relative;
  width: 400px;
  height: auto;
  left: 20px;
}

.episodeTitle{
  position: relative;
  left: 50px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  color: white;
}
  </style>
  