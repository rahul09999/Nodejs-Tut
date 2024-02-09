//Fs module is related to read, write etc on file/directory

//File


const fs = require('fs')

// //read file
// let fileContent = fs.readFileSync('fs1.txt')
// // console.log('Data of fs1-> ', fileContent) // prints in buffer format, as file converts to buffer, bcz compiler dont know the format thats why it output buffer
// console.log('Data of fs1-> ' + fileContent)// here buffer format converts to string format due to concatenation

// //Write file

// //Also it create new fle if it is not existed
// let writeContent = fs.writeFileSync('fs2', 'Hello this is written using writeSync.') // this overwrite the file, means prev content is replaced by it
// console.log('File written successfully')

// //append text to the file (It append text on to the existing text of that file)

// let appendContent = fs.appendFileSync('fs2', ' Hello this is appendFile.')
// console.log("append successfull")

//Delete an file

// let deleteFile = fs.unlinkSync('fsDemo.txt') //gets error if you delete already deleted file
// console.log('file is deleted')


//Directories

//Create or Make new directory(folder)

//fs.mkdirSync('myDirectory')

//check the content inside of a directory

let dirPath = 'D:\\Nodejs\\Node_module_system\\fs_file_Module\\myDirectory'

let folderContent = fs.readdirSync(dirPath)

console.log('Folder content', folderContent)// prints name(string) of files under directory

console.log('Folder content: ' + folderContent) // Prints array of files under directory

//Check whether directory exists or not(return boolean)

let doesExist = fs.existsSync('myDirectory')
console.log(doesExist)
console.log(fs.existsSync('fs.js'))
console.log(fs.existsSync('fs1'))

//Delete the directory
//first create then delete it

//fs.mkdirSync('demo') // make sure you not creating directory with same name, as it throw error
fs.rmdirSync('demo')