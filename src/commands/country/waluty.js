const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'waluty',
    description: 'Pokazuje listę walut',
    // devOnly: false,
    // testOnly: false,
    // options: Object[],
    deleted: false,

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const db = require("../../util/db.js");
        db.query("SELECT * FROM currency order by currencyValue DESC;", async (err, res) => {
            if(err){
                console.log("Jakis problem z bazą w waluty.js");
                interaction.editReply("Przepraszamy ale jakiś problem z bazą danych oguem");
            }
            else{
                text = "";
                el = 1;
                for(const element of res){
                    text += `* ${el}. ${element['currencyName']} (TAG: ${element['currencyTag']}, w: ${String(element['currencyValue'])})\n`;
                    el+=1;
                }
                const emb = new EmbedBuilder().setAuthor({name: "Kantor walut", 
                iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                .setDescription(`Kantor odesłał listę walut:\n ${text}`)
                .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                .setTimestamp()
                .setColor("DarkGold");

                await interaction.followUp({embeds: [emb]});
            }
        })
    }

}