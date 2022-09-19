// Importação de bibliotecas e funções
const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

// Psdrões do arquivo
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)
        
        const users = File.parseCSVToJSON(content)

        return users
    }

    static async getFileContent(filePath){
        return (await readFile(filePath)).toString("utf8")
    }
    static isValid(csvString, options = DEFAULT_OPTION){
        const [header,...fileWithoutHeader] = csvString.split('\n') //O metódo split divide de acordo com algum parametro, ou seja aqui a quebra de linha
        //O const [header,...fileWithoutHeader] recebe o valor e separa a primiera linha, com indice zero para a variável header e o resto será salvo em fileWhithoutHeader
        // a constante isHeaderValid recebe 1 se o cabeçaljo/header for igual ao padrão passado. se for falso ele recebe 0 que chama o error da biblioteca constants
        const isHeaderValid = (header.split("\r").join("") === options.fields.join(","))
        
        if(!isHeaderValid){
            return{
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
                // Validando se os header estão certos! Se tiver errado aparece a mensagem de erro.
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
        console.log("vai acertar")
        return{
            valid: true
        }
    }
    static parseCSVToJSON(csvString){
        const lines = csvString.split('\n')
        const firstLine =lines.shift()
        const header = firstLine.split('')
        const users = lines.map(line =>{
            const columns = line.split(',')
            let user = {}
            for (const index in columns){
                user[header[index]] = columns[index]
            }
            console.log(user)
        })
    }
}

module.exports = File