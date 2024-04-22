const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const updateStudentToken = async (req, res) => {
    try {
        const { email } = req.params;
        const randomToken = Math.floor(Math.random() * 10000000000) + 100000000; // generate random number
        const tokenExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

        const student = await prisma.student.findUnique({
            where: {
                email: email,
            },
        });
        if (student) {
            const updatedStudent = await prisma.student.update({
                where: {
                    email: email,
                },
                data: {
                    token: randomToken.toString(),
                    tokenExpiresAt: tokenExpiresAt,
                },
            });
            console.log("Student token updated:", updatedStudent);
            res.status(200).json({id: updatedStudent.id, token: updatedStudent.token.toString()});
        } else {
            console.log("Student not found!");
        }
    } catch (error) {
        console.error("Error updating student token:", error);
        throw error;
    }
};

const isTokenExpired = (tokenExpiresAt) => {
    return new Date() > new Date(tokenExpiresAt);
};

const changePassword = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the student by token
        const student = await prisma.student.findFirst({
            where: {
                token: token,
            },
        });

        // Check if the student exists
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if(!isTokenExpired(student.tokenExpiresAt)) {
            const newPassword = Math.floor(Math.random() * 1000000) + 10000; // gen random password

            // Update the student's password
            const updatedStudent = await prisma.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    password: newPassword.toString(),
                    token: "", // remove ability to change password more times
                },
            });

            res.status(200).json({ password: updatedStudent.password });
        } else {
            res.error("Token expired after 2 minutes, try again!");
        }
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "An error occurred while changing the password" });
    }
};

module.exports = {
    changePassword,
    updateStudentToken,
};
