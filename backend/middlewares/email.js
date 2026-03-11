import { emailVerificationTemplate } from "../assets/email.template.js";
import { transporter } from "./email.config.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Join Our Community" <arpitvishawakarma236@gmail.com>',
      to: email,
      subject: "Verify your Email",
      text: "Verify your Email",
      html: emailVerificationTemplate.replace("{verificationCode}", verificationCode),
    });
    if (response) {
      console.log("Email sent successfully:", response);
    }
  } catch (error) {
    throw error;
  }
};
