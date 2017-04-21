import 'isomorphic-fetch';
import Router from 'next/router';
import { checkStatus, parseJSON } from 'utils/api';

export default class AuthService {
  constructor(code) {
    const url = `/oauth?code=${code}`;

    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        if (data.access_token) {
          this.setProfile(data);
          Router.push('/');
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
