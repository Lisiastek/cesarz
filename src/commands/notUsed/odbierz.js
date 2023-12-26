const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField} = require("discord.js");

module.exports = {
    name: 'odbierz',
    description: 'Pozwala na odebranie budżetu dla danego kraju',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name: "tag",
            description: "ID kraju poprostu",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3,
            autocomplete: true
        }
    ],
    deleted: true,

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 
        const flaga = interaction.options.getAttachment('flaga'); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT country.id as id, countryeconomy.balance as balance, countryeconomy.getBalanceLast as getBalanceLast FROM country LEFT JOIN countryeconomy ON country.id = countryeconomy.countryID where country.countryID = '${tag}' and country.guildID = ${guildID}`, async (err,res) => {
            if(err){
                console.log("cos poszło nie tak w opodatkowanie.js",err);
                try {
                    await interaction.editReply("cos poszło nie tak w opodatkowanie.js:\n",err)
                } catch (error) {}
            }
            else{
                if(res.length <= 0){
                    const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                    iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                    .setDescription(`Bank odmówił dostępu do konta z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
                    .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                    .setTimestamp()
                    .setColor("DarkGold");

                    await interaction.followUp({embeds: [emb]}); 
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
                                let _tempdate = new Date();
                                _tempdate.setDate(_tempdate.getDate() - 2);

                                if(res[0]['getBalanceLast'] != null) var _getBalanceLast = new Date(res[0]['getBalanceLast'])
                                else{
                                    var _getBalanceLast = new Date()
                                    _getBalanceLast.setDate(_getBalanceLast.getDate() - 12);
                                }

                                console.log(_getBalanceLast.toString(), _tempdate.toString());
                                if(_getBalanceLast < _tempdate){
                                    await interaction.followUp("tu by odebrano ale jeszcze nie dziala");
                                }
                                else{
                                    const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                    iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                    .setDescription(`Bank odmówił odebrania należności:\n * Należności można odbierać więcej niż raz na turę! `)
                                    .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                    .setTimestamp()
                                    .setColor("DarkGold");
                
                                    await interaction.followUp({embeds: [emb]});                                    
                                }
                            }
                            else{
                                const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                .setDescription(`Bank odmówił dostępu do konta z powodu:\n * problemu z autoryzacją jego własności. wątpimy w to że jesteś włascicielem tego konta.`)
                                .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                .setTimestamp()
                                .setColor("DarkGold");
            
                                await interaction.followUp({embeds: [emb]}); 
                            }
                        }
                    });
                    
                }
                
            }
        });

        
    }

}