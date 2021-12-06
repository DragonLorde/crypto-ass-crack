const fs = require("fs");


//чтение файла
async function GetFile() {

    return new Promise( function(resolve, reject) {
        fs.readFile('core/config/email.txt' , 'utf-8' , (err , data) => {
            if(err) {
                console.log('not file');
                reject(err);
            }
            resolve(data)
        })
    })
}

async function ParseFile() {
    let file = await GetFile()
    let parse = file.split(',')
    return parse
}

module.exports = {
    getFile:ParseFile
}