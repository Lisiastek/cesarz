const {ActivityType} = require('discord.js');

module.exports = (client, interaction) => {

    client.user.setActivity({
    name: 'ciebie jak śpisz :3',
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=1hOD8Pe89Vc"
    });

    console.log("Presence has been set! ");
};