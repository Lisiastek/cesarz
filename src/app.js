require("dotenv").config();

const {Client, IntentsBitField, ActivityType} = require('discord.js');

const eventHandler = require('./handlers/eventHandler.js');
// const { presenceHandler } = require('./handlers/presenceHandler.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,   
    ]
});

eventHandler(client);


// client.on('ready', (c) => {

    
//     client.user.setActivity({
//         name: 'ciebie jak śpisz :3',
//         type: ActivityType.Streaming,
//         url: "https://www.youtube.com/watch?v=1hOD8Pe89Vc"
//     });




//     console.log('Klient działa');
// });

client.login(process.env.TOKEN);



// const express = require('express');
// const mysql = require('mysql');


// const app = express();
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'cesarz'
// });

// db.connect((err) => {
//    if(err){
//     throw err;
//    } 
//    else{
//     console.log("Mysql successfully connected!")
//    }
// });


// app.listen('3000', () => {
//     console.log("Server started on port 3000")
// })