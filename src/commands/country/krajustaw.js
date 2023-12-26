// const mysql = require('mysql');
// const db = require("../../util/db.js");

const {ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'krajustaw',
    description: 'Pozwala na zmianę parametrów kraju',
    // devOnly: false,
    // testOnly: false,
    options: [
        // budzet
        {
            name: "budzet",
            description: "zarządzanie budżetem kraju",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw budzet",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "tag",
                                description: "ID kraju poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "kwota",
                                description: "Kwota na ktorą zostanie ustawiony budżet",
                                type: ApplicationCommandOptionType.Number,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien budzet o określoną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "tag",
                            description: "ID kraju poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmieniony budżet",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },



        // populacja
        {
            name: "populacja",
            description: "zarządzanie populacją kraju",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw populacje",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "tag",
                                description: "ID kraju poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "populacja",
                                description: "Kwota na ktorą zostanie ustawiona populacja",
                                type: ApplicationCommandOptionType.Integer,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien populację o określoną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "tag",
                            description: "ID kraju poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmieniony budżet",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                },
                {
                    name: "zmienprocent",
                    description: "zmien populację o określoną %",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "tag",
                            description: "ID kraju poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "procent",
                            description: "Kwota o ktorą zostanie zmieniona populacja (ułamek dziesiętny)",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },


        //pkb
        {
            name: "pkb",
            description: "zarządzanie pkb kraju",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "ustaw",
                    description: "ustaw pkb",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                            {
                                name: "tag",
                                description: "ID kraju poprostu",
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                min_length: 3,
                                max_length: 3,
                                autocomplete: true
                            },
                            {
                                name: "kwota",
                                description: "Kwota na ktorą zostanie ustawione pkb",
                                type: ApplicationCommandOptionType.Number,
                                required: true,
                            }
                    ]
                },
                {
                    name: "zmien",
                    description: "zmien pkb o określoną kwotę",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "tag",
                            description: "ID kraju poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "kwota",
                            description: "Kwota o ktorą zostanie zmienione pkb",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                },
                {
                    name: "zmienprocent",
                    description: "zmien pkb o określoną %",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "tag",
                            description: "ID kraju poprostu",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            min_length: 3,
                            max_length: 3,
                            autocomplete: true
                        },
                        {
                            name: "procent",
                            description: "Kwota o ktorą zostanie zmienione pkb (ułamek dziesiętny)",
                            type: ApplicationCommandOptionType.Number,
                            required: true,
                        }
                    ]
                }
            ]
        },




        // {
        //     name: "inflacja",
        //     description: "zarządzanie inflacja kraju",
        //     type: ApplicationCommandOptionType.SubcommandGroup,
        //     options: [
        //         {
        //             name: "ustaw",
        //             description: "ustaw inflacje",
        //             type: ApplicationCommandOptionType.Subcommand,
        //             options: [
        //                     {
        //                         name: "tag",
        //                         description: "ID kraju poprostu",
        //                         type: ApplicationCommandOptionType.String,
        //                         required: true,
        //                         min_length: 3,
        //                         max_length: 3,
        //                         autocomplete: true
        //                     },
        //                     {
        //                         name: "kwota",
        //                         description: "Kwota na ktorą zostanie ustawiona inflacja (ułamek dziesiętny)",
        //                         type: ApplicationCommandOptionType.Number,
        //                         required: true,
        //                     }
        //             ]
        //         },
        //         {
        //             name: "zmien",
        //             description: "zmien inflację o określoną kwotę",
        //             type: ApplicationCommandOptionType.Subcommand,
        //             options: [
        //                 {
        //                     name: "tag",
        //                     description: "ID kraju poprostu",
        //                     type: ApplicationCommandOptionType.String,
        //                     required: true,
        //                     min_length: 3,
        //                     max_length: 3,
        //                     autocomplete: true
        //                 },
        //                 {
        //                     name: "kwota",
        //                     description: "Kwota o ktorą zostanie zmieniona inflacja (ułamek dziesiętny)",
        //                     type: ApplicationCommandOptionType.Number,
        //                     required: true,
        //                 }
        //             ]
        //         },
        //         {
        //             name: "zmienprocent",
        //             description: "zmien inflacji o określony %",
        //             type: ApplicationCommandOptionType.Subcommand,
        //             options: [
        //                 {
        //                     name: "tag",
        //                     description: "ID kraju poprostu",
        //                     type: ApplicationCommandOptionType.String,
        //                     required: true,
        //                     min_length: 3,
        //                     max_length: 3,
        //                     autocomplete: true
        //                 },
        //                 {
        //                     name: "procent",
        //                     description: "Kwota o ktorą zostanie zmieniona inflacja (ułamek dziesiętny)",
        //                     type: ApplicationCommandOptionType.Number,
        //                     required: true,
        //                 }
        //             ]
        //         }
        //     ]
        // },        




        /// władca
        {
            name: "wladca",
            description: "zmien władcę kraju",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "tag",
                    description: "ID kraju poprostu",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    min_length: 3,
                    max_length: 3,
                    autocomplete: true
                },
                {
                    name: "wladca",
                    description: "Władca kraju",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    min_length: 3,
                    max_length: 40,
                }
            ]
        },


        /// ustroj
        {
            name: "ustroj",
            description: "zmien ustroj kraju",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "tag",
                    description: "ID kraju poprostu",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    min_length: 3,
                    max_length: 3,
                    autocomplete: true
                },
                {
                    name: "ustroj",
                    description: "ustroj kraju",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name:"komunizm",
                            value:"komunizm"
                        },
                        {
                            name:"socjalizm",
                            value:"socjalizm"
                        },
                        {
                            name:"demokracja bezpośrednia",
                            value:"demokracja bezpośrednia"
                        },
                        {
                            name:"demokracja pośrednia",
                            value:"demokracja pośrednia"
                        },
                        {
                            name:"monarchia absolutna",
                            value:"monarchia absolutna"
                        },
                        {
                            name:"monarchia parlamentarna/konstytucyjna",
                            value:"monarchia parlamentarna/konstytucyjna"
                        },
                        {
                            name:"faszyzm",
                            value:"faszyzm"
                        },
                        {
                            name:"nazizm",
                            value:"nazizm"
                        },
                        {
                            name:"gubernat",
                            value:"gubernat"
                        },
                        {
                            name:"gubernat wojskowy",
                            value:"gubernat wojskowy"
                        },
                        {
                            name:"autonomia",
                            value:"autonomia"
                        },
                        {
                            name:"anarchia",
                            value:"anarchia"
                        },
                        {
                            name:"nietypowy ustrój",
                            value:"nietypowy ustrój"
                        },
                    ]
                }
            ]
        }

    ],
    deleted: false,

    permissionsRequired: [PermissionsBitField.Flags.ViewAuditLog],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        db = require('../../util/db.js');

        const guildID = await interaction.guildId;
        const tag = await interaction.options.getString('tag')?.toUpperCase(); 


        const pierwszagrupa = await interaction.options.getSubcommandGroup(false) ? await interaction.options.getSubcommandGroup(false) :
        await interaction.options.getSubcommand(false);

        switch(pierwszagrupa){
            // budzecik
            case 'budzet':{
                db.query(`SELECT * from country where guildID = '${guildID}' AND countryID = '${tag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
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
                                    db.query(`UPDATE countryeconomy SET balance = '${String(kwota)}' WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane budżetu kraju ${res[0]['countryName']} (TAG: ${tag}) na kwotę ${String(kwota)}`)
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
                                    db.query(`UPDATE countryeconomy SET balance = (balance + '${String(kwota)}') WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane budżetu kraju ${res[0]['countryName']} (TAG: ${tag}) o kwotę ${String(kwota)}`)
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


            // pkb
            case 'pkb':{
                db.query(`SELECT * from country where guildID = '${guildID}' AND countryID = '${tag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
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
                                    db.query(`UPDATE countryeconomy SET pkb = '${String(kwota)}' WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane pkb kraju ${res[0]['countryName']} (TAG: ${tag}) na kwotę ${String(kwota)}`)
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
                                    db.query(`UPDATE countryeconomy SET pkb = (pkb + '${String(kwota)}') WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane pkb kraju ${res[0]['countryName']} (TAG: ${tag}) o kwotę ${String(kwota)}`)
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

                                    db.query(`UPDATE countryeconomy SET pkb = (pkb + ('${String(kwota)}' * pkb)) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane pkb kraju ${res[0]['countryName']} (TAG: ${tag}) o procent ${String(kwota*100)}%`)
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


            // inflacja
            case 'inflacja':{
                db.query(`SELECT * from country where guildID = '${guildID}' AND countryID = '${tag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
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
                                    db.query(`UPDATE countryeconomy SET inflacja = '${String(kwota)}' WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji kraju ${res[0]['countryName']} (TAG: ${tag}) na kwotę ${String(kwota)}%`)
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
                                    db.query(`UPDATE countryeconomy SET inflacja = (inflacja + '${String(kwota)}') WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji kraju ${res[0]['countryName']} (TAG: ${tag}) o kwotę ${String(kwota)}% (dodatkowa wartość nie % jak coś)`)
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

                                    db.query(`UPDATE countryeconomy SET inflacja = (inflacja + ('${String(kwota)}' * inflacja)) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane inflacji kraju ${res[0]['countryName']} (TAG: ${tag}) o procent ${String(kwota*100)}%`)
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




            // populalcja
            case 'populacja':{
                db.query(`SELECT * from country where guildID = '${guildID}' AND countryID = '${tag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            switch(await interaction.options.getSubcommand(false)){
                                // ustaw
                                case 'ustaw':{
                                    const populacja = await interaction.options.getInteger('populacja'); 
                                    db.query(`UPDATE countryinfo SET populacja = abs('${String(populacja)}') WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane populacji kraju ${res[0]['countryName']} (TAG: ${tag}) na kwotę ${String(populacja)}`)
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
                                    db.query(`UPDATE countryinfo SET populacja = (abs(populacja + '${String(kwota)}')) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane populacji kraju ${res[0]['countryName']} (TAG: ${tag}) o kwotę ${String(kwota)}`)
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

                                    db.query(`UPDATE countryinfo SET populacja = abs((populacja + ('${String(kwota)}' * populacja))) WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                        if(err){
                                            console.log("cos z mysql w krajustaw.js");
                                            await interaction.editReply("Jakis błąd bota");
                                        }
                                        else{
                                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                            .setDescription(`Urząd statystyczny przyjął wniosek o zmiane populacji kraju ${res[0]['countryName']} (TAG: ${tag}) o procent ${String(kwota*100)}%`)
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



            // wladca
            case "wladca":{
                db.query(`SELECT * from country where guildID = '${guildID}' AND countryID = '${tag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            const wladca = await interaction.options.getString('wladca');
                            db.query(`UPDATE countryinfo SET wladca ='${wladca}' WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                if(err){
                                    console.log("cos z mysql w krajustaw.js");
                                    await interaction.editReply("Jakis błąd bota");
                                }
                                else{
                                    const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                    iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                    .setDescription(`Urząd statystyczny przyjął wniosek o zmiane władcy w aktach poprawnie. Witamy ${wladca} !`)
                                    .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                    .setTimestamp()
                                    .setColor("DarkGreen");
                
                                    await interaction.followUp({embeds: [emb]});                                            
                                }
                            });
                        }
                    }
                });
                break;
            }








            // ustroj
            case "ustroj":{
                db.query(`SELECT * from country where guildID = '${guildID}' AND countryID = '${tag}'`, async (err,res) => {
                    if(err){
                        console.log("cos z mysql w krajustaw.js");
                        await interaction.editReply("Jakis błąd bota");
                    }
                    else{
                        if(res.length <= 0){
                            const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                            iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                            .setDescription(`Urząd statystyczny odrzucił wniosek z powodu:\n * nieistnienia kraju z tagiem **${tag}**`)
                            .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                            .setTimestamp()
                            .setColor("DarkRed");

                            await interaction.followUp({embeds: [emb]}); 
                        }
                        else{
                            const ustroj = await interaction.options.getString('ustroj');
                            db.query(`UPDATE countryinfo SET ustroj ='${ustroj}' WHERE countryID = '${res[0]['id']}'`, async (err,res2) => {
                                if(err){
                                    console.log("cos z mysql w krajustaw.js");
                                    await interaction.editReply("Jakis błąd bota");
                                }
                                else{
                                    const emb = new EmbedBuilder().setAuthor({name: "Urząd statystyczny", 
                                    iconURL: 'https://cdn1.vectorstock.com/i/1000x1000/60/40/nerd-face-emoji-clever-emoticon-with-glasses-vector-28926040.jpg'})
                                    .setDescription(`Urząd statystyczny przyjął wniosek o zmiane ustroju na ${ustroj} w aktach poprawnie.`)
                                    .setFooter({text:`Wykonał: ${interaction.member.displayName} :3`})
                                    .setTimestamp()
                                    .setColor("DarkGreen");
                
                                    await interaction.followUp({embeds: [emb]});                                            
                                }
                            });
                        }
                    }
                });
                break;
            }



            




        }



    }
}