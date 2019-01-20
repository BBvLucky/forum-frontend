import 'flexboxgrid/dist/flexboxgrid.css'
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import moment from 'moment';
import VueMoment from 'vue-moment';
import VueTextareaAutosize from 'vue-textarea-autosize'
import pluralize from './utils/pluralize';
// import страниц
import Rules from '@/pages/Rules';
import Home from '@/pages/home';
import LogIn from '@/pages/users/LogIn';
import Registration from '@/pages/users/Registration';
import ForumAccount from '@/pages/users/ForumAccount';
import UIkit from '@/pages/UI-kit';
import Page404 from '@/pages/Page404';
import Post from '@/pages/posts/onePost';
import AddNewPost from '@/pages/posts/AddNewPost';
import EditPost from '@/pages/posts/EditPost';

Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://api.forum.pocketmsg.ru';

moment.locale('ru');
Vue.use(VueMoment, { moment });

Vue.filter('pluralize', pluralize);

Vue.use(VueTextareaAutosize);

const router = new VueRouter({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/search/:query', name: 'userSearch', component: Home, props: true},
    {path: '/search', redirect: '/' },
    {path: '/profile', component: ForumAccount},
    {path: '/posts/:postId', name: 'posts', component: Post, props: true},
    {path: '/forum', component: Home},
    {path: '/signup', component: Registration},
    {path: '/login', component: LogIn},
    {path: '/create-post', component: AddNewPost},
    {path: '/ui-kit', component: UIkit},
    {path: '/404', component: Page404},
    {path: '/rules', component: Rules},
    {path: '/edit-post/:postId', name: 'post', component: EditPost, props: true},



// редирект должен быть в самом низу
    {path: '/*', redirect: '/404' },

  ]
});

const app = new Vue({
  router,
  render: h => h(App),
  store,
});

// если есть токен, то при запросах axios будет включать заголовок Authorization: 'Bearer <токен>'
app.axios.interceptors.request.use(config => {
  if (app.$store.getters.isLoggedIn) {
    config.headers = {
      Authorization: app.$store.getters.authHeaderValue,
    };
  }
  return config;
});

app.$mount('#app');
