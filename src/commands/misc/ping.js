module.exports = {
    name: 'ping',
    description: 'Just ping pong :3 Daje czas odpowiedzi bota.',
    // devOnly: false,
    // testOnly: false,
    // options: Object[],
    deleted: false,

    permissionsRequired: [],
    botPermissions: [],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Pong!:v:\n* Klient bota: ${ping}ms\n* Czas odpowiedzi serwera: ${client.ws.ping}ms`);
    }

}