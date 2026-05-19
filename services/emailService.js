const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendTaskEmail = async (
  email,
  taskTitle
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "New Task Assigned",

    html: `
      <h2>You have been assigned a task</h2>
      <p><strong>Task:</strong> ${taskTitle}</p>
    `,
  });
};

module.exports = sendTaskEmail;