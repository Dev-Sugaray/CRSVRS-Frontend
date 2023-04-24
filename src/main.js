import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import { createPinia } from 'pinia'
// Vue-ripple-directive
import Ripple from 'vue3-whr-ripple-directive'
// Animate on scroll library
import AOS from 'aos'
import 'aos/dist/aos.css';
// Boostrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Fontawesome
import '@/assets/css/fontawesome-all.min.css';
// Colors
import '@/assets/css/colors.css';
// App css
import '@/assets/css/app.css';

const pinia = createPinia();
pinia.use(createPersistedStatePlugin());
const app = createApp(App);
app.use(pinia);
app.use(router);
// Directives
app.directive('ripple', Ripple);
// Mount
app.mount('#app');
// Mixins
app.mixin({
    mounted() {
        AOS.init()
    }
})
