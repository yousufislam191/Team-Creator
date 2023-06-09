const emailMessage = (email, token) => {
  return {
    from: `"Team Creator "${process.env.SENDER_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: "Verify your account", // Subject line
    text: "Verify your account", // plain text body
    html: `
    <h3>Thanks for registering Team Creator System</h3>
    <h4>Please verify your email to continue...<a href="http://team-creator-server.vercel.app/api/user/email-activate?token=${token}">verify your email</a></h4>
    `, // html body
  };
};
module.exports = emailMessage;

// <h4>Please verify your email to continue...<a href="http://localhost:6001/api/email-activate?token=${token}">verify your email</a></h4>  //local host
// <h4>Please verify your email to continue...<a href="http://team-creator-server.vercel.app/api/email-activate?token=${token}">verify your email</a></h4>  //server host
