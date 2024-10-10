import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueTyper from 'vue3-typer'
import "vue3-typer/dist/vue-typer.css"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueTyper)
app.mount('#app')