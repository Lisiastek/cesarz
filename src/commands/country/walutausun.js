// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'walutausun',
    description: 'usunięcie wcześniej utworzonej waluty',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name: "moneytag",
            description: "ID pieniądza poprostu",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3,
            autocomplete: true
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [PermissionsBitField.Flags.ManageChannels],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('moneytag').toUpperCase(); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT * from currency WHERE currencyTag = '${tag}' AND guildID = '${guildID}'`,
        async (err, res) => {
            if(err){
                console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
            }
            else{
                if(res.length>0){
                    if(tag == "MWR"){
                        interaction.editReply("Tej waluty nie można usunąć!")
                    }
                    else{

                        // usuwanie waluty z innych krajów (TODO)
                        db.query(`UPDATE countryeconomy SET currencyID = NULL, balance = balance / ${String(res[0]['currencyValue'])} WHERE currencyID = '${res[0]['id']}'`);

                        // usuwanie faktu istnienia waluty
                        await db.query(`delete from currency where currencyTag = '${tag}' AND guildID = '${guildID}'`, async (err,res) => {
                            if(err){
                                await interaction.editReply(`Niewiem jakiś problem był`);
                                console.log("Problem jakiś z mysql w walutanowa.js")
                            }
                            else{
                                
                                await interaction.editReply(`usunięto walutę ${tag} poprawnie!`);
                            }
                        });
                    }
                }
                else{
                    interaction.editReply("Taka waluta nie istnieje!");
                    

                }



                 

                
            }
        })


    }
}