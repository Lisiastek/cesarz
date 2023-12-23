const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'ktorzadzi',
    description: 'Sprawdź kto zarządza danym krajem',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name: "tag",
            description: "ID kraju poprostu",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3
        }
    ],
    deleted: false,

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        await db.query(`SELECT id from country WHERE guildID = '${guildID}' AND countryID = '${tag}'`,
        (err, res) => {
            if(err){
                console.log("Something went wrong in ktorzadzi.js while working with database:\n\n",err);
            }
            else
            {
                if(res.length > 0){
                    const id = res[0]['id'];
                    db.query(`SELECT playerID from countryPlayers WHERE id = ${id}`,
                    (err, res2) => {
                        if(err){
                            console.log("Something went wrong in ktorzadzi.js while working with database:\n\n",err);
                        }else{
                            text = "Krajem tym rządzą:\n\n"
                            for(const player of res2){
                                text += `* <@${player['playerID']}> \n`;
                            }
                            interaction.followUp(text);
                        }
                    });
                }
                else{
                    interaction.followUp("Kraj z takim tagiem nie istnieje!");
                }
            }
        });
    }

}