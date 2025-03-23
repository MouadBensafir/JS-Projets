import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import PostDetailView from '../views/PostDetailView.vue';
import CreatePostView from '../views/CreatePostView.vue';
import EditPostView from '../views/EditPostView.vue';

const routes = [
  {
    path: '/', 
    name: 'Home', 
    component: Home,
    props: true
  },
  {
    path: '/post/:id', 
    name: 'PostDetail',
    component: PostDetailView,
    props: true 
  },
  {
    path: '/create', 
    name: 'CreatePost',
    component: CreatePostView
  },
  {
    path: '/edit/:id', 
    name: 'EditPost',
    component: EditPostView,
    props: true 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
