// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, ChannelType, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'walutaustaw',
    description: 'usunięcie wcześniej utworzonej waluty',
    // devOnly: false,
    // testOnly: false,
    options: [
        {
            name: "tag",
            description: "tag kraju",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3
        },
        {
            name: "moneytag",
            description: "ID pieniądza poprostu",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 3,
            max_length: 3
        }
    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const tag = interaction.options.getString('tag').toUpperCase(); 
        const moneytag = interaction.options.getString('moneytag').toUpperCase(); 

        const db = require("../../util/db.js");
        const guildID = interaction.guildId;

        db.query(`SELECT * from currency WHERE currencyTag = '${moneytag}' AND guildID = '${guildID}'`,
        async (err, res) => {
            if(err){
                console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
            }
            else{
                if(res.length>0 || moneytag == "MWR"){
                    
 
                    db.query(`select currencyTag, balance, country.id as id, currencyValue from country LEFT JOIN countryeconomy ON country.id = countryeconomy.countryID LEFT JOIN currency ON countryeconomy.currencyID = currency.id WHERE country.countryID = '${tag}'`, (err,res2) => {
                        if(err){
                            console.log("Something went wrong in walutaustaw.js with mysql");
                        }
                        else{
                            if(res2 <=0){
                                interaction.editReply("Kraj z takim id nie istnieje!");
                            }
                            else{
                                let aktualnawartoscwaluty = 1;
                                let aktualnanazwa = "MWR";
                                console.log(aktualnanazwa)
                                if(res2[0]['currencyTag']){
                                    // jeśli ma swoją walutę
                                    aktualnawartoscwaluty = res2[0]['currencyValue'];
                                    aktualnanazwa = res2[0]['currencyTag'].toUpperCase()
                                }

                                // obsługa zmiany na domyślną walutę
                                let nowawartoscwaluty = 1;
                                let crid = "NULL";
                                if(!(moneytag == "MWR")){
                                    nowawartoscwaluty = res[0]['currencyValue'];
                                    crid = `'${String(res[0]['id'])}'`
                                }

                                console.log(aktualnawartoscwaluty, " ", nowawartoscwaluty)

                                const balans = res2[0]['balance'];
                                const nowybalans = balans / aktualnawartoscwaluty * nowawartoscwaluty;
                                const kurs = aktualnawartoscwaluty / nowawartoscwaluty;

                                db.query(`UPDATE countryeconomy SET currencyID = ${crid}, balance = '${String(nowybalans)}' WHERE countryID = '${String(res2[0]['id'])}'`, (err,res) => {
                                    if(err){
                                        console.log("Something went wrong in walutaustaw.js with mysql\n\n", err);
                                    }
                                    else{
                                        interaction.editReply(`Zmieniono walutę z ${aktualnanazwa} na ${moneytag} po kursie ${String(kurs)} za nową walutę`);
                                    }
                                });

                            }
                        }
                    });
                }
                else{
                    interaction.editReply("Taka waluta nie istnieje!");
                    

                }



                 

                
            }
        })


    }
}