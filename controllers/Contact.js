const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

//Configure the account to be used for sending mails
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'pruebasapis80@gmail.com',
//         pass: 'pruebasinternasapis'
//     }
// });

// // Mail options
// const mailOptions = {
//     from: 'pruebasapis80@gmail.com',
//     to: 'pedromonteagudo_@hotmail.com', // 'myfriend@yahoo.com, myotherfriend@yahoo.com',   More receiver can be added separated by commas.
//     subject: 'Sending email with nodejs',
//     text: 'That was easy! ',
//     // html:'<h1>Welcome</h1><p>That was easy!</p>'         html can be send like that
// }

const transporter = nodemailer.createTransport({
    host: 'monjidev.com',
    port: 25,
    secure: false,
    auth: {
        user: 'pedro@monjidev.com',
        pass: '${3A3d4g9e-}',
    },
    tls:{
   	ciphers:'SSLv3',
        rejectUnauthorized: false
    }
});

const controller = {

    /**
     * Updates a document of the collection by its id
     */
    send: function(req, res) {
        // save the contact message
        var contact = new Contact();
        const params = req.body;

        contact.name = params.name;
        contact.email = params.email;
        contact.email = params.subject;
        contact.message = params.message;

        contact.save((err, contactStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!contactStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            // Send Mail
            transporter.sendMail({
                from: 'pedro@monjidev.com',
                to: 'pedromonteagudo_@hotmail.com', // 'myfriend@yahoo.com, myotherfriend@yahoo.com',   More receiver can be added separated by commas.
                subject: 'Contact from MonjiDev',
                text: `
                    Name: ${contact.name}
                    Mail: ${contact.email}
                    Subject: ${contact.email}
                    Message: ${contact.message}
                `
                // html:'<h1>Welcome</h1><p>That was easy!</p>'         html can be send like that
            }, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    // Return response of data saved and message sended
                    return res.status(200).send({contact: contactStored, message: true});
                }
            });

            // Return response of data saved
            return res.status(200).send({contact: contactStored, message: null});
        });
    },


}

// Exports the module to be used on routes files
module.exports = controller;