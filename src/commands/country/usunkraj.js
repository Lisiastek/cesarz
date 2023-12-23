// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'usunkraj',
    description: 'Pozwala na usuniecie kraju w wargamie',
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

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [PermissionsBitField.Flags.ManageChannels],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;
        const guild = interaction.guild;

        db.query(`SELECT * from country WHERE countryID = '${tag}' AND guildID = '${guildID}'`,
        async (err, res) => {
            if(err){
                console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
            }
            else{
                if(res.length>0){
                    await interaction.editReply("Usuwanie kraju, czekaj...");

                    const countryName = res[0]['countryName'];
                    const countryID = res[0]['id'];
                    var errlist = "Brak błędów";

                    // usuwanie roli
                    try {
                        const countryRole = await guild.roles.cache.find((r) => r.name === countryName);
                        await countryRole.delete("Kraj został usunięty");
                    } catch (error) {
                        errlist = "* Stwierdzono problem: Ktoś usunął role sterowaną przez botą, pomijam usuwanie tej roli!\n";
                    }


                    // usuwanie kanałów i kategori
                    try {
                        const countryCategory = await guild.channels.cache.find(channel => channel.name === countryName);
                        for(let [id, child] of countryCategory.children.cache){
                            await child.delete()
                        }
                        await countryCategory.delete();
    
                    } catch (error) {
                        errlist = "* Usunięto kanały/kategorie zarządzane przez bota, pomijam usuwanie kanałów!\n"
                    }

                    //usuwanie wpisów z bazy

                    db.query(`DELETE FROM countryPlayers WHERE id = '${countryID}'`, (err,res) => {
                        if(err){
                            console.log("error occured during usunkraj.js (mysql)",err);
                        }
                        else{
                            db.query(`DELETE FROM country WHERE guildID='${guildID}' AND id='${countryID}'`, async (err, res2) => {
                                if(err){
                                    console.log("error occured during usunkraj.js (mysql)",err); 
                                }
                                else {
                                    try {
                                        await interaction.editReply("Poprawnie usunięto kraj!\n",errlist);
                                    } catch (error) {}
                                }
                            });
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