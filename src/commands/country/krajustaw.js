// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'krajustaw',
    description: 'Pozwala na zmianę parametrów kraju',
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
            name: "jaka",
            description: "jaka wartosc",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name:"populacja",
                    value:"populacja"
                },
                {
                    name:"wladca",
                    value:"wladca"
                },
                {
                    name:"ustroj",
                    value:"ustroj"
                }
            ]
        },
        {
            name: "wartosc",
            description: "Poprostu nowa wartość",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = await interaction.options.getString('tag').toUpperCase(); 
        const name = await interaction.options.getString('nazwa'); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;
        const guild = interaction.guild;




        db.query(`SELECT countryName from country WHERE countryID = '${tag}' AND guildID = '${guildID}'`,
        async (err, res) => {
            if(err){
                console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
            }
            else{
                if(res.length>0){
                    await interaction.editReply("Kiedyś sie tu zrobi");

                  
                }
                else{
                    await interaction.editReply("Kraj z takim tagiem nie istnieje! \n");
                }
                   
            }
        })


    }
}