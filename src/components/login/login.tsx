import React, { useContext, useRef, useState } from "react";
import { Form } from "@unform/web";
import Input from "../input/input";
import { SubmitHandler, FormHandles } from "@unform/core";
import Image from "next/image";
import Back from "../../assets/CaretRight.svg";
import Button from "../button";
import { encryptPassword } from "@/utils/validate";
import { AuthContext } from "@/context/AuthContext";
import clsx from "clsx";
import Modal from "../modal";
import Router from "next/router";

interface UserLoginState {
  email: string;
  password: string;
}

interface UserPasswordForgot {
  email: string;
}

type Props = {
  visible: boolean;
  handleClose: () => void;
};

function Login(props: Props) {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useContext(AuthContext);
  const { visible, handleClose } = props;
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit: SubmitHandler<UserLoginState> = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    const response = await signIn(user);

    if (response?.status !== 200) {
      setErrorMessage("Email ou senha são inválidos")
    } else {
      console.log("oi2") 
    }
    console.log(JSON.stringify(response, null, 2));
  };

  const handleRecoveryPassword = () => {

    Router.push("/recover-password")

  }

  return (
    <div
      id="login"
      className={clsx(
        "transition ease-in-out delay-150 duration-500",
        `flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 top-0 lg:right-0 lg:max-w-[30.125rem]`,
        visible ? "translate-x-0" : "translate-x-full"
      )}
    >
      <Form
        className="flex flex-col gap-5 justify-center"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Image
          className="w-10 h-10 cursor-pointer"
          src={Back}
          alt="voltar"
          onClick={handleClose}
        />
        <h1 className="font-['Poppins'] font-semibold text-2xl md:text-4xl">
          Login
        </h1>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-3">
            <Input
              label="Email"
              name="email"
              sizing="adjustable"
              color="extralight"
              className="md:w-80 md:h-16 md:text-lg"
              type="email"
              placeholder="seu.nome@ufcg.edu.br"
              readOnly={false}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Input
              label="Senha:"
              name="password"
              sizing="sm"
              color="extralight"
              className="md:w-80 md:h-16 md:text-lg"
              type="password"
              placeholder="*********"
              readOnly={false}
              required
            />
          </div>
          <span className="text-sm text-gray cursor-pointer self-end" onClick={handleRecoveryPassword}>Esqueci minha senha</span>
          <Button label="Entrar" size="lg" color="yellow" shape="square" type="submit" />
          {errorMessage && <div className="bg-red">{`!${errorMessage}!`}</div>}
        </div>
      </Form>
    </div>
  );
}
export default Login;
