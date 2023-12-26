const {ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder} = require('discord.js');
const db = require("../../util/db.js");

module.exports = {
    name: 'waluta',
    description: 'zarządzanie walutami',
    // devOnly: false,
    // testOnly: false,
    options: [


        // zarządzanie walutą

        // lista walut
        {
            name: 'lista',
            description: 'Pokazuje listę walut',
            type: ApplicationCommandOptionType.Subcommand,
        },
        // dodawanie
        {
            name: 'nowa',
            description: 'Pozwala na utworzenie waluty w wargamie/rp',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "moneytag",
                    description: "ID pieniądza poprostu",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    min_length: 3,
                    max_length: 3,
                    autocomplete: true
                },
                {
                    name: "znak",
                    description: "polecam emotkę",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    max_length: 5
                },
                {
                    name: "wartosc",
                    description: "startowa wartośc pieniądza",
                    type: ApplicationCommandOptionType.Number,
                    required: true,
                    max_length: 5
                }
            ]
        
        },

        // usuwanie
        {
            name: "usun",
            description: "usun walutę",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "moneytag",
                    description: "ID pieniądza poprostu",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    min_length: 3,
                    max_length: 3,
                    autocomplete: true
                }               
            ]
        },


        // ustawianie waluty na danym kraju
        {
        name: 'ustaw',
        description: 'ustawianie wcześniej utworzonej waluty',
        type: ApplicationCommandOptionType.Subcommand,    
        options: [
            {
                name: "tag",
                description: "tag kraju",
                type: ApplicationCommandOptionType.String,
                required: true,
                min_length: 3,
                max_length: 3,
                autocomplete: true
            },
            {
                name: "moneytag",
                description: "ID pieniądza poprostu",
                type: ApplicationCommandOptionType.String,
                required: true,
                min_length: 3,
                max_length: 3,
                autocomplete: true
            }
            ]
        },

        // do ustawiania

        // inflacja
        {
            name: "inflacja",
            description: "zarządzanie inflacją waluty",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw inflacje",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "moneytag",
                                description: "ID waluty poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "kwota",
                                description: "Kwota na ktorą zostanie ustawiona inflacja (ułamek dziesiętny)",
                                type: ApplicationCommandOptionType.Number,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien inflację o określoną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmieniona inflacja (ułamek dziesiętny ;))",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                },
                {
                    name: "zmienprocent",
                    description: "zmien inflacje o określony %",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "procent",
                            description: "Kwota o ktorą zostanie zmieniona inflacja (ułamek dziesiętny)",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },


        // inflacja calkowita
        {
            name: "inflacjacalkowita",
            description: "zarządzanie inflacją całkowitą waluty",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw inflacje całkowitą",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "moneytag",
                                description: "ID waluty poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "kwota",
                                description: "Kwota na ktorą zostanie ustawiona inflacja całkowita (ułamek dziesiętny)",
                                type: ApplicationCommandOptionType.Number,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien inflację całkowitą o określoną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmieniona inflacja  całkowita (ułamek dziesiętny ;))",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                },
                {
                    name: "zmienprocent",
                    description: "zmien inflacje całkowitą o określony %",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "procent",
                            description: "Kwota o ktorą zostanie zmieniona inflacja całkowita (ułamek dziesiętny)",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },

        // liczba operacji
        {
            name: "liczbaoperacji",
            description: "zarządzanie liczbą operacji dokonanych na walucie w tej turze",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw liczbe operacji",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "moneytag",
                                description: "ID waluty poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "kwota",
                                description: "Kwota na ktorą zostanie ustawiona liczba operacji",
                                type: ApplicationCommandOptionType.Number,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien liczbę operacji o określoną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmieniona liczba operacji",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                },
                {
                    name: "zmienprocent",
                    description: "zmien liczbę operacji określony %",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "procent",
                            description: "Kwota o ktorą zostanie zmieniona liczba operacji (ułamek dziesiętny)",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },

        // wartość waluty
        {
            name: "wartosc",
            description: "zarządzanie wartością waluty",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw wartosc",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "moneytag",
                                description: "ID waluty poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "kwota",
                                description: "Kwota na ktorą zostanie ustawiona waluta",
                                type: ApplicationCommandOptionType.Number,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien wartosc waluty o okresloną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmieniona wartość waluty",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                },
                {
                    name: "zmienprocent",
                    description: "zmien wartość waluty określony %",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "moneytag",
                            description: "ID waluty poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "procent",
                            description: "Kwota o ktorą zostanie zmieniona wartość waluty (ułamek dziesiętny)",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },

    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const guildID = interaction.guildId;

        const moneytag = await interaction.options.getString('moneytag')?.toUpperCase(); 
        const tag = await interaction.options.getString('tag')?.toUpperCase(); 


        const pierwszagrupa = await interaction.options.getSubcommandGroup(false) ? await interaction.options.getSubcommandGroup(false) :
        await interaction.options.getSubcommand(false);

        switch(pierwszagrupa){

            // inflacja
            case 'inflacja':{
                db.query(`SELECT * from currency where guildID = '${guildID}' AND currencyTag = '${moneytag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia waluty z tagiem **${moneytag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            switch(await interaction.options.getSubcommand(false)){
                                // ustaw
                                case 'ustaw':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET inflacja = '${String(kwota)}' WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji waluty ${res[0]['currencyName']} (TAG: ${moneytag}) na kwotę ${String(kwota * 100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien
                                case 'zmien':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET inflacja = (inflacja + '${String(kwota)}') WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o kwotę ${String(kwota * 100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien o procent
                                case 'zmienprocent':{
                                    const kwota = await interaction.options.getNumber('procent'); 
                                    if(kwota > 1 || kwota < -1){
                                        interaction.editReply("DEBILU TO MA BYC W UŁAMKU DZIESIETNYM :(");
                                        return;
                                    }

                                    db.query(`UPDATE currency SET inflacja = (inflacja + ('${String(kwota)}' * inflacja)) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o procent ${String(kwota*100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                            }
                        }
                    }
                });
                break;
            }            




            // inflacja calkowita
            case 'inflacjacalkowita':{
                db.query(`SELECT * from currency where guildID = '${guildID}' AND currencyTag = '${moneytag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia waluty z tagiem **${moneytag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            switch(await interaction.options.getSubcommand(false)){
                                // ustaw
                                case 'ustaw':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET inflacjacalkowita = '${String(kwota)}' WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji całkowitej waluty ${res[0]['currencyName']} (TAG: ${moneytag}) na kwotę ${String(kwota * 100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien
                                case 'zmien':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET inflacjacalkowita = (inflacjacalkowita + '${String(kwota)}') WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji calkowitej waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o kwotę ${String(kwota * 100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien o procent
                                case 'zmienprocent':{
                                    const kwota = await interaction.options.getNumber('procent'); 
                                    if(kwota > 1 || kwota < -1){
                                        interaction.editReply("DEBILU TO MA BYC W UŁAMKU DZIESIETNYM :(");
                                        return;
                                    }

                                    db.query(`UPDATE currency SET inflacjacalkowita = (inflacjacalkowita + ('${String(kwota)}' * inflacjacalkowita)) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji całkowitej waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o procent ${String(kwota*100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                            }
                        }
                    }
                });
                break;
            }           



            // liczba operacji
            case 'liczbaoperacji':{
                db.query(`SELECT * from currency where guildID = '${guildID}' AND currencyTag = '${moneytag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia waluty z tagiem **${moneytag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            switch(await interaction.options.getSubcommand(false)){
                                // ustaw
                                case 'ustaw':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET liczbaoperacji = '${String(kwota)}' WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane liczby operacji waluty ${res[0]['currencyName']} (TAG: ${moneytag}) na kwotę ${String(kwota)}`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien
                                case 'zmien':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET liczbaoperacji = (liczbaoperacji + '${String(kwota)}') WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane liczby operacji waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o kwotę ${String(kwota)}`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien o procent
                                case 'zmienprocent':{
                                    const kwota = await interaction.options.getNumber('procent'); 
                                    if(kwota > 1 || kwota < -1){
                                        interaction.editReply("DEBILU TO MA BYC W UŁAMKU DZIESIETNYM :(");
                                        return;
                                    }

                                    db.query(`UPDATE currency SET liczbaoperacji = (liczbaoperacji + ('${String(kwota)}' * liczbaoperacji)) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane liczby operacji na walucie ${res[0]['currencyName']} (TAG: ${moneytag}) o procent ${String(kwota*100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                            }
                        }
                    }
                });
                break;
            }           


            // wartosc waluty
            case 'wartosc':{
                db.query(`SELECT * from currency where guildID = '${guildID}' AND currencyTag = '${moneytag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia waluty z tagiem **${moneytag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            switch(await interaction.options.getSubcommand(false)){
                                // ustaw
                                case 'ustaw':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET currencyValue = '${String(kwota)}' WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane wartości waluty ${res[0]['currencyName']} (TAG: ${moneytag}) na kwotę ${String(kwota)}`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien
                                case 'zmien':{
                                    const kwota = await interaction.options.getNumber('kwota'); 
                                    db.query(`UPDATE currency SET currencyValue = (currencyValue + '${String(kwota)}') WHERE id = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane wartości waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o kwotę ${String(kwota)}`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                                // zmien o procent
                                case 'zmienprocent':{
                                    const kwota = await interaction.options.getNumber('procent'); 
                                    if(kwota > 1 || kwota < -1){
                                        interaction.editReply("DEBILU TO MA BYC W UŁAMKU DZIESIETNYM :(");
                                        return;
                                    }

                                    db.query(`UPDATE currency SET currencyValue = (currencyValue + ('${String(kwota)}' * currencyValue)) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w waluta.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane wartości waluty ${res[0]['currencyName']} (TAG: ${moneytag}) o procent ${String(kwota*100)}%`)
                                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                            .setTimestamp()
                                            .setColor("DarkGreen");
                        
                                            await interaction.followUp({embeds: [emb]});                                            
                                        }
                                    });
                                    break;
                                }

                            }
                        }
                    }
                });
                break;
            }   
            
            // usuwanie waluty
            case 'usun':{

                db.query(`SELECT * from currency WHERE currencyTag = '${moneytag}' AND guildID = '${guildID}'`,
                async (err, res) => {
                    if(err){
                        console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
                    }
                    else{
                        if(res.length>0){
                            if(moneytag == "MWR"){
                                interaction.editReply("Tej waluty nie można usunąć!")
                            }
                            else{
        
                                // usuwanie waluty z innych krajów (TODO)
                                db.query(`UPDATE countryeconomy SET currencyID = NULL, balance = balance / ${String(res[0]['currencyValue'])}, pkb = pkb / ${String(res[0]['currencyValue'])} WHERE currencyID = '${res[0]['id']}'`);
        
                                // usuwanie faktu istnienia waluty
                                await db.query(`delete from currency where currencyTag = '${moneytag}' AND guildID = '${guildID}'`, async (err,res) => {
                                    if(err){
                                        await interaction.editReply(`Niewiem jakiś problem był`);
                                        console.log("Problem jakiś z mysql w walutanowa.js")
                                    }
                                    else{
                                        
                                        await interaction.editReply(`usunięto walutę ${moneytag} poprawnie!`);
                                    }
                                });
                            }
                        }
                        else{
                            interaction.editReply("Taka waluta nie istnieje!");
                        } 
                    }
                });
                break;
            }


            // ustawianie waluty
            case 'ustaw':{
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


                                let nowawartoscwaluty = 1;
                                let crid = "NULL";
                                if(!(moneytag == "MWR")){
                                    nowawartoscwaluty = res[0]['currencyValue'];
                                    crid = `'${String(res[0]['id'])}'`
                                }

                                const kurs = aktualnawartoscwaluty / nowawartoscwaluty;

                                const balans = res2[0]['balance'];
                                const nowybalans = balans / aktualnawartoscwaluty * nowawartoscwaluty;

                                const pkb = res2[0]['pkb'];
                                const nowypkb = pkb / aktualnawartoscwaluty * nowawartoscwaluty;

                                db.query(`UPDATE countryeconomy SET currencyID = ${crid}, balance = '${String(nowybalans)}', pkb = '${String(nowypkb)}' WHERE countryID = '${String(res2[0]['id'])}'`, (err,res) => {
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
                });
                break;
            }



            case 'nowa':{
                const znak = interaction.options.getString('znak');
                const wartosc = interaction.options.getNumber("wartosc");
  
                db.query(`SELECT * from currency WHERE currencyTag = '${moneytag}' OR currencyName = '${znak}' AND guildID = '${guildID}'`,
                async (err, res) => {
                    if(err){
                        console.log(`error occured in command nowykraj during connection with database:\n\n ${err}`);
                    }
                    else{
                        if(res.length>0){
                            interaction.editReply("Taka waluta już istnieje, wybierz inną");
                        }
                        else{
                            if(wartosc == 0){
                                interaction.editReply("Wartość nie może równać się 0");
                            } 
                            else if(moneytag == "MWR"){
                                interaction.editReply("Tag MWR jest zarezerwowaną wartością dla walut, wybierz inną");
                            }
                            else{
        
                            }
        
                            await db.query(`INSERT INTO currency (currencyTag, currencyName, currencyValue, guildID) VALUES ('${moneytag}','${znak}','${wartosc}' ,'${guildID}')`, async (err,res) => {
                                if(err){
                                    await interaction.editReply(`Niewiem jakiś problem był`);
                                    console.log("Problem jakiś z mysql w walutanowa.js")
                                }
                                else{
                                    await interaction.editReply(`Utworzono walutę ${moneytag} poprawnie!`);
                                }
                            });
                        }
                    }
                });
                break;
            }

            case 'lista':{
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
                });
                break;
            }



        }
    }
}