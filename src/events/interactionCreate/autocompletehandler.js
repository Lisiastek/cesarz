const db = require('../../util/db.js');

module.exports = async (client, interaction) => {
    if(!interaction.isAutocomplete()) return;
    const focused = interaction.options.getFocused(true);

        if(["tag","tagod","tagdo"].includes(focused.name)){
            db.query(`SELECT * FROM country WHERE countryID LIKE '${focused.value}%' OR countryName LIKE '${focused.value}%' LIMIT 20`, (err,res) => {
                if(!err){
                    try {
                        const result = res?.map((item) => {
                            return {
                                name: `${item['countryID']} - ${item['countryName']}`,
                                value:item['countryID']
                            }
                        });
    
                        if(result.length > 0)
                        interaction.respond(result.slice(0,22)).catch(() => {});
                        else
                        interaction.respond([]);
                           
                    } catch (error) {}

                }
            });
        }
        else if(["moneytag", 'moneytag1', 'moneytag2'].includes(focused.name)) {
            db.query(`SELECT * FROM currency WHERE currencyTag LIKE '${focused.value}%' OR currencyName LIKE '${focused.value}%' LIMIT 20`, (err,res) => {
                if(!err){
                    try {
                        const result = res?.map((item) => {
                            return {
                                name: `${item['currencyTag']} - ${item['currencyName']}`,
                                value:item['currencyTag']
                            }
                        });
    
                        if(result.length > 0)
                        interaction.respond(result.slice(0,22)).catch(() => {});
                        else
                        interaction.respond([]);                        
                    } catch (error) {}
                }
            });
        }
    
}
