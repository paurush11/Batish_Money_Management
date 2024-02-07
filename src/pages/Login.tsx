import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { LoginForm } from "@/components/login/loginForm";

const Login: React.FC = ({}) => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-800">
      <div className="flex flex-col items-center">
        <Image
          src={
            "/batish-money-management-high-resolution-logo-white-transparent.png"
          }
          alt="Logo"
          width={400}
          height={400}
          className="flex items-center justify-center pb-7 "
        />
        <div className="flex rounded-lg bg-slate-400 p-12">
          <LoginForm />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
