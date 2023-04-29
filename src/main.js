import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
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

// Pinia, pinia-plugin-persistedstate-2 and localforage for persistent statemanagement
import localforage from 'localforage'
let appStorage = window.indexedDB ? localforage : localStorage;
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import { createPinia } from 'pinia'

const pinia = createPinia();
pinia.use(
    createPersistedStatePlugin({
        storage: {
            async getItem(key){
                return appStorage.getItem(key)
            },
            async setItem(key, value){
                return appStorage.setItem(key, value)
            },
            async removeItem(key){
                return appStorage.removeItem(key)
            }
        }
    })
)

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
