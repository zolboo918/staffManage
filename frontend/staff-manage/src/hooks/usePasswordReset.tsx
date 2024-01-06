"use client";

import { ApolloError, FetchResult, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  GET_RESET_PASSWORD_TOKEN_MUTATION,
  CHECK_RESET_PASSWORD_TOKEN_MUTATION,
  CHANGE_PASSWORD_MUTATION,
} from "src/mutations";

export const usePasswordReset = () => {
  const [step, setStep] = useState<"1" | "2" | "3">("1");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [getToken] = useMutation(GET_RESET_PASSWORD_TOKEN_MUTATION);
  const [checkToken] = useMutation(CHECK_RESET_PASSWORD_TOKEN_MUTATION);
  const [changePasswordAction] = useMutation(CHANGE_PASSWORD_MUTATION);

  const route = useRouter();

  const getResetToken = () => {
    if (email === "") {
      setMessage("Имэйл оруулна уу");
      return;
    }

    getToken({ variables: { email } })
      .then((value: FetchResult<{ id: number }>) => {
        if (value.data) {
          setMessage("");
          setStep("2");
        }
      })
      .catch((error: ApolloError) => {
        setMessage(error.message);
      });
  };

  const checkResetToken = () => {
    if (token === "") {
      setMessage("Имэйл оруулна уу");
      return;
    }

    checkToken({ variables: { email, token } })
      .then((value: FetchResult<{ id: number }>) => {
        if (value.data) {
          setMessage("");
          setStep("3");
        }
      })
      .catch((error: ApolloError) => {
        setMessage(error.message);
      });
  };

  const changePassword = () => {
    if (newPassword === "" || newPasswordCheck === "") {
      setMessage("Нууц үг оруулна уу");
      return;
    }
    if (newPassword !== newPasswordCheck) {
      setMessage("Нууц адил биш байна");
      return;
    }

    changePasswordAction({ variables: { email, newPassword } })
      .then((value: FetchResult<{ id: number }>) => {
        if (value.data) {
          setMessage("Нууц үг амжилттай солигдлоо.");
          setStep("1");
          setTimeout(() => {
            route.replace("/signin");
          }, 1000);
        }
      })
      .catch((error: ApolloError) => {
        setMessage(error.message);
      });
  };

  return {
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
  };
};
