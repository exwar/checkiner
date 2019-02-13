import React, { Component } from 'react';
import Layout from 'components/Layout';
import SlackButton from 'components/SlackButton';
import Router from 'next/router';
import Spinner from 'components/Spinner';

class Login extends Component {
  state = {
    isSigningIn: false
  };

  componentDidMount() {
    let profile = localStorage.getItem('profile');
    if (profile) {
      return Router.replace('/');
    }
  }

  handleSignInClick = event => {
    this.setState({
      isSigningIn: true
    });
  };

  render() {
    return (
      <Layout>
        <article className="login-page">
          <div className="login-page__header">
            <h1>
              Checkiner 3000<sup>v2.0</sup>
            </h1>
          </div>
          <div className="login-page__signin">
            {this.state.isSigningIn ? (
              <Spinner />
            ) : (
              <SlackButton onClick={this.handleSignInClick} />
            )}
          </div>
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
            opacity: 0.4;
          }
          .login-page__signin {
            height: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;
