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
    <!-- <div class="Slides"> -->
        <!-- <div class="Slide" id="TokyoGhoulSlide">
            <div class="Title">Tokyo Ghoul</div>
            <div class="Description">Un student din Tokyo, Ken Kaneki, se transformă în jumătate Ghoul după un eveniment fatal. Înțepenit între lumea umană și cea a Ghoul-ilor, Ken se confruntă cu dileme de identitate și moralitate într-o lume plină de conflicte și pericole.</div>
            <div class="watchButton" id="watchButtonTokyoGhoul">Vizionează</div>
            <div class="learnMoreButton" id="learnMoreButtonTokyoGhoul">Află mai Mult</div>
            <div class="slidePhoto" id="slidePhotoTokyoGhoul"></div>
            <div class="currentSlide">
                <div class="Dot" id="activeDot"></div>
                <div class="Dot" id="inactiveDot"></div>
                <div class="Dot" id="inactiveDot"></div>
            </div>
        </div>
        <div class="Slide" id="SoloLevelingSlide">
            <div class="Title">Solo Leveling</div>
            <div class="Description">Un luptător singuratic, Sung Jin-Woo, își îmbunătățește abilitățile într-o lume plină de monștri. În căutarea puterii, el descoperă secretele universului și propriile sale transformări, într-o poveste plină de pericole și evoluție personală.</div>
            <div class="watchButton" id="watchButtonSoloLeveling">Vizionează</div>
            <div class="learnMoreButton" id="learnMoreButtonSoloLeveling">Află mai Mult</div>
            <div class="slidePhoto" id="slidePhotoSoloLeveling"></div>
            <div class="currentSlide">
                <div class="Dot" id="inactiveDot"></div>
                <div class="Dot" id="activeDot"></div>
                <div class="Dot" id="inactiveDot"></div>
            </div>
        </div>
        <div class="Slide" id="DemonSlayerSlide">
            <div class="Title">Demon Slayer</div>
            <div class="Description">Un tânăr vânător de demoni, Tanjiro Kamado, își urmărește scopul de a-și vindeca sora și de a răzbuna familia, ucisă de demoni. În călătoria sa plină de pericole, el descoperă prietenii puternice și se confruntă cu forțe întunecate, devenind o speranță pentru o lume amenințată de rău.</div>
            <div class="watchButton" id="watchButtonDemonSlayer">Vizionează</div>
            <div class="learnMoreButton" id="learnMoreButtonDemonSlayer">Află mai Mult</div>
            <div class="slidePhoto" id="slidePhotoDemonSlayer"></div>
            <div class="currentSlide">
                <div class="Dot" id="inactiveDot"></div>
                <div class="Dot" id="inactiveDot"></div>
                <div class="Dot" id="activeDot"></div>
            </div>
        </div> -->
    <!-- </div>
    <div class="SlideButton" id="previousSlideButton"><font-awesome-icon class="arrowLeftIcon" :icon="['fas', 'chevron-left']" /></div>
    <div class="SlideButton" id="nextSlideButton" ><font-awesome-icon class="arrowRightIcon" :icon="['fas', 'chevron-right']" /></div> -->




    <div class="Slides">
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      :class="['Slide', { 'active-slide': index === currentSlide, 'prev-slide': index === prevSlide, 'next-slide': index === nextSlide }]"
    >
      <div class="Title">{{ slide.title }}</div>
      <div class="Description">{{ slide.description }}</div>
      <div class="watchButton" @click="watchSlide(slide)">Vizionează</div>
      <div class="learnMoreButton" @click="learnMore(slide)">Află mai Mult</div>
      <div class="slidePhoto" :id="'slidePhoto' + slide.id"></div>
      <div class="currentSlide">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="Dot"
          :class="{ 'active-dot': index === currentSlide }"
        ></div>
      </div>
    </div>
  </div>
  <div class="SlideButton" id="previousSlideButton" @click="previousSlide">
    <font-awesome-icon class="arrowLeftIcon" :icon="['fas', 'chevron-left']" />
  </div>
  <div class="SlideButton" id="nextSlideButton" @click="nextSlideFunction">
    <font-awesome-icon class="arrowRightIcon" :icon="['fas', 'chevron-right']" />
  </div>
</template>

<style scoped>
.BackgroundOverlay{
position: absolute;
  height: 100.01vh;
  top: -0.05vh;
  left: 0vh;
  width: 100%;
  background-color: rgba(0,0,0,0.85);
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
  background-image: url(../assets/tokyoGhoulBackground.jpg);
  background-color: black;
  filter: blur(1vh);
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
    border-radius: 0.75vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.25);
    outline: 0.25vh solid white;
    transition: 0.35s;
    z-index: 10;
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
    background-size: 90vh;
    background-repeat: no-repeat;
    background-image: url('../assets/tokyoGhoul.png');
    filter: drop-shadow(0vh 0vh 15vh rgba(110, 38, 14, 1));
}

.SlideButton{
    position: absolute;
    width: 8.5vh;
    height: 8.5vh;
    /* top: 70vh; */
    background-color: rgba(29,29,29,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10vh;
    cursor: pointer;
    transition: 0.35s;
    top: 50%;
    transform: translateY(-50%);

}
.SlideButton:hover{
    background-color: rgb(80, 80, 80);
}

#previousSlideButton{
    left: 15vh;
}
.arrowLeftIcon{
    color: white;
    width: 3vh;
    height: 3vh;
}

#nextSlideButton{
    left: 25vh;
}
.arrowRightIcon{
    color: white;
    width: 3vh;
    height: 3vh;
}
.currentSlide{
    flex: 0vh 0vh auto;
    display: inline-block;
    position: absolute;
    margin: 1vh;
    top: 80vh;
    left: 18vh;
    display: inline-block;
}
.Dot{
    width: 1.75vh;
    height: 1.75vh;
    border-radius: 10vh;
    outline: 0.25vh solid gray;
    float: left;
    margin: 0.75vh;
}
#activeDot{
    background-color: gray;
}
#inactiveDot{
    background-color: transparent;
}




.Slide {
    position: absolute;
    width: 100%;
    transition: transform 0.5s ease;
}

.prev-slide {
  transform: translateX(-100%);
}

.active-slide {
  transform: translateX(0);
}

.next-slide {
  transform: translateX(100%);
}

.SlideButton:first-child {
  left: 10px;
}

.SlideButton:last-child {
  right: 10px;
}

.active-dot {
  background-color: blue;
}
.inactive-dot {
  background-color: gray;
}


</style>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      prevSlide: null,
      nextSlide: 2, // Initially set to the index of the third slide
      slides: [
        {
          id: 'TokyoGhoul',
          title: 'Tokyo Ghoul',
          description: 'Un student din Tokyo, Ken Kaneki, se transformă în jumătate Ghoul după un eveniment fatal. Înțepenit între lumea umană și cea a Ghoul-ilor, Ken se confruntă cu dileme de identitate și moralitate într-o lume plină de conflicte și pericole.',
        },
        {
          id: 'SoloLeveling',
          title: 'Solo Leveling',
          description: 'Un luptător singuratic, Sung Jin-Woo, își îmbunătățește abilitățile într-o lume plină de monștri. În căutarea puterii, el descoperă secretele universului și propriile sale transformări, într-o poveste plină de pericole și evoluție personală.',
        },
        {
          id: 'DemonSlayer',
          title: 'Demon Slayer',
          description: 'Un tânăr vânător de demoni, Tanjiro Kamado, își urmărește scopul de a-și vindeca sora și de a răzbuna familia, ucisă de demoni. În călătoria sa plină de pericole, el descoperă prietenii puternice și se confruntă cu forțe întunecate, devenind o speranță pentru o lume amenințată de rău.',
        },
      ],
    };
  },
  methods: {
    nextSlideFunction() {
      if (this.currentSlide === this.slides.length - 1) return;
      this.prevSlide = this.currentSlide;
      this.currentSlide++;
      this.nextSlide = this.currentSlide < this.slides.length - 1 ? this.currentSlide + 1 : null;
    },
    previousSlide() {
      if (this.currentSlide === 0) return;
      this.nextSlide = this.currentSlide;
      this.currentSlide--;
      this.prevSlide = this.currentSlide > 0 ? this.currentSlide - 1 : null;
    },
    // watchSlide(slide) {
    //   // Add your logic to watch the current slide
    // },
    // learnMore(slide) {
    //   // Add your logic to learn more about the current slide
    // },
  },
  created() {
    // Initially show the first slide only
    this.nextSlideFunction();
  },
};
</script>