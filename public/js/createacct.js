
// const user = document.querySelector('#emailInput').value.trim()
// const username = document.querySelector('#usernameInput').value.trim()

// let content = `
//   <h2>Welcome to the club, ${username}!</h2>
//   <p>Feel free to post your own jokes on the website!</p><br>
//   <p>Don't forget, you can also like and save the jokes!</p><br><br>
  
//   <p>If you have any questions, concerns, or remarks, feel free to reach out to us at this email inbox!</p><br><br>
  
//   <p>To those that enjoys the groans!! Cheers!</p>
  
//   `

// //   dadjokesarefun!!
//   async function main(e) {
//     e.preventDefault()

//     console.log('sending email')
//     let transporter = nodemailer.createTransport({
//         host: "yahoo",
//         auth: {
//             user: "dadjokesrus@gmail.com",
//             pass: 'dadjokesarefun!!'
//         }
//     })

//     let info = await transporter.sendMail({
//         from: "Dad Joker <dadjokesrus01@gmail.com>",
//         to: user,
//         subject: "Welcome to the Dad Joke club!",
//         html: content
//     })

//     console.log(info.messageId)
//     console.log(info.accepted)
//     console.log('==================================')
//     console.log(info.rejected)

// }

const createAcct = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameInput').value.trim();
    const email = document.querySelector('#emailInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
    const passwordconf = document.querySelector('#confirmpasswordInput').value.trim();

    if (password !== passwordconf) {
        alert('Your passwords don\'t match')
        return
    }
  
    if (username && email && password) {
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        main()
        document.location.replace('/');
      } else {
        alert('Failed to create an account.');
      }
    }
}


document.querySelector('#create-account-form').addEventListener('submit', main())