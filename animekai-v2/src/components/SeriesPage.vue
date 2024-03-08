<template>
    <div>
      <p style="font-size: 30px; color: red;">{{ currentTime }}</p>
      <!-- Iframe element for embedding the video player -->
      <iframe ref="videoIframe" src="//embedv.net/e/6zeREaDZnVrxZPa" width="800" height="600" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="true"></iframe>
    </div>
  </template>
  <script>
  export default {

    data(){
      return{
        currentTime: 0,
      }
    },
    mounted() {
      this.$nextTick(() => {
              const player = new window.playerjs.Player(this.$refs.videoIframe);
              let previousTime = null;
              const checkTime = function() {
                  player.getCurrentTime(currentTimeSeconds => {
                    this.currentTime = currentTimeSeconds
                      if (currentTimeSeconds !== previousTime) {
                        previousTime = currentTimeSeconds;
                      }
                  });
              }.bind(this);
              
              this.intervalId = setInterval(checkTime, 1000);
              player.on('ended', () => {
                  clearInterval(this.intervalId);
              });

          });
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles for player container and progress bar here */
  .player-container {
    margin-top: 20px;
  }
  
  .progress-container {
    width: 100%;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .progress-bar {
    width: 0%;
    height: 20px;
    background-color: #4caf50;
    border-radius: 4px;
  }
  
  .progress-text {
    margin-top: 4px;
    text-align: center;
    font-size: 14px;
  }
  </style>