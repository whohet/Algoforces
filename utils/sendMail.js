const transporter = require("./emailTransporter");

const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: info };
  } catch (error) {
    return { success: false, message: error };
  }
};

module.exports = sendMail;
