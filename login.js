const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
  res.render('./index')
})

router.get('/', redirectToAccept, function (req, res) {
  res.render('login.mustache');
});

function redirectToAccept(req, res, next) {
  if (req.isAuthenticated())
    res.redirect('login.mustache');

  return next();
}

module.exports = router;
