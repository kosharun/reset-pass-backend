const { 
    changePassword,
    updateStudentToken,
} = require("../controllers/student.controller.js");
const express = require("express");

const router = express.Router();

router.get("/gen-token/:email", updateStudentToken);
router.get("/gen-password/:id/:token", changePassword);

module.exports = router;
