const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const sendEmail = require("./sendEmail"); // Adjust the path as necessary

const updateStudentCode = async (req, res) => {
    try {
        const { email } = req.params;
        const randomCode = Math.floor(Math.random() * 10000000000) + 100000000; // generate random number
        const codeExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

        const student = await prisma.student.findUnique({
            where: {
                email: email,
            },
        });

        if (!student) {
            console.log("Student not found!");
        }

        const updatedStudent = await prisma.student.update({
            where: {
                email: email,
            },
            data: {
                code: randomCode.toString(),
                codeExpiresAt: codeExpiresAt,
            },
        });
        console.log("Student code updated:", updatedStudent);
        const code = updatedStudent.code.toString();
        const emailOptions = {
            from: google.email, // Sender address
            to: email, // Receiver address
            subject: "Your Code Update", // Subject line
            text: `Your code has been updated. Your new code is: ${code}`, // Plain text body
            // html: "<b>Your code has been updated. Your new code is:</b> <code>${code}</code>", // HTML body
        };

        try {
            await sendEmail(emailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    } catch (error) {
        console.error("Error updating student code:", error);
        throw error;
    }
};

const isCodeExpired = (codeExpiresAt) => {
    return new Date() > new Date(codeExpiresAt);
};

const changePassword = async (req, res) => {
    try {
        const { code } = req.params;

        // Find the student by code
        const students = await prisma.student.findMany({
            where: {
                code: code,
            },
        });

        // Check if the student exists
        if (students.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        const student = students[0];

        if (isCodeExpired(student.codeExpiresAt)) {
            console.error("Code expired after 2 minutes, try again!");
        }

        const newPassword = Math.floor(Math.random() * 1000000) + 10000; // gen random password

        // Update the student's password
        const updatedStudent = await prisma.student.update({
            where: {
                code: code,
            },
            data: {
                password: newPassword.toString(),
            },
        });

        res.status(200).json({ password: updatedStudent.password });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({
            message: "An error occurred while changing the password",
        });
    }
};

module.exports = {
    changePassword,
    updateStudentCode,
};
