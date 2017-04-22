import React, { Component } from 'react';
import Layout from 'components/Layout';
import SlackButton from 'components/SlackButton';
import Router from 'next/router';

class Login extends Component {
  static getInitialProps({ req }) {
    return req
      ? { redirectOrigin: `${req.protocol}://${req.get('host')}/auth` }
      : { redirectOrigin: `${location.protocol}//${location.host}/auth` };
  }

  componentDidMount() {
    console.log(this.props.redirectOrigin);

    let profile = localStorage.getItem('profile');
    if (profile) {
      return Router.replace('/');
    }
  }

  render() {
    return (
      <Layout>
        <article className="login-page">
          <div className="login-page__header">
            <h1>Checkiner 3000<sup>v2.0</sup></h1>
          </div>
          <SlackButton redirectOrigin={this.props.redirectOrigin} />
        </article>

        <style jsx>{`
          .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 100vh;
            flex-direction: column;
          }
          .login-page__header {
            font: 3rem 'Merienda One', serif;
            color: #fff;
            margin-bottom: 2rem;
          }
          .login-page__header sup {
            font-size: 1rem;
            vertical-align: 2.5rem;
            opacity: .4;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;
