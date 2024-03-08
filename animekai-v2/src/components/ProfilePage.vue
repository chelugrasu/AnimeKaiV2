<template>
    <div class="background">
        <div class="leftPanel">
            <div class="profileImage">
                <img v-if="isOnPage" class="profilePicture" :src="getProfilePicture(this.profileData.memberUsername)" loading="lazy">
                <div class="darkCover"></div>
                <div class="bottomBar">
                    <p>{{ this.profileData.memberUsername }}</p>
                </div>
            </div>

            <div class="leftPanelContainer">
                <p class="containerTitle">Membru din:</p>
                <p class="containerSubTitle">{{ profileData.registerDate }}</p>
                <font-awesome-icon class="containerIcon" :icon="['fas', 'calendar-days']" size="xl"/>
            </div>
            <div class="leftPanelContainer">
                <p class="containerTitle">Despre mine</p>
                <p class="containerSubTitle">{{ profileData.aboutMe }}</p>
            </div>
        </div>
        <div class="middlePanel">
            <div class="buttons">
                <div class="allButtons">
                    <div :class="{'buttonContainer': true, 'buttonContainer-active': activeButton === 'watchedSeries'}" @click="changeContent('watchedSeries')">
                        <p>Serii vizionate <span v-if="activeButton == 'watchedSeries'" class="buttonCounter">{{ this.watchedSeries.length }}</span></p>
                    </div>
                    <div :class="{'buttonContainer': true, 'buttonContainer-active': activeButton === 'reviews'}" @click="changeContent('reviews')">
                        <p>Recenzii <span v-if="activeButton == 'reviews'" class="buttonCounter">{{ this.reviews.length }}</span></p>
                    </div>
                    <div v-if="isUserOwner" :class="{'buttonContainer': true, 'buttonContainer-active': activeButton === 'continueWatching'}" @click="changeContent('continueWatching')">
                        <p>Continuă vizionarea <span v-if="activeButton == 'continueWatching'" class="buttonCounter">{{ this.continueWatching.length }}</span></p>
                    </div>
                    <div v-if="isUserOwner" :class="{'buttonContainer': true, 'buttonContainer-active': activeButton === 'watchList'}" @click="changeContent('watchList')">
                        <p>Listă de vizionare <span v-if="activeButton == 'watchList'" class="buttonCounter">{{ this.watchList.length }}</span></p>
                    </div>
                    <div v-if="isUserTeam" :class="{'buttonContainer': true, 'buttonContainer-active': activeButton === 'teamWork'}" @click="changeContent('teamWork')">
                        <p>Implicare <span v-if="activeButton == 'teamWork'" class="buttonCounter">{{ this.teamWork.length }}</span></p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div v-for="(content, index) in currentActiveContent" :key="index" style="height: auto; margin-top: 0px;">
                    <!-- Watched Series Container -->
                    <div v-if="activeButton === 'watchedSeries'" class='contentContainer' @click="redirect(`/${series[findSeriesIndex(content)].url_slug}`)">
                        <img class="contentPicture" :src="getHeaderImage(series[findSeriesIndex(content)].header_photo)" loading="lazy">
                        <div class="contentBottom">
                            <p class="contentTitle">{{ series[findSeriesIndex(content)].title }}</p>
                            <p class="contentSubTitle">{{ getSeriesGenres(series[findSeriesIndex(content)].genre)  }}</p>
                            <div class="contentRating" style="transform: scale(1);">
                                <font-awesome-icon v-for="star in 5" :key="star" class="star" :style="{ color: getReview(series[findSeriesIndex(content)].rating, star) }" :icon="['fas', 'star']" size="sm" />
                            </div>
                        </div>
                    </div>

                    <!--Reviews Container-->
                    <div v-if="activeButton === 'reviews'" class='reviewContentContainer' @click="redirect(`/${content.reviewed_series_slug}`)">
                        <div class="reviewContainerTitle">
                            {{series[findSeriesIndex(content.reviewed_series_slug)].title}}
                            <div class="reviewContainerRating" style="transform: scale(1.1);">
                                <font-awesome-icon v-for="star in 5" :key="star" class="star" :style="{ color: getReview(content.review_rating, star) }" :icon="['fas', 'star']" size="sm" />
                            </div>
                        </div>

                        <p class="reviewContainerSubTitle">{{ getDate(content.review_date) }}</p>
                        <p class="reviewContainerDescription">{{content.review_description}}</p>
                    </div>

                    <!--Continue Watching Container-->
                    <div v-if="activeButton === 'continueWatching'" class='contentContainer' @click="redirect(`/watch/${content.episode_id}`)">
                        <img class="contentPicture" :src="videoUrls[index]" loading="lazy">
                        <div class="contentBottom">
                            <p class="contentTitle">{{ series[findSeriesIndex(content.series_slug)].title }}</p>
                            <p class="contentSubTitle">{{ content.episode_title }}</p>
                            <p class="contentRating" style="font-size: 16px;">{{ formatTime(content.continue_time) }} <span style="color: var(--primary-color)">/</span> {{ formatTime(content.episode_length) }}</p>
                            <progress :value="content.continue_time" :max="content.episode_length" class="contentProgress"></progress>
                        </div>
                    </div>

                    <!--Watch List Container-->
                    <div v-if="activeButton === 'watchList'" class='contentContainer' @click="redirect(`/${series[findSeriesIndex(content)].url_slug}`)">
                        <img class="contentPicture" :src="getHeaderImage(series[findSeriesIndex(content)].header_photo)" loading="lazy">
                        <div class="contentBottom">
                            <p class="contentTitle">{{ series[findSeriesIndex(content)].title }}</p>
                            <p class="contentSubTitle">{{ getSeriesGenres(series[findSeriesIndex(content)].genre)  }}</p>
                            <div class="contentRating" style="transform: scale(1);">
                                <font-awesome-icon v-for="star in 5" :key="star" class="star" :style="{ color: getReview(series[findSeriesIndex(content)].rating, star) }" :icon="['fas', 'star']" size="sm" />
                            </div>
                        </div>
                    </div>
                    
                    
                    <!--Team Involvement Container-->
                    <div v-if="activeButton === 'teamWork'" class='contentContainer' @click="redirect(`/${content.url_slug}`)">
                        <img class="contentPicture" :src="getHeaderImage(content.header_photo)" loading="lazy">
                        <div class="contentBottom">
                            <p class="contentTitle">{{ content.title }}</p>
                            <p class="contentSubTitle">{{ getSeriesGenres(content.genre)  }}</p>
                            <div class="contentRating" style="transform: scale(1);">
                                <font-awesome-icon v-for="star in 5" :key="star" class="star" :style="{ color: getReview(content.rating, star) }" :icon="['fas', 'star']" size="sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profileEdit">
            <div class="profileEditContainer">
                <p class="profileEditTitle">Modifică-ți profilul</p>
                <div class="username" :class="{'animate-error': animateUsername}">
                    <input class="Input" type="text" v-model="newProfileData.userName" @blur="checkInput1" />
                    <label class="inputText" id="usernameInputText" :class="{ 'has-value': hasValue1 }">Nume de utilizator</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
export default {
    data() {
        return{
            isOnPage: false,
            profileData: {
                isLoggedIn: false,
                userName: '',  
                memberUsername: '',
                registerDate: '',
                aboutMe: '',
            },
            isUserOwner: false,
            isUserTeam: false,
            activeButton: 'watchedSeries',
            series: [],
            episodes: [],
            watchedSeries: [],
            reviews: [],
            continueWatching: [],
            watchList: [],
            teamWork: [],
            currentActiveContent: [],
            stars: [1, 2, 3, 4, 5],
            videoUrls: [],
            hasValue1: false,
            animateUsername: false,
            newProfileData: {
                userName: '',
            }
        };
    },
    methods: {
        async checkUserToken() {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                try {
                const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/isLoggedIn`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const userData = await response.json();
                if(userData){
                    this.profileData.memberUsername = this.$route.params.username;
                    this.profileData.userName = userData.username
                    this.profileData.isLoggedIn = true
                    this.loadProfilePage();
                }else{
                    this.profileData.memberUsername = this.$route.params.username;
                    this.isLoggedIn = false
                    this.loadProfilePage();
                }
                } catch (error) {
                console.error('Automatic login failed:', error);
                // localStorage.removeItem('authToken');
                }
            }else{
                this.profileData.memberUsername = this.$route.params.username;
                this.isLoggedIn = false
                this.loadProfilePage();
            }
        },
        async loadProfilePage(){
            console.log('here')
            const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/loadProfilePage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.profileData)
            });
            if (response.ok) {
            const data = await response.json();
            console.log(data)
            this.isOnPage = true;
            this.isUserOwner = data.isOwner
            this.isUserTeam = data.isAdmin
            if(data.viewedSeries){this.watchedSeries = data.viewedSeries; this.watchedSeries.reverse();}
            if(data.reviewsData){this.reviews = data.reviewsData; this.reviews.reverse();}
            if(data.continueWatchingData){
                this.continueWatching = data.continueWatchingData
                this.continueWatching.reverse();
                const videoUrlPromises = this.continueWatching.map(episode => this.getVideoUrl(episode.video_url));
                this.videoUrls = await Promise.all(videoUrlPromises);
            }
            if(data.toWatchSeriesData){this.watchList = data.toWatchSeriesData; this.watchList.reverse();}
            if(data.seriesData){this.series = data.seriesData}
            if(data.episodesData){this.episodes = data.episodesData}
            this.profileData.memberUsername = data.resultsUsers[0].username
            this.profileData.registerDate = this.getDate(data.resultsUsers[0].created_date)
            this.profileData.aboutMe = data.resultsUsers[0].about_me
            this.currentActiveContent = data.viewedSeries
            this.getInvolvedSeries()
        }
        },
        getProfilePicture(user){
            if(this.profileData.memberUsername){
                const profilePicture = `${user.toLowerCase()}-profilePhoto.png`;
                let imageUrl;

                try {
                    imageUrl = require(`@/assets/profilePhotos/${profilePicture}`);
                } catch (error) {
                    imageUrl = require(`@/assets/profilePhotos/photoInexistent-profilePhoto.png`);
                }

                return imageUrl;
            }
        },
        getHeaderImage(url) {
            const contentPhoto = `${url}.jpg`;
            let imageUrl;

            try {
                imageUrl = require(`@/assets/headerPhotos/${contentPhoto}`);
            } catch (error) {
                console.error('File does not exist:', error);
                // Fallback to a default image if the specified photo does not exist
                imageUrl = require(`@/assets/headerPhotos/photoInexistent-headerPhoto.jpg`);
            }

            return imageUrl;
        },
        changeContent(content){
            this.currentActiveContent = []
            if(content === 'watchedSeries'){
                this.currentActiveContent = this.watchedSeries
            }else if(content === 'reviews'){
                this.currentActiveContent = this.reviews
            }else if(content === 'continueWatching'){
                this.currentActiveContent = this.continueWatching
            }else if(content === 'watchList'){
                this.currentActiveContent = this.watchList
            }else if(content === 'teamWork'){
                this.currentActiveContent = this.teamWork
            }
            this.activeButton = content
        },
        findSeriesIndex(seriesId) {
            for (let i = 0; i < this.series.length; i++) {
                if (this.series[i].url_slug === seriesId) {
                    return i;
                }
            }
            return -1;
        },
        getSeriesGenres(genre){
            const seriesGenresArray = JSON.parse(genre);
            const formattedGenres = seriesGenresArray.join(', ');
            return formattedGenres
        },
        getReview(rating, star){
            return star <= rating ? 'yellow' : 'gray';
        },
        redirect(url){
            router.push(url)
        },
        async getVideoUrl(videoUrl) {
            try {
                const videoThumbnailUrl = await this.getVideoIdFromDiv(videoUrl);
                if (videoThumbnailUrl) {
                    return videoThumbnailUrl;
                } else {
                    return '';
                }
            } catch (error) {
                console.error('Error fetching thumbnail URL:', error);
                return '';
            }
        },
        async getVideoIdFromDiv(divContent) {
            divContent = divContent.toString();
            /* eslint-disable-next-line no-useless-escape */
            const videoIdRegex = /\/embed\/[^\/?#]+\/([^\/?#]+)\??/;
            const libraryIdRegex = /\/embed\/(\d+)/;
            const videoId = divContent.match(videoIdRegex);
            const libraryId = divContent.match(libraryIdRegex);

            if (videoId && libraryId) {
                const options = {
                    method: 'GET',
                    headers: { accept: 'application/json', AccessKey: '381c0414-641b-46a9-ae42-69ec77f8223b' }
                };

                try {
                    const responseLibrary = await fetch(`https://api.bunny.net/videolibrary/${libraryId[1]}`, options);
                    const dataLibrary = await responseLibrary.json();
                    const response = await fetch(`https://api.bunny.net/pullzone/${dataLibrary.PullZoneId}?includeCertificate=false`, options);
                    const data = await response.json();
                    const videoThumbnailUrl = (`https://${data.Hostnames[0].Value}/${videoId[1]}/thumbnail.jpg`);
                    return videoThumbnailUrl;
                } catch (err) {
                    console.error(err);
                    return null;
                }
            } else {
                return null;
            }
        },
        formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds % 60).padStart(2, '0');
            return hours > 0 ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
        },
        getDate(object){
            const dateObj = new Date(object);
            const day = ('0' + dateObj.getDate()).slice(-2);
            const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        },
        getInvolvedSeries(){
            this.series.forEach(seriesItem => {
            // Check if the targetName exists in the involved_team array of the current series
            if (seriesItem.involved_team && seriesItem.involved_team.includes(this.profileData.memberUsername)) {
                this.teamWork.push(seriesItem);
            }
            });
            this.teamWork.reverse();
        },
        checkInput1() {
            this.hasValue1 = this.newProfileData.userName !== '';
        },
  },
    async mounted(){
        this.checkUserToken()
        const vm = this;
    window.addEventListener('beforeunload', function() {
      vm.isOnPage = false;
    });
    },
    unmounted(){
        this.isOnPage = false;
    }
}
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: auto; 
  background-image: 
  radial-gradient(circle at center, rgba(255,255,255,.005) 0, rgba(255,255,255,0.005) 1px, transparent 1px),
  linear-gradient(to right, rgba(255,255,255, 0.01) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(255,255,255, 0.01) 1px, transparent 1px);
  background-size: 50px 50px;
  background-color: #141414;
}

.leftPanel{
    position: absolute;
    top: 100px;
    left: 250px;
    width: 300px;
    /* outline: 1px solid red; */
    display: flex;
    flex-direction: column;
    display: flex;
}

.profileImage{
    user-select: none;
    height: 300px;
    width: 100%;
    transition: 0.3s ease;
}
.darkCover{
    position: relative;
    border-radius: 4.65px;
    top: -305px;
    user-select: none;
    pointer-events: none;
    height: 101%;
    width: 100%;
    background-color: rgb(0,0,0,.4);
    transition: 0.3s ease;
}
.profilePicture{
    user-select: none;
    border-radius: 4.65px;
    object-fit: cover;
    height: 100%;
    width: 100%;
}
.profilePicture:hover +.darkCover{
    transition: 0.3s ease;
    background-color: rgb(0,0,0,0);
}
.profilePicture:hover ~ .bottomBar{
    color: var(--primary-color);
    filter: drop-shadow(0 0 1px var(--primary-color));
}
.profileImage:hover{
    transform: scale(1.025);
}

.bottomBar{
    border-bottom-right-radius: 4.65px;
    border-bottom-left-radius: 4.65px;
    pointer-events: none;
    user-select: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 22px;
    position: relative;
    top: -345px;
    width: 100%;
    height: 40px;
    background-color: rgb(40,40,40,.9);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.3s ease;
}

.leftPanelContainer{
    margin-top: 10px;
    width: 100%;
    height: auto;
    background-color: rgb(40,40,40);
    border-radius: 4.65px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    transition: 0.3s ease;
    overflow: hidden;
}

.leftPanelContainer:hover{
    transform: scale(1.025);
    color: var(--primary-color);
    filter: drop-shadow(0 0 2px var(--primary-color));
}

.containerTitle{
    position: absolute;
    left: 20px;
    margin-top: 15px;
    padding-bottom: 5px;
    font-family: 'Roboto', sans-serif;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 17px;
}
.containerSubTitle{
    position: relative;
    width: 260px;
    max-height: 160px;
    margin-top: 40px;
    left: 0px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 15px;
    letter-spacing: 1px;
}

.containerIcon{
    position: absolute;
    right: 20px;
    margin-top: 25px;
}


.middlePanel{
    position: absolute;
    left: 600px;
    top: 102px;
    width: 1100px;
    height: auto;
}
.buttons{
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100px;
}

.allButtons{
    margin-top: 0px;
    display: flex;
    height: 100%;
}
.buttonContainer{
    user-select: none;
    flex-grow: 1;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Roboto',sans-serif;
    font-weight: 400;
    font-size: 21px;
    border-bottom: 1px solid rgb(255,255,255,.1);
    transition: 0.3s ease;
    cursor: pointer;
}

.buttonCounter{
    margin-left: 10px;
    color: white;
    border: 2px solid rgb(50,50,50);
    border-left: 8px solid rgb(50,50,50);
    border-right: 8px solid rgb(50,50,50);
    background-color: rgb(50,50,50);
    border-radius: 100px;
    transition: 0.3s ease;
}

.buttonContainer:hover:not(.buttonContainer-active){
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color);
    background-color: rgb(30,30,30);
}

.buttonContainer-active{
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color);
    background-color: rgb(40,40,40, .4);
    border-top: 1px solid rgb(246, 183, 0,.8);
}

.content{
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 120px;
    width: 102%;
    min-height: auto;
    max-height: 675px;
    padding-bottom: 30px;
}

.contentContainer{
    width: 356.5px;
    height: 225px;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0;
    transition: 0.3s ease;
    cursor: pointer;
    border-radius: 4.65px;
    outline: 1px solid transparent;
}

.contentPicture{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 4.65px;
}

.contentBottom{
    position: absolute;
    width: 356.5px;
    height: 50px;
    background-color:rgb(20,20,20,.9);
    border-bottom-left-radius: 4.65px;
    border-bottom-right-radius: 4.65px;
    margin-top: -54px;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 20px;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    color: white;
}

.contentTitle{
    position: absolute;
    margin-top: 0px;
    margin-left: 10px;
}

.contentSubTitle{
    position: absolute;
    margin-top: 37.5px;
    margin-left: 10px;
    font-size: 15px;
    color: rgb(255,255,255,.6);
}

.contentRating{
    position: absolute;
    margin-left: 250px;
}

.contentContainer:hover{
    transform: scale(1.05);
    outline: 1px solid var(--primary-color);
}

.contentProgress{
    position: absolute;
    bottom: 0px;
    width: 100%;
    background-color: var(--primary-color);
    height: 4px;
}

.contentProgress::-webkit-progress-bar{
    background-color: rgb(40,40,40.8);
}

.contentProgress::-webkit-progress-value {
    background-color: var(--primary-color);
}

.reviewContentContainer{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 1075px;
    min-height: auto;
    max-height: 235px;
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px;
    background-color: rgb(40,40,40);
    border-radius: 4.65px;
    transition: 0.3s ease;
}

.reviewContentContainer:hover{
    outline: 1px solid var(--primary-color);
    transform: scale(1.01);
}

.reviewContainerTitle{
    display: flex;
    flex-direction: row;
    position: relative;
    top: 15px;
    left: 40px;
    color: var(--primary-color);
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 20px;
}
.reviewContainerSubTitle{
    position: relative;
    left: 40px;
    top: 5px;
    color: gray;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 14px;
}

.reviewContainerDescription{
    position: relative;
    margin-top: 5px;
    left: 40px;
    width: 91%;
    min-height: auto;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: white;
    font-size: 16px;
}

.reviewContainerRating{
    margin-left: 15px;
}

.profileEdit{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(20,20,20,.9);
    display: flex;
    align-items: center;
    justify-content: center;
}

.profileEditContainer{
    width: 400px;
    height: 700px;
    background-color: rgb(50,50,50);
    display: flex;
    justify-content: center;
}

.profileEditTitle{
    position: relative;
    top: 0;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 24px;

}

.Input{
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    position: relative;
    color: white;
    width: 40vh;
    height: 5vh;
    background-color: transparent;
    top: 1vh;
    left: 2vh;
    outline: none;
    border: none;
    font-size: 2.25vh;
}
.inputText{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 2.25vh;
    color: gray;
    position: relative;
    top: 1vh;
    left: -27.6vh;
    transition: 0.5s;
    pointer-events: none;
    user-select: none;
}

.inputText.has-value{
    font-weight: 300;
    font-size: 1.5vh;
    top: -2vh;
    left: -31vh;
}
.Input:focus + .inputText{
    font-weight: 300;
    font-size: 1.5vh;
    top: -2vh;
    left: -31vh;
}

.username{
    position: absolute;
    top: 30vh;
    width: 40vh;
    height: 8vh;
    border: 0.25vh solid transparent;
    border-radius: 1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
}
.username:focus-within{
    border: 0.25vh solid var(--primary-color);
}

#usernameInputText{
    left: -32.25vh;
}

#usernameInputText.has-value{
    font-weight: 300;
    font-size: 1.5vh;
    top: -2vh;
    left: -34.15vh;
}
.Input:focus + #usernameInputText{
    font-weight: 300;
    font-size: 1.5vh;
    top: -2vh;
    left: -34.15vh;
}

.animate-error {
    border: 0.25vh solid red;
    animation: moveLeftRight 0.25s ease-in-out;
  }

  @keyframes moveLeftRight {
    0% {
      transform: translateX(0vh);
    }
    25%{
      transform: translateX(2vh);
    }
    75%{
      transform: translateX(-2vh);
    }
    100% {
      transform: translateX(0vh); /* Adjust the distance as desired */
    }
  }

  .errorDetails{
  position: absolute;
  z-index: 1;
  right: 15vh;
}

.exclamationMark{
  position: absolute;
  top: 0.9vh;
  right: -3.5vh;
  color: rgb(146, 60, 60);
  width: 2.5vh;
  height: 2.5vh;
  z-index: 100;
}

.errorDetailsBox{
  position: absolute;
  height: 3vh;
  clip-path: inset(0 0 0 100%);
  top: 0.5vh;
  right: -4vh;
  z-index: 2;
  background-color: rgb(29,29,29);
  border-radius: 0.5vh;
  border: 0.25vh solid red;
  display: flex;
  align-items: center;
  justify-content: center;
}
.errorDetails:hover .errorDetailsBox{
  animation: reveal 0.5s forwards ease-in-out;
}

@keyframes reveal {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.detail{
  user-select: none;
  pointer-events: none;
  position: relative;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 1.15vh;
  color: gray;
  left: 0.5vh;
}
</style>
