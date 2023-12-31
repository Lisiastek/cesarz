const {devs} = require("../../../config.json");
const getlocalcommands = require("../../util/getlocalcommands");
require("dotenv").config({
    path: '../../../.env'
});


module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand) return;
    if(interaction.isAutocomplete()) return;

    const localCommands = getlocalcommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!(devs.includes(interaction.member.id))){
                await interaction.reply({
                    content: "Ta komenda jest przeznaczona tylko i wyłącznie dla deweloperów bota!",
                    ephemeral: true
                });
                return;
            }
        }

        if(commandObject.testOnly){
            if(!(interaction.guild.id === process.env.TESTGUILD)){
                await interaction.reply({
                    content: "Ta komenda jest przeznaczona tylko i wyłącznie do użytku na testowym serwerze!",
                    ephemeral: true
                });
                return;
            }
        }

        if(commandObject.permissionsRequired?.length){
            for(const permission of commandObject.permissionsRequired){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: "Bot odmówił wykonania komendy ze względu na niewystarczające uprawnienia użytkownika!",
                        ephemeral: false
                    });
                    break;                  
                }
            }
        }

        if(commandObject.botPermissions?.length){
            for(const permission of commandObject.botPermissions){
                const bot = interaction.guild.members.me;

                if(!bot.permissions.has(permission)){
                    if(!interaction.member.permissions.has(permission)){
                        interaction.reply({
                            content: "Bot odmówił wykonania komendy ze względu na niewystarczające uprawnienia bota!",
                            ephemeral: false
                        });
                        break;                
                    }                  
                }
            }

        }

        await commandObject.callback(client, interaction);
        

    } catch (error) {
        console.log(`Error during executing command handler: ${error}`);
    }
}