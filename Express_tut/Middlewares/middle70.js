function myMiddleware70(req, res, next){
    console.log("I am custom middleware from different module70")
    next() //used to pass/forward the access to next middleware(route, methods are also type of middleware)
}

module.exports = myMiddleware70
