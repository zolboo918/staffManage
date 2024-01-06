"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const route = useRouter();

  const login = () => {
    if (email === "") {
      setErrorMessage("Имэйл оруулна уу");
      return;
    }

    if (password === "") {
      setErrorMessage("Нууц үг оруулна уу");
      return;
    }
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/users",
    });
  };

  const register = () => {
    route.push("/signup");
  };

  return (
    <div className="flex col">
      <div className="w-full">
        <div className="mt-10">
          <span className="text-grey-900">Имэйл</span>
          <Input
            labelPosition="left corner"
            size="big"
            icon="user"
            iconPosition="left"
            placeholder="email@gmail.com"
            className="text-black w-full "
            type="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setErrorMessage("");
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="mt-10">
          <span className="text-grey-900 ">Нууц үг</span>
          <Input
            size="big"
            icon="lock"
            iconPosition="left"
            placeholder="Нууц үг"
            className="text-black w-full "
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setErrorMessage("");
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="mt-4 text-red-500">
          <span>{errorMessage}</span>
        </div>
        <Link href={"/forget-password"} className="flex mt-2 justify-end">
          Нууц үг сэргээх
        </Link>

        <div className="flex mt-10 w-full justify-around px-32">
          <Button positive onClick={login}>
            Нэвтрэх
          </Button>
          <Button positive onClick={register} className="self-end">
            Бүртгүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
