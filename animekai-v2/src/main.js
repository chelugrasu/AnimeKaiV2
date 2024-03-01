import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import lenis from "vue-lenis";
import playerjs from '@uizaio/playerjs';

// Make PlayerJS globally available
window.Playerjs = playerjs;
library.add(fas, fab)


const app = createApp(App)
app.use(router)
app.use(lenis)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')