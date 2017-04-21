import React, { Component } from 'react';
import Layout from 'components/Layout';
import AuthService from 'utils/AuthService';
import Spinner from 'components/Spinner';

class Auth extends Component {
  static getInitialProps({ req, res, query }) {
    return req && !query.code ? res.writeHead(302, { Location: '/' }).end() : {};
  }

  componentDidMount() {
    const auth = new AuthService(this.props.url.query.code);
  }

  render() {
    return (
      <Layout>
        <div>
          <Spinner />
          <style jsx>{`
              div {
                min-height: 100vh;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Auth;
