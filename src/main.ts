import { createApp } from 'vue'
import './style.scss'
import 'virtual:windi.css';
import App from './App.vue'
import { useMonitoring } from './services/nzxt';

var app = createApp(App);
app.config.globalProperties.window = window;
app.mount('#app')
