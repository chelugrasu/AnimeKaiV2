<template>
    <div>
      <!-- Iframe element for embedding the video player -->
      <iframe ref="videoIframe" src="https://iframe.mediadelivery.net/embed/157575/29afcb19-306c-4935-b447-6121725c322c" width="720" height="400" frameborder="0" allow="autoplay"></iframe>
    </div>
  </template>
  <script>
  export default {
    mounted() {
      console.log('heree');
      const player = new window.playerjs.Player(this.$refs.videoIframe); // Create PlayerJS instance
      let previousTime = null; // Initialize previousTime to null
      let intervalId = null; // Initialize intervalId to null
  
      // Define a function to check for changes in time and log it
      function checkTime() {
        player.getCurrentTime(currentTimeSeconds => {
          let minutes = Math.floor(currentTimeSeconds / 60); // Get the whole minutes
          let seconds = Math.floor(currentTimeSeconds % 60); // Get the remaining seconds
  
          // Format minutes and seconds as mm:ss
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
  
          // If less than 1 minute, set minutes to 0 and update seconds accordingly
          if (minutes < 1) {
            minutes = 0;
            seconds = Math.floor(currentTimeSeconds);
          }
  
          // Format the time as mm:ss
          const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  
          // Log the formatted time only if it's different from the previous time
          if (formattedTime !== previousTime) {
            console.log(formattedTime);
            previousTime = formattedTime; // Update previousTime
          }
        });
      }
  
      // Start checking the time every second
      intervalId = setInterval(checkTime, 1000);
  
      // Stop checking when the video playback ends
      player.on('ended', () => {
        clearInterval(intervalId);
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