<template>
    <div>
      <h1>Welcome to My Homepage!</h1>
      <p>This is a simple homepage built with Vue.js.</p>
      <router-link to="/series-page">
        <button>Go to Series Page</button>
      </router-link>
      <router-link to="/login">
        <button>Go to Login Page</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
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
            console.log(userData.user.userId)
          }else(
            console.log('not logged in')
          )
        } catch (error) {
          console.error('Automatic login failed:', error);
          localStorage.removeItem('authToken');
        }
      }
    },
    async loginDiscord(fragment){
      const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

      if (accessToken) {
        const fetchResponse = await fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        });
        if (fetchResponse.ok) {
          const responseData = await fetchResponse.json();
          const { username, email } = responseData;
          // set the welcome username string
          const formData = {
            loginType: 'discord',
            usernameValue: username,
            emailValue: email,
            checkedBox: true,
          }
          const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          const data = await response.json();
            if(data === 'Succesfuly Logged in'){
              console.log('Log-in successful.');
            }else{
              const token = data.token;
              localStorage.setItem('authToken', token); // Store token in local storage
              console.log()
            }
        }
        } else {
          // Handle fetch error
        }
      }
    }
  },
  mounted() {
    this.checkUserToken()
    // localStorage.clear();

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    this.loginDiscord(fragment)
    },
}
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  