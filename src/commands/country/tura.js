const {ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');
const db = require("../../util/db.js");

module.exports = {
    name: 'tura',
    description: 'Oblicza kolejną turę',
    // devOnly: false,
    // testOnly: false,
    // options: Object[],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const guildID = interaction.guildId;
        db.query(`SELECT * FROM guildVars where guildID = '${guildID}' AND varname='lastTurnDate'`, async (err, res) => {
            if(err){
                console.log("Błąd mysql w tura.js");
                await interaction.editReply("Błąd bota");
            }
            else{

                // sprawdzanie daty (system ochronny)
                if(res.length <= 0){
                    let _tempDate = new Date();
                    db.query(`INSERT INTO guildvars (varname, value, guildID) VALUES ('lastTurnDate', '${_tempDate.getTime()}', '${guildID}')`)
                }
                else{
                    let _tempDate = new Date(Number(res[0]['value']));

                    let _tempDate2 = new Date();
                    _tempDate2.setDate(_tempDate2.getDate() - 3);

                    if(_tempDate > _tempDate2){
                        const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                        iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                        .setDescription(`Bank odmówił obliczenia tury\n * System ochronny pilnuje by tura była obliczana maksymalnie raz na 3 dni`)
                        .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                        .setTimestamp()
                        .setColor("DarkGold");
    
                        await interaction.followUp({embeds: [emb]});             

                        return;
                    }
                }

                // dolicz deflację za użycie waluty i wzrost gospodarczy
                db.query(`UPDATE currency LEFT JOIN (select currency.id, if(avg(countryeconomy.wzrostpkb) is not null, avg(countryeconomy.wzrostpkb), 0) as sredniawzrostupkb from countryeconomy right join currency on currency.id = countryeconomy.currencyID group by currency.id) as sredniatabela ON currency.id = sredniatabela.id set currency.inflacja = if(round(currency.inflacja - (currency.liczbaoperacji / 2500 * currency.inflacja) - (sredniatabela.sredniawzrostupkb / 3 * currency.inflacja),2) > -0.2, round(currency.inflacja - (currency.liczbaoperacji / 2500 * currency.inflacja) - (sredniatabela.sredniawzrostupkb / 3 * currency.inflacja),2), -0.2) + 0.01, currency.liczbaoperacji = 0 WHERE currency.guildID = '${guildID}';`, (err,re1) => {



                // wzrost gospodarczy
                db.query(`update country, countryeconomy, countryinfo SET countryinfo.ostatniwzrostpkb = concat(round(countryeconomy.wzrostpkb*100,2), "%"), countryeconomy.pkb = round(countryeconomy.pkb + (countryeconomy.pkb * countryeconomy.wzrostpkb)), countryeconomy.wzrostpkb = 0 WHERE country.guildID = '${guildID}' and country.id = countryeconomy.countryID and countryeconomy.countryID = countryinfo.countryID;`, (err,re2) => {
                    if(err){
                        console.log("tura.js problem mysql");
                    }
                    else{
                        // inflacja
                        db.query(`UPDATE currency SET currency.inflacjacalkowita = currency.inflacjacalkowita + currency.inflacja, currency.currencyValue = round(currency.currencyValue - (currency.currencyValue * currency.inflacja),3) WHERE currency.guildID = '${guildID}';`, (err, res3) => {
                            if(err){
                                console.log("tura.js problem mysql");
                            }
                            else{
                                // balans
                                db.query(`UPDATE country, countryeconomy, countryinfo, currency SET countryeconomy.balance = round(countryeconomy.balance + (((countryinfo.populacja * countryeconomy.pod_cyw * 0.025) + (countryeconomy.pkb * countryeconomy.pod_cyw * 0.00001)) / currency.currencyValue),2), countryinfo.ostatniprzychod = concat(round((countryeconomy.balance + (((countryinfo.populacja * countryeconomy.pod_cyw * 0.025) + (countryeconomy.pkb * countryeconomy.pod_cyw * 0.00001)) / currency.currencyValue)),2), " ", currency.currencyName) where country.guildID = '${guildID}' and country.id = countryeconomy.countryID and countryeconomy.countryID = countryinfo.countryID and countryeconomy.currencyID = currency.id;`, async (err,res4) => {
                                    if(err){
                                        console.log("tura.js mysql problem finał")
                                    }
                                    else{
                                        const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                        iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                        .setDescription(`Poprawnie obliczono turę`)
                                        .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                        .setTimestamp()
                                        .setColor("DarkGold"); 
                                        await interaction.followUp({embeds: [emb]});
                                    }
                                });
                            }
                        });
                    }
                });


            });
             

                    

          



                

            }
        });
    }

}