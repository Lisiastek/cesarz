const {ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'przelew',
    description: 'Przelewanie pieniedzy miedzy państwami',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name:"tagod",
            description: "skąd przelewasz (tag kraju)",
            min_length: 3,
            max_length: 3,
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name:"tagdo",
            description: "dokąd przelewasz (tag kraju)",
            min_length: 3,
            max_length: 3,
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name:"moneytag",
            description: "waluta w której wykonujesz przelew",
            min_length: 3,
            max_length: 3,
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name:"kwota",
            description: "Kwota przelewu",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name:"tytul",
            description: "Tytul przelewu",
            min_length: 2,
            max_length: 10,
            type: ApplicationCommandOptionType.String,
        },
        {
            name:"opis",
            description: "Opis przelewu",
            min_length: 3,
            max_length: 60,
            type: ApplicationCommandOptionType.String,
        }
    ],
    deleted: false,

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tagOd = await interaction.options.getString('tagod').toUpperCase(); 
        const tagDo = await interaction.options.getString('tagdo').toUpperCase(); 
        const tagWaluta = await interaction.options.getString('moneytag').toUpperCase(); 
        const kwota = await interaction.options.getNumber('kwota'); 
        const tytul = await interaction.options.getString('tytul') ? await interaction.options.getString('tytul') : "Brak tytułu"; 
        const opis = await interaction.options.getString('opis') ? await interaction.options.getString('opis') : "Opis pusty"; 

        const guildID = await interaction.guildId;

        const db = require('../../util/db.js');

        db.query(`SELECT country.id as countryID, currency.id as currencyID, currency.currencyValue as currencyValue, countryeconomy.balance as balance, currency.currencyTag as currencyTag, currency.currencyName as currencyName FROM country LEFT JOIN countryeconomy ON country.id = countryeconomy.countryID LEFT JOIN currency ON countryeconomy.currencyID = currency.id where country.countryID = '${tagOd}' AND country.guildID = '${guildID}'`, async (err, res) => {
            if(err){
                await interaction.editReply("Cos poszlo nie tak! (BŁĄD BOTA)9");
                console.log("Cos nie tak w przelew.js z mysql");
            }
            else{
                if(res.length <= 0){
                    const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                    iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                    .setDescription(`Bank odmówił wykonania przelewu z powodu:\n * nieistnienia kraju z tagiem **${tagOd}**`)
                    .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                    .setTimestamp()
                    .setColor("DarkGold");

                    await interaction.followUp({embeds: [emb]}); 
                }
                else{
                    db.query(`SELECT country.id as countryID, currency.id as currencyID, currency.currencyValue as currencyValue, countryeconomy.balance as balance, currency.currencyTag as currencyTag, currency.currencyName as currencyName FROM country LEFT JOIN countryeconomy ON country.id = countryeconomy.countryID LEFT JOIN currency ON countryeconomy.currencyID = currency.id where country.countryID = '${tagDo}' AND  country.guildID = '${guildID}'`, async (err, res2) => {
                        if(err){
                            await interaction.editReply("Cos poszlo nie tak! (BŁĄD BOTA)5");
                            console.log("Cos nie tak w przelew.js z mysql");
                        }
                        else{
                            if(res2.length <= 0){
                                const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                .setDescription(`Bank odmówił wykonania przelewu z powodu:\n * nieistnienia kraju z tagiem **${tagDo}**`)
                                .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                .setTimestamp()
                                .setColor("DarkGold");
            
                                await interaction.followUp({embeds: [emb]}); 
                            }
                            else{
                                db.query(`SELECT * FROM currency where guildID = '${guildID}' AND currencyTag = '${tagWaluta}'`, async (err,res3) => {
                                    if(err){
                                        await interaction.editReply("Cos poszlo nie tak! (BŁĄD BOTA)");
                                        console.log("Cos nie tak w przelew.js z mysql");
                                    }
                                    else{
                                        if((res3.length <= 0) && (tagWaluta != "MWR")){
                                            const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                            iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                            .setDescription(`Bank odmówił wykonania przelewu z powodu:\n * nieistnienia waluty z tagiem **${tagWaluta}**`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkRed");
                        
                                            await interaction.followUp({embeds: [emb]}); 
                                        }
                                        else{
                                            if(kwota <= 0){
                                                const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                                iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                                .setDescription(`Bank odmówił wykonania przelewu z powodu:\n * Nie można wykonywać transakcji na minusowe bądź zerowe wartości`)
                                                .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                                .setTimestamp()
                                                .setColor("DarkRed");
                            
                                                await interaction.followUp({embeds: [emb]}); 
                                            }
                                            else{
                                                // sprawdzanie czy gracz może rządzić krajem lub ma uprawnienia
                                                db.query(`SELECT playerID from countryplayers where id = '${res[0]['id']}'`, async (err,res4) => {
                                                    if(err){
                                                        console.log("cos poszło nie tak w opodatkowanie.js",err);
                                                        try {
                                                            await interaction.editReply("cos poszło nie tak w opodatkowanie.js:\n",err)
                                                        } catch (error) {}
                                                    }
                                                    else{
                                                        let jest = false;
                                                        if(await interaction.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) jest = true;
                                                        if(!jest){
                                                            for(const gracz of res4){
                                                                if(interaction.member.id == gracz['playerID']){
                                                                    jest = true;break;
                                                                }
                                                            }
                                                        }

                                                        // gdy nie jest
                                                        if(!jest){
                                                            const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                                            iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                                            .setDescription(`Bank odmówił wykonania przelewu z powodu:\n * Nie masz uprawnień do wykonywania transakcji z kraju z tagiem **${tagOd}}`)
                                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                                            .setTimestamp()
                                                            .setColor("DarkRed");
                                        
                                                            await interaction.followUp({embeds: [emb]}); 
                                                        }
                                                        else{
                                                            // tu jest juz po sprawdzeniu poprawnosci danych i uprawnien oraz czy jest dobra kwota

                                                            let temp_kwota;
                                                            let przebieg_operacji = '';
                                                            let czykrajstac = true;

                                                            // obsługa MWR
                                                            if(tagWaluta == "MWR")
                                                            {
                                                                // jeśli waluta kraju od to również MWR
                                                                if(res[0]['currencyID'] == null){
                                                                    temp_kwota = kwota;

                                                                    if(kwota > res[0]['balance']) czykrajstac = false;
                                                                }
                                                                // jeśli nie
                                                                else{
                                                                    temp_kwota = kwota * 1 /  res[0]['currencyValue'];

                                                                    przebieg_operacji += `* Przewalutowano z ${String(Math.round(temp_kwota*100)/100)} ${res[0]['currencyName']} (TAG: ${res[0]['currencyTag']}) na ${String(Math.round(kwota*100)/100)} MWR (TAG: MWR)\n`
    
                                                                    if(temp_kwota > res[0]['balance']) czykrajstac = false;
                                                                }
                                                            }
                                                            // jeśli waluta jest transakcji jest taka sama
                                                            else if(res[0]['currencyID'] == res3[0]['id']){
                                                                temp_kwota = kwota;

                                                                if(kwota > res[0]['balance']) czykrajstac = false;
                                                            }
                                                            // jesli nie
                                                            else{
                                                                temp_kwota = kwota * res3[0]['currencyValue'] /  res[0]['currencyValue'];

                                                                przebieg_operacji += `* Przewalutowano z ${String(Math.round(temp_kwota*100)/100)} ${res[0]['currencyName']} (TAG: ${res[0]['currencyTag']}) na ${String(Math.round(kwota*100)/100)} ${res3[0]['currencyName']} (TAG: ${res3[0]['currencyTag']})\n`

                                                                if(temp_kwota > res[0]['balance']) czykrajstac = false;
                                                            }


                                                            // jeżeli kraju nie stać na tą transakcję
                                                            if(!czykrajstac){
                                                                const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                                                iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                                                .setDescription(`Bank odmówił wykonania przelewu z powodu:\n * Skarbiec kraju z którego próbujesz wysłać pieniądze ma tylko ${String(res[0]['balance'])} a potrzebuje on conajmniej ${temp_kwota}`)
                                                                .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                                                .setTimestamp()
                                                                .setColor("DarkRed");
                                            
                                                                await interaction.followUp({embeds: [emb]}); 
                                                            }
                                                            // jeśli jednak stać
                                                            else{

                                                                let temp_kwota2;

                                                                // obsługa mwr
                                                                if(tagWaluta == "MWR"){                                                          // jeśli waluta kraju od to również MWR
                                                                    if(res2[0]['currencyID'] == null){
                                                                        temp_kwota2 = kwota;
                                                                    }
                                                                    else{
                                                                        temp_kwota2 = Math.round(kwota * 1 / res2[0]['currencyValue'] * 100) / 100;
                                                                        przebieg_operacji += `* Przewalutowano z ${String(Math.round(kwota*100)/100)} MWR (TAG: MWR) na ${String(Math.round(temp_kwota2*0.995*100)/100)} ${res2[0]['currencyName']} (TAG: ${res2[0]['currencyTag']}) z kosztem operacyjnym ${String(Math.round(temp_kwota2*0.005*100)/100)} ${res2[0]['currencyName']} (TAG: ${res2[0]['currencyTag']})\n`
                                                                        temp_kwota2 *= 0.995;
                                                                    }
                                                                }
                                                                // jeśli ten kraj posiada MWR
                                                                else if(res2[0]['currencyID'] == null){
                                                                    temp_kwota2 = Math.round(kwota * res3[0]['currencyValue'] / 1 * 100) / 100;
                                                                    przebieg_operacji += `* Przewalutowano z ${String(Math.round(kwota*100)/100)} ${res3[0]['currencyName']} (TAG: ${res3[0]['currencyTag']}) na ${String(Math.round(temp_kwota2*0.995*100)/100)} MWR (TAG: MWR) z kosztem operacyjnym ${String(Math.round(temp_kwota2*0.005*100)/100)} MWR (TAG: MWR)\n`
                                                                    temp_kwota2 *= 0.995;                                                              
                                                                }
                                                                // jeśli waluta kraju docelowego nie jest taka sama jak waluta przelewu
                                                                else if(res2[0]['currencyID'] != res3[0]['id']){
                                                                    temp_kwota2 = Math.round(kwota * res3[0]['currencyValue'] / res2[0]['currencyValue'] * 100) / 100;
                                                                    przebieg_operacji += `* Przewalutowano z ${String(Math.round(kwota*100)/100)} ${res3[0]['currencyName']} (TAG: ${res3[0]['currencyTag']}) na ${String(Math.round(temp_kwota2*0.995*100)/100)} ${res2[0]['currencyName']} (TAG: ${res2[0]['currencyTag']}) z kosztem operacyjnym ${String(Math.round(temp_kwota2*0.005*100)/100)} ${res2[0]['currencyName']} (TAG: ${res2[0]['currencyTag']})\n`
                                                                    temp_kwota2 *= 0.995;
                                                                }
                                                                // jeśli jest to defacto pomijamy ten krok
                                                                else{
                                                                    temp_kwota2 = kwota;
                                                                }
                                                                // finalna transakcja (najpierw zabieranie)
                                                                db.query(`UPDATE countryeconomy SET balance = (balance - ${temp_kwota}) WHERE countryID = '${res[0]['countryID']}'`, async (err, res9) => {
                                                                    if(err){
                                                                        console.log("Mysql error przelew.js");
                                                                        await interaction.editReply("Cos poszlo nie tak! (Błąd bota)1");
                                                                    }
                                                                    else{
                                                                        db.query(`UPDATE countryeconomy SET balance = (balance + ${temp_kwota2}) WHERE countryID = '${res2[0]['countryID']}'`, async (err, res9) => {
                                                                            if(err){
                                                                                console.log("Mysql error przelew.js");
                                                                                await interaction.editReply("Cos poszlo nie tak! (Błąd bota)2");
                                                                            }
                                                                            else{
                                                                                // tutaj juz przelew został dokonany więc w sumie, tylko to wyświetla rezultat
                                                                                if(przebieg_operacji == ''){
                                                                                    przebieg_operacji += "brak";
                                                                                }

                                                                                const emb = new EmbedBuilder().setAuthor({name: "Bank międzynarodowy", 
                                                                iconURL: 'https://e7.pngegg.com/pngimages/619/389/png-clipart-gold-coin-computer-icons-coin-gold-coin-trademark.png'})
                                                                .setDescription(`***PRZELEW MIĘDZYNARODOWY***\n\`\`\`
                                                                Przelew międzynarodowy tytułem "${tytul}" i dodatkowymi informacjami: "${opis}" został zlecony z skarbca ${tagOd} do skarbca ${tagDo}. Obierając za walutę obrachunkową ${res3[0] != undefined ? res3[0]['currencyName'] :"MWR"} zapisaną indeksem ${tagWaluta}.\n\n
                                                                Kwotą przelewu ustalone zostało ${kwota} ${res3[0] != undefined ? res3[0]['currencyName'] : "MWR"} (TAG: ${tagWaluta}).\n\n
                                                                Dodatkowe informacje:\n ${przebieg_operacji}
                                                                \`\`\``)
                                                                .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                                                .setTimestamp()
                                                                .setColor("DarkGold");
                                            
                                                                await interaction.followUp({embeds: [emb]}); 
                                                                            }
                                                                        }); 
                                                                    }
                                                                });

                                                            }



                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });                            
                            }
                        }
                    });
                }
            }
        });

    }

}