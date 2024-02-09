// Child process is a node module used to create sub procces within a script
// If you can perform different task with your script by just using some methods

// subproccess lik you can open anythings(which as in built shortcut to start from cli) throught ur own script(this file) with help of child process module
// this way you can make methods through child process to get fast and easy acess to sub process(like calc, open any application etc)


const cp = require('child_process')


//cp.execSync('calc')
// cp.execSync("calc")

// cp.execSync('start brave')
// cp.execSync('start chrome www.google.com')


console.log('Output: ' + cp.execSync('node demo1'))