'use strict'

const jwt = require('jsonwebtoken');
const SECRET = require('./../secrets.js');

const USERS = [
    {
        id: 'adsflñkj',
        username: 'pedro',
        password: 'admin'
    },
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'ines',
        password: 'ines'
    },
]

const controller = {
    /**
     * authentication method
     */
    auth: function (req, res) {
        const body = req.body;
      
        const user = USERS.find(user => user.username == body.username && user.password == body.password );
        if(!user) return res.sendStatus(401);
        
        var token = jwt.sign({userID: user.id, name: user.username}, SECRET, {expiresIn: '2h'}); // default: HS256 encryption
    
        res.send({token});
    }
}

// Exports the module to be used on routes files
module.exports = controller;