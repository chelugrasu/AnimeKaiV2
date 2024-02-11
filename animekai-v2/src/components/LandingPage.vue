<template>
    <!-- <router-link to='/home'>
        <button>Home</button>
    </router-link> -->
    <div class="BackgroundOverlay">
        <div class="UIBackground"></div>
    </div>
    <router-link to="/home">
        <div class="LogoText"></div>
    </router-link>
    
    <router-link to="/login">
        <div class="loginButton">Log In</div>
    </router-link>

    <div class="TokyoGhoulSlide">
        <div class="Title">Tokyo Ghoul</div>
        <div class="Description">Un student din Tokyo, Ken Kaneki, se transformă în jumătate Ghoul după un eveniment fatal. Înțepenit între lumea umană și cea a Ghoul-ilor, Ken se confruntă cu dileme de identitate și moralitate într-o lume plină de conflicte și pericole.</div>
        <div class="watchButton">Vizionează</div>
        <div class="learnMoreButton">Află mai Mult</div>
        <div class="slidePhoto"></div>
        <div class="nextSlideButton"><font-awesome-icon :icon="['fas', 'chevron-right']" /></div>
    </div>
</template>

<style scoped>
.BackgroundOverlay{
position: absolute;
  height: 100.01vh;
  top: -0.05vh;
  left: 0vh;
  width: 100%;
  background-color: rgba(0,0,0,0.65);
}
.UIBackground{
    position: absolute;
  height: 100.01vh;
  top: -0.05vh;
  left: 0vh;
  width: 100%;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../assets/UIBackground.jpg);
  background-color: black;
  /* filter: blur(1vh); */
}

.LogoText{
    position: absolute;
    top: 2.5vh;
    left: 0vh;
    height: 2.5vh;
    width: 22.5vh;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(../assets/LogoText.png);
}
.loginButton{
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 1.5vh;
    color: white;
    position: absolute;
    top: 2.5vh;
    right: 5vh;
    width: 10vh;
    height: 4vh;
    border-radius: 2vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.25);
    outline: 0.25vh solid white;
    transition: 0.35s;
}
.loginButton:hover{
    color: var(--primary-color);
    outline: 0.25vh solid var(--primary-color);
    filter: drop-shadow(0vh 0vh 0.5vh var(--primary-color));
}

.Title{
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    letter-spacing: 0.25vh;
    font-size: 7vh;
    color: white;
    position: absolute;
    top: 30vh;
    left: 15vh; 
}
.Description{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.75vh;
    color: white;
    max-width: 62.5vh;
    letter-spacing: 0.15vh;
    line-height: 3vh;
    position: absolute;
    top: 42vh;
    left: 15vh;
}
.watchButton{
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 2vh;
    color: white;
    position: absolute;
    top: 60vh;
    left: 15vh;
    width: 20vh;
    height: 6vh;
    background-color: rgba(29,29,29,1);
    border-radius: 0.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.35s;
    outline: 0.25vh solid transparent;
}
.watchButton:hover{
    filter: drop-shadow(0vh 0vh 0.5vh var(--primary-color));
    outline: 0.25vh solid var(--primary-color);
    background-color: rgba(29,29,29,0.25);
    color: var(--primary-color);
}

.learnMoreButton{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 2vh;
    color: white;
    position: absolute;
    top: 60vh;
    left: 37.5vh;
    width: 20vh;
    height: 6vh;
    background-color: rgba(29,29,29,0.25);
    border-radius: 0.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.35s;
    outline: 0.25vh solid gray;
}
.learnMoreButton:hover{
    filter: drop-shadow(0vh 0vh 0.5vh var(--primary-color));
    outline: 0.25vh solid var(--primary-color);
    color: var(--primary-color);
}

.slidePhoto{
    position: absolute;
    top: -60vh;
    width: 100vh;
    height: 160vh;
    right: 10vh;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/tokyoGhoul.png');
    filter: drop-shadow(0vh 0vh 15vh rgba(110, 38, 14, 1));
}

</style>

<script>
export default{
    name: "LandingPage"
}
</script>