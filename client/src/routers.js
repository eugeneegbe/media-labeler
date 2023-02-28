import HomePage from './components/HomePage.vue'
import LabelImage from './components/LabelImage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'LabelImage',
        component: LabelImage,
        path: '/label/:track'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router