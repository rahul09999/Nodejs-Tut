// Gives methods to interact with OS

const os = require('os')

console.log(os.arch());
console.log(os.platform());

console.log(os.totalmem())
console.log(os.freemem())
// console.log(os.networkInterfaces())
console.log(os.cpus())