const Employee = require('../models/User');

const getEmployees = async(req, res) => {
    try{
        const employees = await Employee.find().select('empName -_id'); 
        console.log(employees)
        res.status(200).json(employees)
    } catch(error){
        console.error('Error fetching employee names:', error);
        res.status(500).send('Error fetching employee data');
    }
}
module.exports = {getEmployees}