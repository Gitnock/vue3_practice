import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import mitt from 'mitt';

const emitter = mitt();
const app = createApp(App);

app.use(createPinia());
app.provide("emitter",emitter);
app.mount("#app");
