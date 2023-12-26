const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'kurs',
    description: 'Wyświetl aktualny kurs walut',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name:"moneytag1",
            type:ApplicationCommandOptionType.String,
            min_length:3,
            max_length:3,
            description:"Tag waluty z której jest przeliczane",
            required:true,
            autocomplete: true
        },
        {
            name:"moneytag2",
            type:ApplicationCommandOptionType.String,
            min_length:3,
            max_length:3,
            description:"Tag waluty do której jest przeliczane",
            required:true,
            autocomplete: true
        },
        {
            name:"wartosc",
            type:ApplicationCommandOptionType.Number,
            min_length:3,
            max_length:3,
            description:"Ile przeliczyć (zostawisz puste = 1)"
        }
    ],
    deleted: false,

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag1 = await interaction.options.getString('tag1').toUpperCase();
        const tag2 = await interaction.options.getString('tag2').toUpperCase();

        const wartosc = await interaction.options.getNumber('wartosc') ? await interaction.options.getNumber('wartosc') : 1;

        const db = require("../../util/db.js");
        db.query(`SELECT * from currency where currencyTag = '${tag1}'`, (err,res) => {
            if(err){
                console.log("Cos poszło nie tak! w kurs.js z mysql");
            }
            else{
                db.query(`SELECT * from currency where currencyTag = '${tag2}'`, async (err, res2) => {
                    if(err){
                        console.log("Cos poszło nie tak! w kurs.js z mysql");
                    }
                    else{
                        if((res.length <= 0) && tag1 != "MWR"){
                            const emb = new EmbedBuilder().setAuthor({name: "Wystąpił problem!"})
                            .setDescription(`Kantor walut odmówił obliczenia kursu na podstawie:\n\n
                            * Nie znaleziono waluty o id: ${tag1}`).setColor("DarkRed")
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp();

                            await interaction.followUp({embeds: [emb]});
                        }
                        else if((res2.length <= 0) && tag2 != "MWR"){
                            const emb = new EmbedBuilder().setAuthor({name: "Wystąpił problem!"})
                            .setDescription(`Kantor walut odmówił obliczenia kursu na podstawie:\n\n
                            * Nie znaleziono waluty o id: ${tag2}`).setColor("DarkRed")
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp();

                            await interaction.followUp({embeds: [emb]});                           
                        }
                        else{
                            const wartoscWalutypierwsza = res.length > 0 ? res[0]['currencyValue'] : 1;
                            const wartoscWalutyDruga = res2.length > 0 ? res2[0]['currencyValue'] : 1;

                            const TagWalutypierwsza = res.length > 0 ? res[0]['currencyTag'] : "MWR";
                            const TagWalutyDruga = res2.length > 0 ? res2[0]['currencyTag'] : "MWR";      
                            const NazwaWalutypierwsza = res.length > 0 ? res[0]['currencyName'] : "MWR";
                            const NazwaWalutyDruga = res2.length > 0 ? res2[0]['currencyName'] : "MWR";      
                            
                            const finalnawartosc = Math.round(wartosc * wartoscWalutypierwsza / wartoscWalutyDruga * 100)/100;

                            const emb = new EmbedBuilder().setAuthor({name: "Kantor walut", 
                            iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                            .setDescription(`Kantor odesłał kurs walut:\n\n * ${wartosc} ${NazwaWalutypierwsza} (TAG: ${TagWalutypierwsza}) \n=============\n* ${finalnawartosc} ${NazwaWalutyDruga} (TAG: ${TagWalutyDruga})`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkGold");

                            await interaction.followUp({embeds: [emb]}); 
                        }

                    }
                });
            }
        });

    }

}