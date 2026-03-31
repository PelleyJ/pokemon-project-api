const express = require("express");
const passport = require("passport");
const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login with Google OAuth
 *     description: Redirect user to Google for OAuth login
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles Google's OAuth callback
 *     responses:
 *       302:
 *         description: Redirect after successful login
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login-failed"
  }),
  (req, res) => {
    res.redirect("/auth/profile");
  }
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: View logged in user profile
 *     description: Returns the currently authenticated user session
 *     responses:
 *       200:
 *         description: Current logged in user
 *       401:
 *         description: Not authenticated
 */
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  res.status(200).json({
    message: "OAuth login successful",
    user: req.user
  });
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout current user
 *     description: Ends the current OAuth session
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

/**
 * @swagger
 * /auth/login-failed:
 *   get:
 *     summary: Login failed
 *     description: OAuth login failure route
 *     responses:
 *       401:
 *         description: Login failed
 */
router.get("/login-failed", (req, res) => {
  res.status(401).json({ error: "Google OAuth login failed" });
});

module.exports = router;