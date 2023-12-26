// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'flaga',
    description: 'umożliwia zmianę opodatkowania w kraju',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name: "tag",
            description: "tag kraju",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3,
            autocomplete: true
        },
        {
            name: "flaga",
            description: "Nowa flaga kraju",
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 
        const flaga = interaction.options.getAttachment('flaga'); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT * FROM country where countryID = '${tag}' and guildID = ${guildID}`, async (err,res) => {
            if(err){
                console.log("cos poszło nie tak w opodatkowanie.js",err);
                try {
                    await interaction.editReply("cos poszło nie tak w opodatkowanie.js:\n",err)
                } catch (error) {}
            }
            else{
                if(res.length <= 0){
                    await interaction.editReply("Kraj z takim tagiem nie istnieje!");
                }
                else{
                    db.query(`SELECT playerID from countryplayers where id = '${res[0]['id']}'`, async (err,res2) => {
                        if(err){
                            console.log("cos poszło nie tak w opodatkowanie.js",err);
                            try {
                                await interaction.editReply("cos poszło nie tak w opodatkowanie.js:\n",err)
                            } catch (error) {}
                        }
                        else{
                            let jest = false;
                            if (interaction.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) jest = true;
                            if(!jest){
                                for(const gracz of res2){
                                    if(interaction.member.id == gracz['playerID']){
                                        jest = true;break;
                                    }
                                }
                            }
                            if(jest){
                                db.query(`UPDATE countryinfo SET flagURL = '${String(flaga.attachment)}' where countryID = '${res[0]['id']}'`, async (err,res) => {
                                    if(err){
                                        console.log("cos poszło nie tak w opodatkowanie.js",err);
                                        try {
                                            await interaction.editReply("cos poszło nie tak:\n",err)
                                        } catch (error) {}
                                    }
                                    else{
                                        await interaction.editReply("Poprawnie zmieniono flagę :3");
                                    }
                                });
                            }
                            else{
                                await interaction.editReply("no przepraszam bardzo ale się przydałoby rządzić tym krajem...");
                            }
                        }
                    });
                    
                }
                
            }
        });

    }
}