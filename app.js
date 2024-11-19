require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
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

// Serve Login Page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

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
  } else {
    res.status(401).send('Please log in to access this page.');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
