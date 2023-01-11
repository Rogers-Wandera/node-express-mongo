const { logEvent } = require("./logEvent");

const errorHandler = (err,req,res,next) => {
    logEvent(`${err.name}: ${err.message}`, 'errorLog.md');
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler;