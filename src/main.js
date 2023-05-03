import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// Vue-ripple-directive
import Ripple from 'vue3-whr-ripple-directive'
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
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import { createPinia } from 'pinia'

const pinia = createPinia();

pinia.use(createPersistedStatePlugin({
    storage: {
        getItem: async (key) => {
            return localforage.getItem(key)
        },
        setItem: async (key, value) => {
            return localforage.setItem(key, value)
        },
        removeItem: async (key) => {
            return localforage.removeItem(key)
        }
    }
}));

const app = createApp(App);
app.use(pinia);
app.use(router);
// Directives
app.directive('ripple', Ripple);
// Mount
app.mount('#app');

