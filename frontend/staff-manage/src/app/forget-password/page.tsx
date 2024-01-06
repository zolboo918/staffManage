"use client";

import { Button, Form, FormField } from "semantic-ui-react";
import { usePasswordReset } from "src/hooks/usePasswordReset";

function ForgetPassword() {
  const {
    step,
    email,
    token,
    newPassword,
    newPasswordCheck,
    message,
    setMessage,
    setEmail,
    setToken,
    setNewPassword,
    setNewPasswordCheck,
    getResetToken,
    checkResetToken,
    changePassword,
  } = usePasswordReset();

  const handleButton = () => {
    if (step == "1") {
      getResetToken();
    } else if (step == "2") {
      checkResetToken();
    } else {
      changePassword();
    }
  };

  return (
    <div className="w-[60%] self-center justify-self-center bg-white border-2 shadow-xl rounded-2xl p-14">
      <span className="text-gray-900 text-4xl">Нууц үг сэргээх</span>
      <Form className="mt-10">
        {step === "1" ? (
          <FormField className="mt-10">
            <span className="text-grey-900 ">Имэйл</span>

            <input
              value={email}
              placeholder="email@gmail.com"
              className="text-black w-full "
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
                setMessage("");
              }}
            />
          </FormField>
        ) : step === "2" ? (
          <FormField className="mt-10">
            <span className="text-grey-900 ">Нууц үг сэргээх код</span>
            <input
              value={token}
              placeholder="Имэйлээр ирсэн 4 оронтой кодыг оруулна уу"
              className="text-black w-full "
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setToken(event.target.value);
                setMessage("");
              }}
            />
          </FormField>
        ) : (
          <div>
            <FormField className="mt-10">
              <span className="text-grey-900 ">Шинэ нууц үг</span>
              <input
                value={newPassword}
                placeholder="Нууц үг"
                className="text-black w-full "
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(event.target.value);
                  setMessage("");
                }}
              />
            </FormField>
            <FormField>
              <span className="text-grey-900 ">Шинэ нууц үг давтах</span>
              <input
                value={newPasswordCheck}
                placeholder="Нууц үг давтах"
                className="text-black w-full "
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPasswordCheck(event.target.value);
                  setMessage("");
                }}
              />
            </FormField>
          </div>
        )}
        <div className="mt-4 text-red-500">
          <span>{message}</span>
        </div>
        <FormField>
          <Button positive onClick={handleButton}>
            Үргэлжлүүлэх
          </Button>
        </FormField>
      </Form>
    </div>
  );
}

export default ForgetPassword;
