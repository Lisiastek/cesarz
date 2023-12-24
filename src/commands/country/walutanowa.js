// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'walutanowa',
    description: 'Pozwala na utworzenie waluty w wargamie/rp',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name: "moneytag",
            description: "ID pieniądza poprostu",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3
        },
        {
            name: "znak",
            description: "polecam emotkę",
            type: ApplicationCommandOptionType.String,
            required: true,
            max_length: 5
        },
        {
            name: "wartosc",
            description: "startowa wartośc pieniądza",
            type: ApplicationCommandOptionType.Number,
            required: true,
            max_length: 5
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [PermissionsBitField.Flags.ManageChannels],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('moneytag').toUpperCase(); 
        const znak = interaction.options.getString('znak');
        const wartosc = interaction.options.getNumber("wartosc");

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT * from currency WHERE currencyTag = '${tag}' OR currencyName = '${znak}' AND guildID = '${guildID}'`,
        async (err, res) => {
            if(err){
                console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
            }
            else{
                if(res.length>0){
                    interaction.editReply("Taka waluta już istnieje, wybierz inną");
                }
                else{
                    if(wartosc == 0){
                        interaction.editReply("Wartość nie może równać się 0");
                    } 
                    else if(tag == "MWR"){
                        interaction.editReply("Tag MWR jest zarezerwowaną wartością dla walut, wybierz inną");
                    }
                    else{

                    }

                    await db.query(`INSERT INTO currency (currencyTag, currencyName, currencyValue, guildID) VALUES ('${tag}','${znak}','${wartosc}' ,'${guildID}')`, async (err,res) => {
                        if(err){
                            await interaction.editReply(`Niewiem jakiś problem był`);
                            console.log("Problem jakiś z mysql w walutanowa.js")
                        }
                        else{
                            await interaction.editReply(`Utworzono walutę ${tag} poprawnie!`);
                        }
                    });



                 

                }
            }
        })


    }
}