// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'krajnazwa',
    description: 'Pozwala na zmianę nazwy kraju',
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
            description: "Poprostu nowa nazwa kraju",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 29
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageRoles],

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
                    await interaction.editReply("Czekaj... zmieniamy wszystko...");

                    var errlist = "";

                    // zmiana nazwy kanału
                    try {
                        await guild.channels.fetch();
                        // const channelCategory = await guild.channels.fetch().find(channel => channel === res[0]['countryName']);
                        // await guild.channels.fetch().then(

                        // )
                        const channelCategory = await guild.channels.cache.find(channel => channel.name === res[0]['countryName']);
                        await channelCategory.setName(name, `Zmiana nazwy kraju z ${res[0]['countryName']} na ${name} (TAG: ${tag})`);
                    } catch (error) {
                        errlist += "* Brak kanału kraju, stwórz go! (ma być taka sama nazwa jak nazwa kraju)\n"
                    }

                    // zmiana nazwy roli
                    try {
                        const role = await guild.roles.cache.find(role => role.name === res[0]['countryName']);
                        await role.setName(name, `Zmiana nazwy kraju z ${res[0]['countryName']} na ${name} (TAG: ${tag})`);
                    } catch (error) {
                        throw error;
                        errlist += "* Brak roli kraju, stwórz ją! (ma być taka sama nazwa jak nazwa kraju)\n"
                    }


                    db.query(`UPDATE country SET countryName= '${name}' WHERE countryID = '${tag}' AND guildID = '${guildID}'`, async (err,res) => {
                        if(err){
                            console.log("error occured during usunkraj.js (mysql)",err);
                        }
                        else{
                            if(!errlist)
                                await interaction.editReply("Zmieniono poprawnie nazwę kraju!");
                            else
                                await interaction.editReply("Zmieniono poprawnie nazwę kraju!\nJednakże pare zastrzeżeń:\n"+errlist);
                        }
                    });
                }
                else{
                    await interaction.editReply("Kraj z takim tagiem nie istnieje! \n");
                }
                   
            }
        })


    }
}