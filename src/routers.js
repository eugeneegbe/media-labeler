import HomePage from './components/HomePage.vue'
import LabelImage from './components/LabelImage.vue'
import AddImages from './components/AddImages.vue'
import UserContributions from './components/UserContributions.vue'
import AboutPage from './components/AboutPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'AddImages',
        component: AddImages,
        path: '/add-images'
    },
    {
        name: 'LabelImage',
        component: LabelImage,
        path: '/label/:track/:category/:username'
    },
    {
        name: 'UserContributions',
        component: UserContributions,
        path: '/contributions'
    },
    {
        name: 'AboutPage',
        component: AboutPage,
        path: '/about'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router