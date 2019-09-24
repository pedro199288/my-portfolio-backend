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

// Mail options
const mailOptions = {
    from: 'pedro@monjidev.com',
    to: 'pedromonteagudo_@hotmail.com', // 'myfriend@yahoo.com, myotherfriend@yahoo.com',   More receiver can be added separated by commas.
    subject: 'Sending email with nodejs',
    text: 'That was easy! ',
    // html:'<h1>Welcome</h1><p>That was easy!</p>'         html can be send like that
}

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
