// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'nowykraj',
    description: 'Pozwala na utworzenie kraju w wargamie',
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
            name: "nazwa",
            description: "Poprostu nazwa kraju",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 29
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [PermissionsBitField.Flags.ManageChannels],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 
        const name = interaction.options.getString('nazwa');

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT * from country WHERE countryID = '${tag}' OR countryName = '${name} AND guildID = ${guildID}'`,
        async (err, res) => {
            if(err){
                console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
            }
            else{
                if(res.length>0){
                    interaction.editReply("Kraj z takim ID lub nazwą już istnieje! wybierz inny");
                }
                else{
                    await db.query(`INSERT INTO country (countryID, guildID, countryName) VALUES ('${tag}','${guildID}', '${name}')`);
                    await interaction.editReply(`Utworzono kraj ${name} (o tagu: ${tag}), trwa tworzenie kanałów...`);



                    // tworzenie kanałów
                    const guild = interaction.guild;
                    const zwerfRole = await guild.roles.cache.find((r) => r.name === 'zweryfikowany');
                    const gameMasterRole = await guild.roles.cache.find((r) => r.name === 'Game Master');
                    const playerRole = await guild.roles.cache.find((r) => r.name === 'Gracz');

                    const countryRole = await guild.roles.create({
                        name: `${name}`,
                        color: '#1e1981',
                        reason: `bot: utworzenie roli kraju ${name}`,
                        mentionable: true
                    });

                    parentD = await guild.channels.create({
                        name: `${name}`,
                        type: ChannelType.GuildCategory,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });

                    const inf = await guild.channels.create({
                        name: `informacje`,
                        topic: `Tutaj podajesz najważniejsze informacje o kraju`,
                        type: ChannelType.GuildText,
                        parent: parentD,
                        permissionOverwrites: [
                            {
                                id: zwerfRole.id,
                                allow: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: countryRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            {
                                id: gameMasterRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            }   
                        ]
                    });

                    const dyp = await guild.channels.create({
                        name: `dyplomacja`,
                        topic: `Tutaj możesz prowadzić prywatną dyplomację`,
                        type: ChannelType.GuildText,
                        parent: parentD,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: playerRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            {
                                id: gameMasterRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },                            
                        ]
                    });


                    const inwestycje = await guild.channels.create({
                        name: `inwestycje`,
                        topic: `Tutaj możesz pisać swoje inwestycje`,
                        type: ChannelType.GuildText,
                        parent: parentD,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: playerRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: gameMasterRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },                            
                        ]
                    });

                    const szablony = await guild.channels.create({
                        name: `szablony`,
                        topic: `Tutaj możesz pisać swoje inwestycje`,
                        type: ChannelType.GuildText,
                        parent: parentD,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: playerRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: gameMasterRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },                            
                        ]
                    });

                    const wewnetrzne = await guild.channels.create({
                        name: `wewnetrzne`,
                        topic: `Tutaj możesz pisać swoje sprawy wewnetrzne`,
                        type: ChannelType.GuildText,
                        parent: parentD,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: playerRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: gameMasterRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },                            
                        ]
                    });

                    const armia = await guild.channels.create({
                        name: `armia`,
                        topic: `Tutaj możesz pisać swoje rzeczy o armii, niewiem nawet stan jeżeli chcesz`,
                        type: ChannelType.GuildText,
                        parent: parentD,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: playerRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: gameMasterRole.id,
                                allow: [PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.ViewChannel]
                            },                            
                        ]
                    });

                    await inf.send(`Prosimy o uzupełnienie <@&${countryRole.id}> :+1:`);
                    await armia.send("Sprostowanie co do armii: Tutaj możesz wysyłać swoje badania jak i statystyki swojej armii, do tego kanału masz dostęp tylko ty i GM!");

                    interaction.editReply(`Utworzono kraj ${name} (o tagu: ${tag})! Udało sie`)

                }
            }
        })


    }
}