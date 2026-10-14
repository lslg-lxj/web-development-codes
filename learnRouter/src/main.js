import { createApp } from 'vue';
import router from './router';

import App from './App.vue';

// 挂载顺序
createApp(App).use(router).mount('#app');
