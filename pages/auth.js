import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Layout from 'components/Layout';
import AuthService from 'utils/AuthService';
import Spinner from 'components/Spinner';

class Auth extends Component {
  static getInitialProps({ req, res, query }) {
    return req && !query.code
      ? res.writeHead(302, { Location: '/' }).end()
      : {};
  }

  componentDidMount() {
    const { query } = this.props.router;

    const auth = new AuthService(
      query.code,
      query.state
    );
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

export default withRouter(Auth);
