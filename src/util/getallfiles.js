const fs = require('fs');
const path = require('path');

module.exports = (dirName, onlyFolders = false) => {
    let fileNames = [];

    const files = fs.readdirSync(dirName, {
        withFileTypes: true
    });
    
    for(const file of files){
        const filePath = path.join(dirName, file.name);

        if(onlyFolders){
            if(file.isDirectory){
                fileNames.push(filePath);
            }
        }else{
            if(file.isFile){
                fileNames.push(filePath);
            }
        }

    }
    return fileNames;
}