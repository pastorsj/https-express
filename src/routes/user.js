'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import UserController from '../controllers/user.controller';

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(methodOverride(function(req, res) {
    const method = req.body._method;
    if (req.body && typeof req.body.toString() === 'object' && '_method' in req.body) {
        delete req.body._method;
    }
    return method;
}));

// Availible via the base_url/user route
router.route('/:username')
    .get(UserController.get.bind(UserController))

module.exports = router;
