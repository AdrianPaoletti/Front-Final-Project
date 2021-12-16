import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Detail from "../views/Detail.vue";
import MyVideos from "../views/MyVideos.vue";
import CreatedVideos from "../components/CreatedVideos.vue";
import Favourite from "../components/Favourite.vue";
import VideoForm from "../components/VideoForm.vue";
import Profile from "../views/Profile.vue";
import NotFound from "../components/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/myvideos",
    name: "MyVideos",
    component: MyVideos,
  },
  {
    path: "/myvideos/creations",
    name: "CreatedVideos",
    component: CreatedVideos,
  },
  {
    path: "/myvideos/favourite",
    name: "Favourite",
    component: Favourite,
  },
  {
    path: "/myvideos/create",
    name: "VideoForm",
    component: VideoForm,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
