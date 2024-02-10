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
    name: 'HomePage'
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  