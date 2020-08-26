const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

// sgMail.send({
//     to: 'choudharyac79@gmail.com',
//     from: 'choudharyac79@gmail.com',
//     subject: 'My first email with NodeJS',
//     text: 'I hope this one actually get to u'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'choudharyac79@gmail.com',
        subject: 'Thank you for joing us',
        // text: `Welcome to the family, ${name}. Let me know how you get along with the app`
        html: `<strong style='color:red; font-size:18px'>Welcome to the family, <b style='color:black'>${name}</b>. Let me know how you get along with the app</strong>`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'choudharyac79@gmail.com',
        subject: 'Cancelled Successfully',
        // text: `Welcome to the family, ${name}. Let me know how you get along with the app`
        html: `<strong style='color:blue; font-size:18px'>We are sorry to see you go, <b style='color:black'>${name}</b>. Is there something we could have done to improve?</strong>`
    })
}

module.exports ={
    sendWelcomeEmail,
    sendCancelEmail
}