const {PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'zweryfikuj',
    description: 'Weryfikujesz się',
    // devOnly: false,
    // testOnly: false,
    // options: Object[],
    deleted: false,

    permissionsRequired: [],
    botPermissions: [PermissionsBitField.Flags.ManageRoles],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const guild = interaction.guild;
        const zwerfRole = await guild.roles.cache.find((r) => r.name === 'zweryfikowany');
        const user = await interaction.member;

        if(user.roles.cache.some(role => role.name === 'zweryfikowany')){
            interaction.editReply("Już zostałeś zweryfikowany!");
        }
        else{
            user.roles.add(zwerfRole);
            interaction.editReply("Gratuluje :3");
        }


        interaction.editReply(`Pong!:v:\n* Klient bota: ${ping}ms\n* Czas odpowiedzi serwera: ${client.ws.ping}ms`);
    }

}