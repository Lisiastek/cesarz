const { application } = require("express");
const getapplicationcommands = require("../../util/getapplicationcommands");
const getlocalcommands = require("../../util/getlocalcommands");
const areCommandDiferent = require("../../util/areCommandDiferent");

require("dotenv").config({
    path: '../../../.env'
});

module.exports = async (client, arg) => {
    console.log("registering commands process has been run!");

    console.log(`TEST GUILD: ${process.env.TESTGUILD}`);

    try {
        const localCommands = getlocalcommands();
        const applicationCommands = await getapplicationcommands(client, process.env.TESTGUILD);

        for(const localCommand of localCommands){
            const {name, description, options} = localCommand;


            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            )

            if(existingCommand){
                if(localCommand.deleted){
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command: ${name}`);
                    continue;
                }

                if(areCommandDiferent(existingCommand, localCommand)){
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    });
                    console.log(`Edited command: ${name}`);
                }
            }
            else{
                if(localCommand.deleted){
                    console.log(`Skipped command: ${name} because it is marked as deleted!`);
                    continue;
                }
                await applicationCommands.create({
                    name,
                    description,
                    options
                });
                console.log(`Registered command with ${name}`);
            }
        }

    } catch (error) {
        console.log("Error occured during handling with registering commands\n\n", 
        error, "\n\n")
    }



    console.log("registering commands process has been completed!");
};