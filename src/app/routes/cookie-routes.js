const Ctrl = require('../controllers/controllers');

const router = require('express').Router(),
      url = require('url');

router.get('/setCookie', Ctrl.setCookie);

router.get('/setSignCookie', Ctrl.setSignCookie);

router.get('/signCookieWithParam', Ctrl.signCookieWithParam);

router.get('/clearCookieByName', Ctrl.clearCookieByName);

router.get('/clearAllCookies', Ctrl.clearAllCookies);

router.get('/', Ctrl.getAllCookies);

module.exports = router;
