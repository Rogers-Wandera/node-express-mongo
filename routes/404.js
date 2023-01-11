const path = require("path");

const notFoundPage = (req,res) => {
    res.status(404)
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname,"..","pages","404.html"))
    } else if(req.accepts("json")){
        res.json({error:"404 page not found"})
    } else {
        res.type("txt").send("404 page not found")
    }
}

module.exports =notFoundPage;