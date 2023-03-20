const fs = require('fs')
async function existFolder(path){
    try {
        await fs.promises.access(path)
    } catch (error) {
        await fs.promises.mkdir(path)
    }
}

module.exports = {existFolder}