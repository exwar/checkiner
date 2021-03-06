import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <section className="layout">
      <Head>
        <title>Checkiner 3000</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
        <link rel="manifest" href="/static/favicons/manifest.json" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#915cb6" />
        <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
        <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merienda+One" media="all" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Mono" media="all" />
      </Head>
      {children}
      <style jsx global>{`
        *,
        *:before,
        *:after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 10px;
        }
        .layout {
          overflow: hidden;
          height: 100%;
          min-height: 100vh;
          background: url('/static/bg-pattern.jpg') 0 0 repeat;
          background-size: 512px 512px;
        }
      `}</style>
    </section>
  );
};

export default Layout;
