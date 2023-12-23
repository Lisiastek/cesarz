const getallfiles = require('../util/getallfiles');
const path = require('path');

module.exports = (client) => {
    const eventFolders = getallfiles(
        path.join(__dirname, '..', 'events'),
        true
    );

    for(const folder of eventFolders){
        const files = getallfiles(folder);
        files.sort((a,b) => a > b);

        const eventName = folder.split('\\').pop();
        
        client.on(eventName, async (interaction) => {
            for(file of files){
                const eventFunction = require(file);
                await eventFunction(client, interaction);
            }
        })


    }



    // const {ActivityType} = require('discord.js');
    

    // client.on('ready', ()=> {
    //     client.user.setActivity({
    //         name: 'ciebie jak śpisz :3',
    //         type: ActivityType.Streaming,
    //         url: "https://www.youtube.com/watch?v=1hOD8Pe89Vc"
    //     });
    
    // })
}