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

                    db.query(`SELECT playerID from countryPlayers WHERE id = ${id}`,
                    (err, res2) => {
                        if(err){
                            console.log("Something went wrong in ktorzadzi.js while working with database:\n\n",err);
                        }else{
                            var managers=" ";
                            // kto rządzi krajem
                            for(const player of res2){
                                managers += `<@${player['playerID']}> `;
                            }

                            const emb = new EmbedBuilder().setFooter({
                                text:":3"
                            }).setColor("LuminousVividPink")
                            .setTitle(`kraj ${name}`)
                            .setAuthor({ name: `Statystyki ogólne`})
                            .addFields(
                                {name:"Władca", value: "Benito mussolini", inline: true},
                                {name:"ustrój",value:"komunizm", inline: true},
                                {name:"populacja", value: "502004212121", inline: true},
                                {name:"podatki",value:"wysokie", inline: true},
                                {name:"pkb",value:"wysokie", inline: true},
                                {name:"inflacja",value:"32%", inline: true},
                                {name:"Gracze", value: managers},
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