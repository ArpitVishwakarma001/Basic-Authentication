import nodemailer from "nodemailer";

// Create a test account automatically
const testAccount = await nodemailer.createTestAccount();

// Create a transporter using the test account
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure,
  auth: {
    user: "arpitvishwakarma236@gmail.com",
    pass: "qcne unhw ljgg lfem",
  },
});

