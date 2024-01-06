"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, FormField, Input } from "semantic-ui-react";
import { ApolloError, FetchResult, gql, useMutation } from "@apollo/client";
import { User } from "../../types";
import { useRouter } from "next/navigation";
import { REGISTER_MUTATION } from "src/mutations";

function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const route = useRouter();

  const [registerAction, { data, loading, error }] =
    useMutation(REGISTER_MUTATION);

  const login = () => {
    route.push("/signin");
  };

  const register = () => {
    if (email === "") {
      setErrorMessage("Имэйл оруулна уу");
      return;
    }

    if (password === "") {
      setErrorMessage("Нууц үг оруулна уу");
      return;
    }

    if (password !== passwordCheck) {
      setErrorMessage("Нууц үг адил биш байна!");
      return;
    }

    registerAction({ variables: { email, password, isAdmin } })
      .then((value: FetchResult<User>) => {
        if (value.data) route.replace("/users");
      })
      .catch((error: ApolloError) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="flex col">
      <div className="w-full">
        <Form>
          <FormField className="mt-4">
            <span className="text-grey-900">Имэйл</span>
            <input
              value={email}
              placeholder="email@gmail.com"
              className="text-black w-full "
              type="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setErrorMessage("");
                setEmail(event.target.value);
              }}
            />
          </FormField>
          <FormField className="mt-10">
            <span className="text-grey-900 ">Нууц үг</span>
            <input
              value={password}
              placeholder="Нууц үг"
              className="text-black w-full "
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setErrorMessage("");
                setPassword(event.target.value);
              }}
            />
          </FormField>
          <FormField className="mt-10">
            <span className="text-grey-900 ">Нууц үг давтан оруулна уу</span>
            <input
              value={passwordCheck}
              placeholder="Нууц үг давт"
              className="text-black w-full "
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setErrorMessage("");
                setPasswordCheck(event.target.value);
              }}
            />
          </FormField>

          <FormField className="flex align-middle">
            <input
              type="checkbox"
              value={isAdmin ? "1" : "0"}
              onChange={(event) =>
                setIsAdmin(event.target.value === "0" ? true : false)
              }
            />
            <span className="ml-3">Админ эсэх</span>
          </FormField>
          <div className="mt-4 text-red-500">
            <span>{errorMessage}</span>
          </div>

          <FormField className="mt-10 w-full flex justify-around px-32">
            <Button positive onClick={login}>
              Нэвтрэх
            </Button>
            <Button positive onClick={register} className="self-end">
              Бүртгүүлэх
            </Button>
          </FormField>
        </Form>
      </div>
    </div>
  );
}

export default RegisterForm;
