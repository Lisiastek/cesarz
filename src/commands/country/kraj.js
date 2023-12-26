const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'kraj',
    description: 'Sprawdź kto zarządza danym krajem',
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

        db.query(`SELECT * from country LEFT JOIN countryeconomy ON country.id = countryeconomy.countryID LEFT JOIN countryinfo ON country.id = countryinfo.countryID LEFT JOIN currency ON currency.id = countryeconomy.currencyID WHERE country.guildID = '${guildID}' AND country.countryID = '${tag}'`,
            (err, res) => {
                if (err) {
                    console.log("Something went wrong in ktorzadzi.js while working with database:\n\n", err);
                }

                else {
                    if (res.length > 0) {
                        const id = res[0]['countryID'];
                        const name = res[0]['countryName'];

                        db.query(`SELECT playerID from countryPlayers WHERE id = ${id}`,
                            (err, res2) => {
                                if (err) {
                                    console.log("Something went wrong in ktorzadzi.js while working with database:\n\n", err);
                                } else {
                                    var managers = " ";
                                    // kto rządzi krajem
                                    for (const player of res2) {
                                        managers += `<@${player['playerID']}> `;
                                    }

                                    const emb = new EmbedBuilder().setFooter({
                                        text: ":3"
                                    }).setColor("LuminousVividPink")
                                        .setTitle(`kraj ${name}`)
                                        .setAuthor({ name: `Statystyki ogólne` })
                                        .addFields(
                                            { name: "Władca", value: res[0]['wladca'] ? res[0]['wladca'] : "Brak", inline: true },
                                            { name: "ustrój", value: res[0]['ustroj'] ? res[0]['ustroj'] : "Nie sprecyzowano", inline: true },
                                            { name: "populacja", value: res[0]['populacja'] ? String(res[0]['populacja']) : "Brak", inline: true },
                                            { name: "podatki", value: `${String(res[0]['pod_cyw']*100)}%`, inline: true },
                                            { name: "pkb", value: `${String(res[0]['pkb'])} ${res[0]['currencyName'] ? res[0]['currencyName'] : "MWR"}`, inline: true },
                                            { name: "inflacja", value: `${String(res[0]['inflacja']*100)}%`, inline: true },
                                            { name: "Gracze", value: managers }
                                        ).setTimestamp();

                                        if(res[0]['flagURL'] != null){
                                            emb.setImage(res[0]['flagURL']);
                                        }

                                    interaction.followUp({ embeds: [emb] });
                                }
                            });
                    }
                    else {
                        interaction.followUp("Kraj z takim tagiem nie istnieje!");
                    }
                }
            });
    }

}