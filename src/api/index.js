import Vue from 'vue';
import VueResource from 'vue-resource';//拦截器插件
import store from '../store';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL;
Vue.http.headers.common.Accept = `application/json`;

Vue.http.interceptors.push((request, next) => {
  const auth = store.state.account.auth;
  if (auth.check()) {
    const accessToken = auth.access_token;
    Vue.http.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete Vue.http.headers.common.Authorization;
  }
  next();
});

export default {
  login(params) {
    return Vue.http.post('user/login', params);
  },
  // github_login(params) {
  //   return Vue.http.post('https://github.com/login/oauth/access_token', params);
  // },
  // login_redirect(params) {
  //   return Vue.http.get('https://api.laravue.org/github/login/redirect?id=' + params);
  // },
  register(params) {
    return Vue.http.post('user/register', params);
  },
  verify_email(code) {
    return Vue.http.get('verify_email', code);
  },
  logout() {
    return Vue.http.get('user/logout');
  },
  edit_password(params) {
    return Vue.http.post('edit_password', params);
  },
  edit_user_info(params) {
    return Vue.http.patch('users/0', params);
  },

  get_user(id) {
    return Vue.http.get('users/' + id);
  },
  user_get_articles(id) {
    return Vue.http.get('users/' + id + '/articles');
  },
  user_get_replies(id) {
    return Vue.http.get('users/' + id + '/replies');
  },
  user_get_likes_articles(id) {
    return Vue.http.get('users/' + id + '/likes');
  },

  get_articles(params) {
    return Vue.http.get('articles', params);
  },
  get_article(id) {
    return Vue.http.get('articles/' + id);
  },
  create_article(params) {
    return Vue.http.post('articles', params);
  },
  content_image(params) {
    return Vue.http.post('content_image', params);
  },
  edit_article(id, params) {
    return Vue.http.patch('articles/' + id, params);
  },
  get_comments(id) {
    return Vue.http.get('articles/' + id + '/comments');
  },
  get_child_comment(id, params) {
    return Vue.http.get('articles/' + id + '/child_comments?parent_id=' + params);
  },
  create_comment(params) {
    return Vue.http.post('comments', params);
  },
  hot_articles() {
    return Vue.http.get('hot_articles');
  },
  hot_tags() {
    return Vue.http.get('hot_tags');
  },
  get_tags() {
    return Vue.http.get('tags');
  },
  is_like_or_not(id) {
    return Vue.http.get('article/is_like', { params: { id: id } });
  },
  like(id) {
    return Vue.http.get('article/like', { params: { id: id } });
  },
  is_follow_or_not(id) {
    return Vue.http.get('user/is_follow', { params: { id: id } });
  },
  follow(id) {
    return Vue.http.get('user/follow', { params: { id: id } });
  },
  get_categories() {
    return Vue.http.get('categories');
  }
}
