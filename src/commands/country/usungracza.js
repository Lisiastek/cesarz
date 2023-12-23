const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'usungracza',
    description: 'usuwa gracza z kraju',
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
        },
        {
            name: "gracz",
            description: "gracz którego chcesz usunąć",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [PermissionsBitField.Flags.ManageChannels],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 
        const name = interaction.options.getMember('gracz');

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT id from country WHERE guildID = '${guildID}' AND countryID = '${tag}'`, (err,res) => {
            if(err){
                console.log("Something went wrong in dodajgracza.js: ", err)
            }
            else{
                if(res.length > 0){
                    var id = res[0]['id'];
                    db.query(`SELECT playerID FROM countryPlayers INNER JOIN country ON countryplayers.id = country.id WHERE country.id = '${id}' and playerID = '${name.id}'`, (err, res2)=>{
                        if(err){
                            console.log("Something went wrong in dodajgracza.js: ", err)
                        }else{
                            if(res2.length <= 0){
                                interaction.followUp("Tego gracza nie ma w tym kraju!")
                            }else{
                                db.query(`DELETE FROM countryPlayers where id='${id}' AND playerID='${name.id}';`,
                                (err, res2) => {
                                    if(err){
                                        console.log("Something went wrong in dodajgracza.js", err);
                                    }
                                    else{
                                        interaction.followUp(`poprawnie usunięto <@${name.id}> jako użytkownika kraju o tagu ${tag}`);
                                    }
                                });
                            }
                        }
                    });

                }
                else{
                    interaction.followUp("Taki kraj nie istnieje!");
                }
            }

        });

    }
}