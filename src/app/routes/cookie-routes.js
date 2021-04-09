const Ctrl = require('../controllers/cookies-controllers');

const router = require('express').Router();

router.get('/setCookie', Ctrl.setCookie);

router.get('/setSignCookie', Ctrl.setSignCookie);

router.get('/signCookieWithParam', Ctrl.signCookieWithParam);

router.get('/clearCookieByName', Ctrl.clearCookieByName);

router.get('/clearAllCookies', Ctrl.clearAllCookies);

router.get('/', Ctrl.getAllCookies);

router.get('/request', Ctrl.onRequest);

module.exports = router;
