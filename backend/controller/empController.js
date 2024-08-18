const employee = require("../model/employee");
const task = require("../model/task");
const bcrypt = require("bcrypt");

//for set employee account here is the setEmployee method
const setEmployee = async (req, res) => {
  console.log("works");
  let data = await new employee(req.body);
  data.save().then((data) => {
    console.log(data);
    res.json(data);
  });
};


//Employee login authentication method

const employeeLogin = async (req, res) => {
  //checker is a callback function for password comparing
  const checker = (err, isMatch) => {
    if (isMatch) {
      res.json({ employeelogin: true, message: "login successfull", userData });
    } else {
      res.send({ employeelogin: false, message: "password was incorrect" });
    }
  };

  let userData = await employee.findOne({ employee_id: req.body.employee_id });
  if (userData) {
    userData.comparePassword(req.body.password, checker);
  } else {
    res.send({ employeelogin: false, message: "User Not Found" });
  }
};

const deleteEmployee = async (req, res) => {
  let data = await employee.findOneAndDelete(req.params.id);

  data.tasks.forEach(async (element) => {
    let data2 = await task.findOneAndUpdate(element, {
      $set: { assign: null },
    });
  });

  if (data) {
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
};

const getemployee = async (req, res) => {
  let data = await employee.find();
  res.json(data);
};

module.exports = {
  setEmployee,
  employeeLogin,
  deleteEmployee,
  getemployee,
};
