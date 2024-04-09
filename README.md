# DJ R US
 
![Static Badge](https://img.shields.io/badge/MIT-license?style=flat-square&label=License&labelColor=%23cdcdcd&color=salmon)  

## Description

This application provides endless entertainment in the form of dad jokes. If there's a lull in the conversation, or you just want to add to your punny repertoire this application is perfect for you. You can make your own posts with original jokes. There are like and comment buttons so others can share what they think about your dad humor! If you can't get someone else's joke out of your head, just save it in your bookmarks. You have your own profile that displays your own content and any bookmarked posts.

Deployed Application: [click me!](https://dj-r-us.onrender.com/)

Screenshot of Application: 

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Resources](#resources)
- [Contributing](#contributing)
- [Contact-Us](#contact-us)

## Installation

The deployed link is the active site, so installation is not required. BUT if you want to modify our code on your local machine, feel free to clone the repo and run the following commands. Please keep in mind this requires node.js and postgreSQL installed for it to function properly on your local machine.

Also, convert the `.env.EXAMPLE` file to `.env` file by removing the `.EXAMPLE`. Once file name is updated to `.env`, all of the content inside must be filled out with your own information. `DB_NAME` can be whatever database name you want to name, and so on and so forth.

For nodemailer pacakage to properly work to send the email on account creation, you must provide an email account which will send the email out to the user from along with password. The password may only work through an `app password` that you might have to set up through your email settings.

Install all the npm packages required
```
npm i
```

Then run the seed for seed data to work with:
```
npm run seed
```

- Then run this on root level of where `server.js` file lives to open it on your `localhost:3001/`

    ```
    node server.js
    ```
## Usage

This application can be used to connect with friends or other joke enthusiasts. It challenges you to create your own jokes, or share your favorites with everyone. There are a wide variety of dad joke generes out there so the possibilities are unlimited! You can use this application to bring puntastic jokes into your everyday conversations, and your downtime. 

See below for a peek at our website:

![Demo1](/assets/images/demo1.gif)
![Demo2](/assets/images/demo2.gif)


## Technologies

- HTML
- CSS
- Javascript
- PostgreSQL
- Bootstrap
- Handlebars


## Resources

NPM Packages used:
 - Nodemailer (for sending emails on create account)
 - Axios (fetching api data)
 - Node-schedule (scheduling fetching of api)
 - API from [icanhazdadjokes.com](https://icanhazdadjoke.com/) 

Other functional npm pacakages required for the codes to function:
 - Express / bcrypt / sequelize / dayjs / express-handlebars / handlebars / pg 

## Contributing

Feel free to reach out for any issues, remarks, or feature requests!


## Contact-Us

Contributors contact:

GitHub accounts [Eric Lee](https://github.com/ericeya), [Kyle Yee](https://github.com/kyleyee522), [Willie Yeh](https://github.com/willieyeh1), and [Jordan Aplon](https://github.com/JoAplon).