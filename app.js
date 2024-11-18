const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('./models/user.js');
const itemRoutes = require('./routes/items.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        } else {
            new User({ username: profile.username, githubId: profile.id }).save().then((newUser) => {
                done(null, newUser);
            });
        }
    });
}));

// Routes
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Home</h1><p>Welcome ${req.user.username}!</p><a href="/logout">Logout</a>`);
    } else {
        res.send(`<h1>Home</h1><p>Welcome Guest!</p><a href="/login">Login</a> | <a href="/register">Register</a>`);
    }
});
app.get('/login', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => res.redirect('/'));
app.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err) => {
        if (err) return res.redirect('/register');
        passport.authenticate('local')(req, res, () => res.redirect('/'));
    });
});
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) console.error("Logout error:", err);
        res.redirect('/');
    });
});
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => res.redirect('/'));

// CRUD Routes
app.use('/api', itemRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
