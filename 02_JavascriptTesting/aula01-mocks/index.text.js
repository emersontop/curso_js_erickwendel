const {error} = require('./src/constants')
const File =require('./src/file')
const { rejects, deepStrictEqual} = require( 'assert')
;
(async() =>{
    {
        const filePath = './mocks/emptyFile-invalid.csv' 
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv' 
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/invalid-header.csv' 
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
        {
            "id": 123,
            "name": "Eric wendel",
            "profession": "Javascript",
            "age": 25
        },
        {
            "id": 321,
            "name": "Xuxa da silva",
            "profession": "Javascript Specialist",
            "age": 80
        },
        {
            "id": 231,
            "name": "Joazinho",
            "profession": "Java developer",
            "age": 30
        }
        ]

        deepStrictEqual(result, expected)


    }
})()