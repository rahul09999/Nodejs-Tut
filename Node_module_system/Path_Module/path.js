//Give info related to any file/folder by providing its path

const path = require('path')

let ext = path.extname('D:\\Nojs\\Node_module_system\\Path_Module\\hello.txt') 
//Give extension of provided path, also must add double forward slash '//'

console.log(ext);

let baseName = path.basename('D:\\Nodejs\\Node_module_system\\Path_Module\\hello.txt')
console.log(baseName);

console.log(__dirname) // give dir name of in which current file is
console.log(__filename) // give current file name