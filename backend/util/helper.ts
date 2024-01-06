export const generateResetPasswordToken = function () {
  const resetCode = Math.floor(1000 + Math.random() * 9000);

  this.resetPasswordToken = resetCode;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetCode;
};
