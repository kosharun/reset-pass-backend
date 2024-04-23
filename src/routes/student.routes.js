const { 
    changePassword,
    updateStudentCode,
} = require("../controllers/student.controller.js");
const express = require("express");

const router = express.Router();

router.get("/gen-code/:email", updateStudentCode);
router.get("/gen-password/:code", changePassword);

module.exports = router;
