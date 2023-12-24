// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'opodatkowanie',
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
            max_length: 3
        },
        {
            name: "sila",
            description: "opodatkowanie",
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
                {
                    name: "brak podatków (0%)",
                    value: 0
                },
                {
                    name: "raj podatkowy (2%)",
                    value: 0.02
                },      
                {
                    name: "opodatkowanie bardzo małe (5%)",
                    value: 0.05
                },   
                {
                    name: "opodatkowanie małe (10%)",
                    value: 0.10
                },    
                {
                    name: "opodatkowanie normalne (20%)",
                    value: 0.20
                },       
                {
                    name: "opodatkowanie wysokie (25%)",
                    value: 0.20
                },      
                {
                    name: "opodatkowanie wysokie (40%)",
                    value: 0.40
                },   
                {
                    name: "opodatkowanie dratyczne (60%)",
                    value: 0.40
                },   
            ]
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 
        const sila = interaction.options.getNumber('sila'); 

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
                                db.query(`UPDATE countryeconomy SET pod_cyw = ${String(sila)} where countryID = '${res[0]['id']}'`, async (err,res) => {
                                    if(err){
                                        console.log("cos poszło nie tak w opodatkowanie.js",err);
                                        try {
                                            await interaction.editReply("cos poszło nie tak:\n",err)
                                        } catch (error) {}
                                    }
                                    else{
                                        await interaction.editReply("Poprawnie zmieniono opodatkowanie!");
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