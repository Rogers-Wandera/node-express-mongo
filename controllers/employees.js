const employeeSchema = require("../models/employeeSchema");
const EmployeeSchema = require("../models/employeeSchema");

const getAllEmployees = async (req,res) => {
    const employees = await EmployeeSchema.find({});
    res.status(200).json({...employees});
}

const addNewEmployee = async (req,res) => {
    const { name,age,quote,department,position } = req.body;
    console.log(req.roles)
    if(!name || !age || !quote || !department) {
        return res.json({ msg: "name,age,and quote must be provided" })
    }
    const person = {name,age,quote,department,position}
    await employeeSchema.create({ ...person })
    res.status(201).json({msg: "employee created"})
}

const upDateEmployee = async (req,res) => {
    const {id} = req.params;

    const person = await EmployeeSchema.findOneAndUpdate({_id: id}, req.body,{
        runValidators:true
    });
    if(!person){
        return res.status(401).json({msg:`no person found with id of ${id}`})
    }
    res.status(200).json({ person });
}

const deleteEmployee = async (req,res) => {
    const { id } = req.params
    const roles = req.roles;
    const admin = roles.filter((role) => role === 5150)
    console.log(admin)
    const person = await EmployeeSchema.findOne({_id: id}).exec();

    if(!person){
        return res.json({msg:"Employee doesnot exist"})
    }

    await person.deleteOne({ _id: id });

    res.status(200).json({msg: "employee deleted succesful"});
    
}

const getSingleEmployee = async (req,res) => {
    const { id } = req.params
    const person = await EmployeeSchema.findOneAndDelete({_id: id});
    if(!person){
        return res.json({msg:"Employee doesnot exist"})
    }

    res.status(200).json({ person })
}

module.exports = {
    getAllEmployees,
    addNewEmployee,
    upDateEmployee,
    deleteEmployee,
    getSingleEmployee
}