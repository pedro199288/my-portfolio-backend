'use strict'

const jwt = require('jsonwebtoken');
const User = require('./../models/User'); 
const bcrypt = require('bcrypt');

const controller = {
    /**
     * authentication method
     */
    auth: function (req, res) {
        const body = req.body;

        // Look for the user in the database
        User.findOne({name: body.username}, (err, user) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return user'});

            if(!user) return res.status(404).send({message: 'The user does not exists'});

            // user exists, therefore check password
            bcrypt.compare(body.password, user.password, (passErr, passRes) => {
                if(passErr) return res.status(500).send({message: 'Server error'});

                if(!passRes) return res.status(401).send({message: 'Not allowed!'});

                var token = jwt.sign({userID: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '2h'}); // default: HS256 encryption
            
                return res.status(200).send({ token });
            });
            
        });
    }
}

// Exports the module to be used on routes files
module.exports = controller;