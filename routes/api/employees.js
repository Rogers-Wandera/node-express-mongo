const express = require("express");
const {
    getAllEmployees,
    addNewEmployee,
    upDateEmployee,
    deleteEmployee,
    getSingleEmployee
} = require("../../controllers/employees");
const ROLES_LIST = require("../../config/roles");
const VerifyRoles = require("../../middleware/verifyRoles");

const router = express.Router();


router.route("/")
    .get(getAllEmployees)
    .post(VerifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),addNewEmployee)

router.route("/:id")
    .delete(VerifyRoles(ROLES_LIST.Admin),deleteEmployee)
    .get(getSingleEmployee)
    .put(VerifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),upDateEmployee)

module.exports = router;
