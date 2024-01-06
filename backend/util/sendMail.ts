import nodemailer from "nodemailer";
import Mailjet from "node-mailjet";

export async function sendGridEmailSender(option) {
  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
  );
  mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: "no-reply@ubee.cloud",
            Name: "Password reset",
          },
          To: [
            {
              Email: option.to,
              Name: "",
            },
          ],
          Subject: "Нууц үг сэргээх хүсэлт",
          TextPart: "",
          HTMLPart: option.html,
        },
      ],
    })
    .then((result) => {
      console.log("email sent");
      return true;
    })
    .catch((err) => {
      console.log(err.statusCode);
      return false;
    });
}
