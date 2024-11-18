const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user.js');

// Registration Route
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/items'); // Redirect to items after registration
        });
    });
});

// Login Route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/items',
    failureRedirect: '/login',
}));

// Google OAuth Routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/items',
    failureRedirect: '/login',
}));

// Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;