require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Needed to parse form data
app.use(express.static('public')); // To serve static files

// Session Middleware
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Mock User Database
const users = [
  { id: 1, username: 'testuser', password: 'password123' }
];

// Local Keycloak SSO Config
const config = {
  ISSUER: 'http://localhost:8080/realms/master',
  AUTHORIZATION_ENDPOINT: 'http://localhost:8080/realms/master/protocol/openid-connect/auth',
  REDIRECT_URI: 'http://localhost:5001/cb',
  CLIENT_ID: 'kanban-board-project',
  CLIENT_SECRET: 'Vi5agaux6IKKzw15VAcCWrteQngdakj6',
  SCOPES: 'openid',
  TOKEN_ENDPOINT: 'http://localhost:8080/realms/master/protocol/openid-connect/token',
};

// Passport Strategy Configuration
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Routes

// Home Route
app.get('/', (req, res) => {
  res.send('Kanban Project Backend is running');
});

// Server Login Page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

// ******** Server SSO Login Page ********
app.get('/sso-login', (req, res) => {
  const { ISSUER, AUTHORIZATION_ENDPOINT, REDIRECT_URI, CLIENT_ID, SCOPES } = config;

  if (!ISSUER) {
    return res.status(500).send('Missing OpenID provider issuer URL. Update the configuration and try again.');
  }

  const authUrl = `${AUTHORIZATION_ENDPOINT}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}&response_type=code&scope=${encodeURIComponent(SCOPES)}`;

  res.redirect(authUrl);
});

app.get('/cb', (req, res) => {
  const code = req.query.code;
  req.session.code = code;
  res.redirect('/token');
});

app.get('/token', async (req, res) => {
  const { TOKEN_ENDPOINT, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = config;

  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: req.session.code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        validateStatus: false,
      }
    );

    const { access_token, id_token } = response.data;
    req.session.access_token = access_token;
    req.session.id_token = id_token;

    res.redirect('/dashboard');
    } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching token');
  }
});
// *************************************

// Login Route
app.post('/login', passport.authenticate('local', { failureRedirect: '/login-failed' }), (req, res) => {
  res.send(`Welcome, ${req.user.username}! You are logged in.`);
});

// Login Failure Route
app.get('/login-failed', (req, res) => {
  res.status(401).send('Invalid credentials, please try again.');
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).send('Failed to log out.');
    }
    res.send('You have successfully logged out.');
  });
});

// Dashboard (Protected Route)
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome to the dashboard, ${req.user.username}`);
  } else if (req.session.access_token) {
    try {
      var claims = jwt.decode(req.session.access_token, { complete: true });
      
      res.send(`Welcome to the dashboard, ${claims.payload.preferred_username}`)
    } catch (error) {
      res.status(500).send('Error decoding token');
      console.log(error);
    }
  } else {
    res.status(401).send('Please log in to access this page.');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
