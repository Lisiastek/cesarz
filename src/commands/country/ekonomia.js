const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'ekonomia',
    description: 'Wyświetl ekonomię kraju',
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

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        await db.query(`SELECT id, countryName from country WHERE guildID = '${guildID}' AND countryID = '${tag}'`,
        (err, res) => {
            if(err){
                console.log("Something went wrong in ktorzadzi.js while working with database:\n\n",err);
            }
            else
            {
                if(res.length > 0){
                    const id = res[0]['id'];
                    const name = res[0]['countryName']

                    db.query(`SELECT * from countryeconomy LEFT JOIN currency ON countryeconomy.currencyID = currency.id WHERE countryID = '${id}'`,
                    (err, res2) => {
                        if(err){
                            console.log("Something went wrong in ktorzadzi.js while working with database:\n\n",err);
                        }else{
                            const znakwaluty = res2[0]['currencyName'] ? String(res2[0]['currencyName']) : "MWR";

                            const emb = new EmbedBuilder().setFooter({
                                text:":3"
                            }).setColor("LuminousVividPink")
                            .setTitle(`kraj ${name}`)
                            .setAuthor({ name: `Statystyki ogólne`})
                            .addFields(
                                {name:"Budżet", value: `${String(res2[0]['balance'])} ${znakwaluty}`, inline: true},
                                {name:"ustrój",value:"komunizm", inline: true},
                                {name:"podatki",value:`${String(res2[0]['pod_cyw']*100)}%`, inline: true},
                                {name:"pkb",value:"wysokie", inline: true},
                                {name:"inflacja",value:"32%", inline: true},
                            ).setTimestamp();

                            interaction.followUp({embeds: [emb]});
                        }
                    });
                }
                else{
                    interaction.followUp("Kraj z takim tagiem nie istnieje!");
                }
            }
        });
    }

}