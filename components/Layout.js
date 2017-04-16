import React, { Component } from 'react';
import Head from 'next/head'

class Layout extends Component {
  render() {
    return (
      <section className="layout">
        <Head>
          <title>Checkiner 3000</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {this.props.children}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css?family=Merienda+One');
          @import url('https://fonts.googleapis.com/css?family=PT+Mono');
          *, *:before, *:after { margin: 0; padding: 0; box-sizing: border-box; }
          html {
            font-size: 10px;
          }
          .layout {
            height: 100%;
            min-height: 100vh;
            background: url('/static/bg-pattern.jpg') 0 0 repeat;
            background-size: 512px 512px;
          }
        `}</style>
      </section>
    );
  }
}

export default Layout;
