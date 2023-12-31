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
            max_length: 3,
            autocomplete: true
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

                    db.query(`SELECT * from countryeconomy LEFT JOIN countryinfo ON countryeconomy.countryID = countryinfo.countryID LEFT JOIN currency ON countryeconomy.currencyID = currency.id WHERE countryeconomy.countryID = '${id}'`,
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
                                {name:"ostatnie wpływy", value: res2[0]['ostatniprzychod'] != null ? String(res2[0]['ostatniprzychod']) : "Kraj nigdy nie miał :(", inline: true},
                                {name:"podatki",value:`${String(res2[0]['pod_cyw']*100)}%`, inline: true},
                                {name:"pkb",value: `${String(res2[0]['pkb'])} ${znakwaluty}`, inline: true},
                                {name:"prognozowany wzrost pkb",value:`${String(res2[0]['wzrostpkb']*100)}%`, inline: true},   
                                {name:"ostatni wzrost pkb", value: res2[0]['ostatniwzrostpkb'] != null ? String(res2[0]['ostatniwzrostpkb']) : "Kraj jeszcze nie zanotował", inline: true},     
                                {name:"waluta",value: `${znakwaluty} (TAG:` + (res2[0]['currencyTag'] != null ? String(res2[0]['currencyTag']) : "MWR") + ")", inline: true},                       
                                {name:"wartość waluty",value: `${znakwaluty} = ` + (res2[0]['currencyValue'] != null ? String(res2[0]['currencyValue']) : "1"), inline: true},
                                {name:"inflacja",value:`${String(res2[0]['inflacja']*100)}%`, inline: true},
                                {name:"inflacja całkowita",value:`${String(res2[0]['inflacjacalkowita']*100)}%`, inline: true},
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