const VerifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req?.roles){
            res.status(401).json({ msg: "not authorized to access this route" })
        }
        const rolesArray = [...allowedRoles];
        const results = req.roles.map(role => rolesArray.includes(role));
        const checkedResults = results.find(val => val === true);
        if(!checkedResults) return res.status(401).json({ msg: "not authorized to access this route" });
        next();
    }
}

module.exports = VerifyRoles;