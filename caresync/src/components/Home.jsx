import React from 'react';
import logo from './img/logo.png';
import hero from './img/hero.png';
import appleTouchIcon from './img/favicons/apple-touch-icon.png';
import favicon32 from './img/favicons/favicon-32x32.png';
import favicon16 from './img/favicons/favicon-16x16.png';
import favicon from './img/favicons/favicon.ico';
import mstile from './img/favicons/mstile-150x150.png';

function Home() {
  return (
    <div style={{ fontFamily: 'Manjari, sans-serif', fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CareSync</title>

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="shortcut icon" type="image/x-icon" href={favicon} />
        <meta name="msapplication-TileImage" content={mstile} />
        <meta name="theme-color" content="#ffffff" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manjari:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <main style={{ padding: '20px', maxWidth: '100vw', overflowX: 'hidden', height: '100vh' }} id="top">
          {/* Navbar */}
          <nav style={{ padding: '10px 0', backgroundColor: '#fff', marginBottom: '20px' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href="/">
                <img src={logo} width="180" alt="logo" style={{ marginLeft: '90px', marginTop: '10px' }}/>
              </a>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ul style={{ listStyle: 'none', display: 'flex', padding: 0, margin: 0 }}>
                  <li style={{ margin: '0 15px' }}>
                    <a href="#about" style={{ textDecoration: 'none', color: '#333', fontSize: '20px', fontFamily: 'Manjari' }}>About Us</a>
                  </li>
                  <li style={{ margin: '0 15px' }}>
                    <a href="#departments" style={{ textDecoration: 'none', color: '#333', fontSize: '20px', fontFamily: 'Manjari' }}>Find Doctor</a>
                  </li>
                  <li style={{ margin: '0 15px' }}>
                    <a href="#findUs" style={{ textDecoration: 'none', color: '#333', fontSize: '20px', fontFamily: 'Manjari' }}>Contact</a>
                  </li>
                </ul>
                <a
                  href="/login"
                  style={{ padding: '5px 15px', border: '1px solid #007bff', borderRadius: '25px', textDecoration: 'none', color: '#007bff', fontSize: '20px', fontFamily: 'Manjari', marginRight: '100px' }}
                >
                  Log In
                </a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section style={{ padding: '50px 0', backgroundColor: '#fff', height: 'calc(100vh - 80px)' }} id="home">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', height: '100%' }}>
              <div style={{ flex: '1', padding: '20px', marginTop: '-500px', marginLeft: '100px' }}>
                <h1 style={{ fontSize: '30px', marginBottom: '20px', fontFamily: 'Manjari' }}>
                  Find Your Doctor and <br /> make an appointment.
                </h1>
                <p style={{ fontSize: '25px', marginBottom: '30px', fontFamily: 'Manjari' }}>
                Welcome to CareSync, your trusted partner in scheduling seamless healthcare appointments and connecting with your ideal doctors.
                </p>
                <a
                  href="/register"
                  style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '25px', textDecoration: 'none', fontSize: '25px', fontFamily: 'Manjari' }}
                >
                  Register
                </a>
              </div>
              <div style={{ flex: '1', textAlign: 'center', padding: '20px' }}>
                <img
                  src={hero}
                  alt="hero-header"
                  style={{ width: '700px', height: 'auto', objectFit: 'contain', marginTop: '-800px' }}
                />
              </div>
            </div>
          </section>
        </main>

        {/* Scripts */}
        <script src="/vendors/@popperjs/popper.min.js"></script>
        <script src="/vendors/bootstrap/bootstrap.min.js"></script>
        <script src="/vendors/is/is.min.js"></script>
        <script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"></script>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
        <script src="/vendors/fontawesome/all.min.js"></script>
        <script src="/js/theme.js"></script>
      </body>
    </div>
  );
}

export default Home;
