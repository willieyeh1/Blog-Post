const nodemailer = require('nodemailer')

// const user = document.querySelector('#emailInput').value.trim()
// const username = document.querySelector('#usernameInput').value.trim()



// //   dadjokesarefun!!
  async function mainEmail(user, username) {

    let content = `
    <h2>Welcome to the club, ${username}!</h2>
    <p>Feel free to post your own jokes on the website!</p><br>
    <p>Don't forget, you can also like and save the jokes!</p><br><br>
    
    <p>If you have any questions, concerns, or remarks, feel free to reach out to us at this email inbox!</p><br><br>
    
    <p>To those that enjoys the groans!! Cheers!</p>
    
    `

    console.log('sending email')
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "dadjokesrus01@gmail.com",
            pass: 'vnoi phyi gdcs unph'
        }
    })

    let info = await transporter.sendMail({
        from: "dadjokesrus01@gmail.com",
        to: user,
        subject: "Welcome to the Dad Joke club!",
        html: content
    })

    console.log(info.messageId)
    console.log(info.accepted)
    console.log('==================================')
    console.log(info.rejected)

}

module.exports = mainEmail