import 'isomorphic-fetch';
import Router from 'next/router';
import { checkStatus, parseJSON } from 'utils/api';

const CLIENT_ID = '16958440739.169826916213';
const CLIENT_SECRET = '0e66e436271d511cb4bf499c2854e03a';

export default class AuthService {
  constructor(code) {
    const url = `https://slack.com/api/oauth.access?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

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
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }
}
