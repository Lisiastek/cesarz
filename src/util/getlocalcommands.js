const path = require('path');
const getallfiles = require('./getallfiles');

module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getallfiles(
        path.join(__dirname, '..', 'commands'),
        true
    );
    
    for(const category of commandCategories){
        const commandFiles = getallfiles(category);

        for(const command of commandFiles){
            const commandObject = require(command);

            if(exceptions.includes(commandObject.name)) continue;

            localCommands.push(commandObject);
        }
    }

    return localCommands;
}