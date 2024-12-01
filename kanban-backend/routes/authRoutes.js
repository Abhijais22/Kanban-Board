const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, accessLevel: req.user.accessLevel }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Redirect user to the frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  }
);

module.exports = router;
