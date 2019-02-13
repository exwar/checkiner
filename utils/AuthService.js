import 'isomorphic-fetch';
import Router from 'next/router';
import { checkStatus, parseJSON } from 'utils/api';
import qs from 'qs';

export default class AuthService {
  constructor(code, state) {
    const url = `/oauth?code=${code}`;
    const channel = qs.parse(state).channel || 'the channel';

    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        if (data.access_token && data.scope) {
          const scopes = data.scope.split(',');
          const isAbleToPost = scopes.indexOf('chat:write:user') !== -1;

          if (state) {
            this.setProfile({
              ...data,
              channel
            });
          }

          if (!isAbleToPost) {
            return (window.location.href = '/slack?action=add-write-scope');
          } else {
            return Router.push('/');
          }
        } else {
          throw new Error(data.error);
        }
      })
      .catch(ex => {
        Router.push('/login');
        console.warn(ex);
      });
  }

  isLoggedIn() {
    return !!this.getProfile().access_token;
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }
}
