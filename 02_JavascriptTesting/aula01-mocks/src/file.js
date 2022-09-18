const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ["id","name","profession","age"]
}

class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)

        return content
    }

    static async getFileContent(filePath){
        const filename = join(__dirname, filePath)
        return (await readFile(filename)).toString("utf8")
    }
    static isValid(csvString, options = DEFAULT_OPTION){
        const [header, ...fileWithoutHeader] = csvString.split('\n') //O metódo split divide de acordo com algum parametro, ou seja aqui a quebra de linha
        //O const [header,...fileWithoutHeader] recebe o valor e separa a primiera linha, com indice zero para a variável header e o resto será salvo em fileWhithoutHeader

        // a constante isHeaderValid recebe 1 se o cabeçaljo/header for igual ao padrão passado. se for falso ele recebe 0 que chama o error da biblioteca constants
        const isHeaderValid = header === options.fields.join(',')
        
        if(!isHeaderValid){
            return{
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
                // Validando se os header estão certos! Se tiver errado aparece a mensage mde erro.
            }
        }

        const isContentLenghtAccepted = (
            fileWithoutHeader.length >0 && 
            fileWithoutHeader.length <=options.maxLines
        )
          

        if(!isContentLenghtAccepted) {
            return{
                error: error.FILE_LENGHT_ERROR_MESSAGE,
                valid: false
            }
        }

        return{
            Valid: true
        }
    }
}

(async()=>{
    //const result = await File.csvToJson('./../mocks/threeItems-valid.csv')
    //const result = await File.csvToJson('./../mocks/fourItems-invalid.csv')
    const result = await File.csvToJson('./../mocks/invalid-header.csv')
    console.log('result',result)
})();
